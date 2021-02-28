const media = require('../../../helpers/media');
const { SERVER_ERROR, SUCCESS } = require('../../../helpers/constants');
const utilityUtils = require('./utilityUtils');
const utilityController = {};

utilityController.getLocalityList = async (req, res) => { 
    try {
        const data = await utilityUtils.getLocalityList();
        return res.status(SUCCESS.RES_CODE).json({ data });
    }  catch (err) {
        return res.status(SERVER_ERROR.RES_CODE).json({ error: req.t(SERVER_ERROR.MESSAGE)});
    }
}

utilityController.getBathroomCountList = async (req, res) => { 
    try {
        const data = await utilityUtils.getBathroomCountList();
        return res.status(SUCCESS.RES_CODE).json({ data });
    }  catch (err) {
        return res.status(SERVER_ERROR.RES_CODE).json({ error: req.t(SERVER_ERROR.MESSAGE)});
    }
}

utilityController.getBedCountList = async (req, res) => { 
    try {
        const data = await utilityUtils.getBedCountList();
        return res.status(SUCCESS.RES_CODE).json({ data });
    }  catch (err) {
        return res.status(SERVER_ERROR.RES_CODE).json({ error: req.t(SERVER_ERROR.MESSAGE)});
    }
}

utilityController.getCarpetAreaTypeList = async (req, res) => { 
    try {
        const data = await utilityUtils.getCarpetAreaTypeList();
        return res.status(SUCCESS.RES_CODE).json({ data });
    }  catch (err) {
        return res.status(SERVER_ERROR.RES_CODE).json({ error: req.t(SERVER_ERROR.MESSAGE)});
    }
}

module.exports = utilityController;