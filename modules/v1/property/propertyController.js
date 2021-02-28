const media = require('../../../helpers/media');
const { SERVER_ERROR, CREATED, SUCCESS } = require('../../../helpers/constants');
const propertyUtils = require('./propertyUtils');
const utils = require('../../../helpers/utils');

const propertyController = {};

propertyController.addProperty = async (req, res) => { 
    try {
        const { images } = req.files;
        let propertyImageIdsData = [];
        for (const item of images) {
            const attachmentId = await media.uploadFile(item);
            propertyImageIdsData.push({ imageId: attachmentId });
        }
        const propertyData = {
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            localityId: req.body.localityId,
            price: req.body.price,
            bedroomCountId: req.body.bedroomCountId,
            bathroomCountId: req.body.bathroomCountId,
            carpetArea: req.body.carpetArea,
            carpetAreaTypeId: req.body.carpetAreaTypeId,
        }
        const propertyId = await propertyUtils.addPropertyData(propertyData);
        propertyImageIdsData = propertyImageIdsData.map((item) => {
            return {
                ...item,
                propertyId
            }
        })
        await propertyUtils.addPropertyImages(propertyImageIdsData);
        return res.status(CREATED.RES_CODE).json({ message: req.t('PROPERTY_ADD_SUCCESS') });
    }  catch (err) {
        return res.status(SERVER_ERROR.RES_CODE).json({ error: req.t(SERVER_ERROR.MESSAGE)});
    }
}

propertyController.getPropertyList = async (req, res) => {
    try {
        const { skip, limit } = utils.getSkipLimit(+req.query.page, +req.query.limit);
        const filterParams = { ...req.query };
        const { data, total } = await propertyUtils.getPropertyList(skip, limit, filterParams);
        return res.status(SUCCESS.RES_CODE).json({ data, total });
    } catch (err) {
        return res.status(SERVER_ERROR.RES_CODE).json({ error: req.t(SERVER_ERROR.MESSAGE)});
    }
}

propertyController.getPropertyDetails = async (req, res) => {
    try {
        const { data } = await propertyUtils.getPropertyDetails(+req.params.propertyId);
        return res.status(SUCCESS.RES_CODE).json({ data });
    } catch (err) {
        return res.status(SERVER_ERROR.RES_CODE).json({ error: req.t(SERVER_ERROR.MESSAGE)});
    }
}

propertyController.addPropertyView = async (req, res) => {
    try {
        const data = {
            propertyId: req.body.propertyId
        }
        await propertyUtils.addPropertyView(data);
        return res.status(SUCCESS.RES_CODE).json({});
    } catch (err) {
        return res.status(SERVER_ERROR.RES_CODE).json({ error: req.t(SERVER_ERROR.MESSAGE)});
    }
}

propertyController.updatePropertyFavourite = async (req, res) => {
    try {
        const data = {
            isFavourite: req.body.isFavourite
        }
        await propertyUtils.updatePropertyFavourite(data, +req.params.propertyId);
        return res.status(SUCCESS.RES_CODE).json({});
    } catch (err) {
        return res.status(SERVER_ERROR.RES_CODE).json({ error: req.t(SERVER_ERROR.MESSAGE)});
    }
}

module.exports = propertyController;