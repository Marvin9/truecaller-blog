const express = require('express');

const log = require('./utils/logger');

const app = express();

const prefix = '/api';

const APIs = require('./api');

Object.keys(APIs).forEach((apiEndpoint) => {
  app.get(`${prefix}/${apiEndpoint}`, APIs[apiEndpoint]);
});

const errorHandler = require('./api/helpers/handleFailure');

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => log(`Server running @ port: ${PORT}`));

module.exports = {
  prefix,
};
