const express = require('express');

const router = express.Router();

router.use('/property', require('../../modules/v1/property/propertyRoute'));
router.use('/utility', require('../../modules/v1/utility/utilityRoute'));

module.exports = router;
