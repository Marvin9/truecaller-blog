const axios = require('axios').default;

const response = require('../utils/response');
const { BLOG_ENDPOINT } = require('../utils/constants');

/**
 * get all posts
 */
module.exports = async (req, res, next) => {
  let { page } = req.query;
  if (!page) {
    page = 0;
  }

  if (isNaN(+page)) {
    res.statusCode = 400;
    res.json(response.errorResponse('Invalid page type in query.'));
  }

  try {
    const posts = await axios.get(`${BLOG_ENDPOINT}/posts?page=${page}`);
    res.statusCode = 200;
    res.json(response.successResponse(posts.data));
  } catch (e) {
    req.errorContext = 'Error fetching posts';
    req.errorMessage = e.message;
    next();
  }
};
