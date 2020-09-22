const express = require('express');

const APIs = require('./api');
const log = require('./utils/logger');

const app = express();

const prefix = '/api';

Object.keys(APIs).forEach((apiEndpoint) => {
  app.get(`${prefix}/${apiEndpoint}`, APIs[apiEndpoint]);
});

const errorHandler = require('./api/helpers/handleFailure');

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  log(
    `Server running @ port: ${PORT}

${Object.keys(APIs)
  .map((api) => `[GET]:\t${prefix}/${api}`)
  .join('\n')}`,
  ),
);

module.exports = {
  prefix,
};
