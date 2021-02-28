const My = require('jm-ez-mysql');
const { LOCALITY, NO_OF_BATHROOM, NO_OF_BEDROOM, CARPET_AREA_TYPE } = require('../../../helpers/tables');

const utilityUtils = {};

utilityUtils.getLocalityList = async () => {
    try {
        return My.findAll(LOCALITY, ['id', 'name']);
    } catch (err) {
        throw err;
    }
}

utilityUtils.getBathroomCountList = async () => {
    try {
        return My.findAll(NO_OF_BATHROOM, ['id', 'number']);
    } catch (err) {
        throw err;
    }
}

utilityUtils.getBedCountList = async () => {
    try {
        return My.findAll(NO_OF_BEDROOM, ['id', 'number']);
    } catch (err) {
        throw err;
    }
}

utilityUtils.getCarpetAreaTypeList = async () => {
    try {
        return My.findAll(CARPET_AREA_TYPE, ['id', 'type']);
    } catch (err) {
        throw err;
    }
}

module.exports = utilityUtils;