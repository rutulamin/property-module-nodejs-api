const My = require('jm-ez-mysql');
const { PROPERTY, PROPERTY_IMAGE, NO_OF_BATHROOM, CARPET_AREA_TYPE, PROPERTY_VIEWS,
    NO_OF_BEDROOM, LOCALITY, ATTACHMENT, ATTACHMENT_THUMB } = require('../../../helpers/tables');
const utils = require('../../../helpers/utils');

const propertyUtils = {};

propertyUtils.addPropertyData = async (data) => {
    try {
        const result = await My.insert(PROPERTY, data);
        return result.insertId;
    } catch (err) {
        throw err;
    }
}

propertyUtils.addPropertyImages = async (data) => {
    try {
        return My.insertMany(PROPERTY_IMAGE, data);
    } catch (err) {
        throw err;
    }
}

propertyUtils.getPropertyList = async (skip, limit, filterParams) => {
    try {
        let limitQuery = "";
        if (limit) {
            limitQuery = `LIMIT ${skip}, ${limit}`;
        }
        let whereQuery = `1=1`;
        const paramsArray = [];
        const orderByQuery = `ORDER BY p.createdAt DESC`;
        const joinQuery = `${PROPERTY} p
            LEFT JOIN ${LOCALITY} l ON p.localityId = l.id
            LEFT JOIN ${NO_OF_BEDROOM} bed ON p.bedroomCountId = bed.id
            LEFT JOIN ${NO_OF_BATHROOM} bath ON p.bathroomCountId = bath.id
            LEFT JOIN ${CARPET_AREA_TYPE} c ON p.carpetAreaTypeId = c.id
            LEFT JOIN ${PROPERTY_VIEWS} pv ON pv.propertyId = p.id`;
        const imageSubQuery = `(SELECT ${utils.getImagePath('pi.imageId', 'at.path')}
            FROM ${PROPERTY_IMAGE} pi 
            LEFT JOIN ${ATTACHMENT_THUMB} at ON at.attachmentId = pi.imageId
            WHERE pi.propertyId = p.id LIMIT 0, 1)`;
        const params = ['p.id', 'p.name', 'p.description', 'p.address', 'l.name as locality',
            'p.price', 'bed.number as bedRoomCount', 'bath.number as bathRoomCount', 'p.carpetArea',
            'c.type as carpetAreaType', 'p.isFavourite', `${imageSubQuery} as propertyImage`,
            'COUNT(DISTINCT pv.id) as viewCount']
        const data = await My.findAll(joinQuery, params, 
            `${whereQuery} GROUP BY p.id ${orderByQuery} ${limitQuery}`, paramsArray);
        const count = await My.first(joinQuery, 'COUNT(DISTINCT p.id) as total', 
            `${whereQuery}`, paramsArray);
        return { data, total: count.total };
    } catch (err) {
        throw err;
    }
}

propertyUtils.getPropertyDetails = async (id) => {
    try {
        let whereQuery = `p.id = ?`;
        const paramsArray = [id];
        const joinQuery = `${PROPERTY} p
            LEFT JOIN ${LOCALITY} l ON p.localityId = l.id
            LEFT JOIN ${NO_OF_BEDROOM} bed ON p.bedroomCountId = bed.id
            LEFT JOIN ${NO_OF_BATHROOM} bath ON p.bathroomCountId = bath.id
            LEFT JOIN ${CARPET_AREA_TYPE} c ON p.carpetAreaTypeId = c.id
            LEFT JOIN ${PROPERTY_IMAGE} pi ON pi.propertyId = p.id
            LEFT JOIN ${ATTACHMENT} a ON a.id = pi.imageId
            LEFT JOIN ${PROPERTY_VIEWS} pv ON pv.propertyId = p.id`;
        const params = ['p.id', 'p.name', 'p.description', 'p.address', 'l.name as locality',
            'p.price', 'bed.number as bedRoomCount', 'bath.number as bathRoomCount', 'p.carpetArea', 'p.isFavourite',
            'c.type as carpetAreaType', `CONCAT('[',GROUP_CONCAT(DISTINCT JSON_OBJECT('id', pi.imageId, 'URL', ${utils.getImagePath('pi.imageId', 'a.path')})),']') as propertyImage`,
            'COUNT(DISTINCT pv.id) as viewCount']
        const data = await My.first(joinQuery, params, 
            `${whereQuery} GROUP BY p.id`, paramsArray);
        return { 
            data: {
                ...data, 
                propertyImage: data.propertyImage ? JSON.parse(data.propertyImage) : []
            }
        };
    } catch (err) {
        throw err;
    }
}

propertyUtils.addPropertyView = async (data) => {
    try {
        return My.insert(PROPERTY_VIEWS, data);
    } catch (err) {
        throw err;
    }
}

propertyUtils.updatePropertyFavourite = async (data, id) => {
    try {
        return My.updateFirst(PROPERTY, data, 'id = ?', [id]);
    } catch (err) {
        throw err;
    }
}

module.exports = propertyUtils;