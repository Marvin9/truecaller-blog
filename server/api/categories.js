const axios = require('axios').default;

const response = require('../utils/response');
const { BLOG_ENDPOINT } = require('../utils/constants');

/**
 * get all categories
 */
module.exports = async (req, res, next) => {
  try {
    const categories = await axios.get(`${BLOG_ENDPOINT}/categories`);
    res.statusCode = 200;
    res.json(response.successResponse(categories.data));
  } catch (e) {
    req.errorContext = 'Error fetching categories.';
    req.errorMessage = e.message;
    next();
  }
};
