const { check } = require('express-validator');
const My = require('jm-ez-mysql');
const { PROPERTY } = require('../../../helpers/tables');
const { NOT_FOUND } = require('../../../helpers/constants');

const propertyMiddleware = {}

propertyMiddleware.addPropertyReqValidator = () => {
    return [
        check('name').exists().withMessage('PROPERTY_NAME_REQUIRED'),
        check('description').exists().withMessage('PROPERTY_DESCRIPTION_REQUIRED'),
        check('address').exists().withMessage('PROPERTY_ADDRESS_REQUIRED'),
        check('localityId').exists().withMessage('PROPERTY_LOCALITY_REQUIRED'),
        check('price').exists().withMessage('PROPERTY_PRICE_REQUIRED'),
        check('bedroomCountId').exists().withMessage('PROPERTY_BEDROOM_REQUIRED'),
        check('bathroomCountId').exists().withMessage('PROPERTY_BATHROOM_REQUIRED'),
        check('carpetArea').exists().withMessage('PROPERTY_CARPET_AREA_REQUIRED'),
        check('carpetAreaTypeId').exists().withMessage('PROPERTY_CARPET_AREA_TYPE_REQUIRED'),
    ];
}

propertyMiddleware.isPropertyExist = async (req, res, next) => {
    try {
        const data = await My.first(PROPERTY, ['id'], 'id = ?', [req.body.propertyId || req.params.propertyId]);
        if(!data) {
            return res.status(NOT_FOUND.RES_CODE).json({ error: req.t('PROPERTY_NOT_EXIST') });
        }
        next();
    } catch (err) {
        throw err;
    }
}

module.exports = propertyMiddleware;