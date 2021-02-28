const express = require('express');
const utilityController = require('./utilityController');

const router = express.Router();

router.get('/locality', 
    utilityController.getLocalityList
);

router.get('/bathroom-count', 
    utilityController.getBathroomCountList
);

router.get('/bedroom-count', 
    utilityController.getBedCountList
);

router.get('/carpet-area', 
    utilityController.getCarpetAreaTypeList
);

module.exports = router;