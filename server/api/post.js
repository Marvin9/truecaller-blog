const axios = require('axios').default;

const { BLOG_ENDPOINT } = require('../utils/constants');
const response = require('../utils/response');

module.exports = async (req, res, next) => {
  const { postId } = req.params;

  if (!postId || isNaN(+postId)) {
    res.statusCode = 400;
    res.json(response.errorResponse('Invalid postId.'));
    return;
  }

  try {
    const post = await axios.get(`${BLOG_ENDPOINT}/posts/${postId}`);
    res.statusCode = 200;
    res.json(response.successResponse(post.data));
  } catch (e) {
    req.errorContext = 'Error fetching post.';
    req.errorMessage = e.message;
    next();
  }
};
