const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const l10n = require('jm-ez-l10n');
require('dotenv').config();

// DB connection init
require('./database');

const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
l10n.setTranslationsFile('en', './language/translation.en.json');
app.use(l10n.enableL10NExpress);
app.use(fileUpload({
  parseNested: true,
}));
app.use(bodyParser.json(), (error, req, res, next) => {
    if (error) {
      return res.status(400).json({ error: req.t('ERR_GENRIC_SYNTAX') });
    }
    next();
});
app.use('/api', require('./routes/index'));
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});