const express = require('express');
const { validationHandler } = require('../../../helpers/validate');
const propertyMiddleware = require('./propertyMiddleware');
const propertyController = require('./propertyController');

const router = express.Router();

router.get('/', propertyController.getPropertyList);

router.post('/', 
    propertyMiddleware.addPropertyReqValidator(), 
    validationHandler, 
    propertyController.addProperty
);

router.post('/view', 
    propertyMiddleware.isPropertyExist,
    propertyController.addPropertyView
);

router.post('/:propertyId/favourite-update', 
    propertyMiddleware.isPropertyExist,
    propertyController.updatePropertyFavourite
);

router.get('/:propertyId', 
    propertyMiddleware.isPropertyExist,
    propertyController.getPropertyDetails
);


module.exports = router;