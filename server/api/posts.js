const axios = require('axios').default;

const response = require('../utils/response');
const { BLOG_ENDPOINT } = require('../utils/constants');

/**
 * get all posts
 */
module.exports = async (req, res, next) => {
  try {
    const posts = await axios.get(`${BLOG_ENDPOINT}/posts`);
    res.statusCode = 200;
    res.json(response.successResponse(posts.data));
  } catch (e) {
    req.errorContext = 'Error fetching posts';
    req.errorMessage = e.message;
    next();
  }
};
