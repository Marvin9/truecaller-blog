const express = require('express');
const cors = require('cors');

const APIs = require('./api');
const errorHandler = require('./api/helpers/handleFailure');
const log = require('./utils/logger');

const prefix = '/api';

const app = express();

app.use(cors());

app.use((req, res, next) => {
  log(`[${req.method}] => ${req.path}`);
  next();
});

Object.keys(APIs).forEach((apiEndpoint) => {
  app.get(`${prefix}/${apiEndpoint}`, APIs[apiEndpoint]);
});

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
