const express = require('express');
const { NOT_FOUND } = require('../helpers/constants');

const router = express.Router();

router.use('/v1', require('./v1/routes'));

router.all("/*", (req, res) => {
    return res.status(NOT_FOUND.RES_CODE).json({
      error: req.t(NOT_FOUND.MESSAGE),
    });
});

module.exports = router;