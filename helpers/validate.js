const { validationResult } = require('express-validator');
const { BAD_REQUEST } = require('./constants');

const validationHandler = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(BAD_REQUEST.RES_CODE).json({ 
      error: result.array().length > 0 ? req.t(result.array()[0].msg) : req.t('INVALID_VALUE'),
    });
  }
  return next();
};

module.exports = {
  validationHandler: validationHandler,
};
