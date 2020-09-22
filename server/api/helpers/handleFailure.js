const log = require('../../utils/logger');
const { errorResponse } = require('../../utils/response');

// Middleware to handle API failure/Not found errors.
// If there is context in request then endpoint is failure otherwise not found.
// the reason is we will set mentioned context if API propagate in catch block.

// req.errorContext is custom error message
// req.errorMessage is actual error message [only used to log]
module.exports = (req, res) => {
  let errorContext;
  if (req.errorContext) {
    log(`Endpoint fail: ${req.path}: ${req.errorMessage}`);

    errorContext = req.errorContext;
    res.statusCode = 400;
  } else {
    res.statusCode = 404;
    errorContext = 'API not found';
  }
  res.json(errorResponse(errorContext));
};
