const APIs = {
  posts: require('./posts'),
  categories: require('./categories'),
  'posts/:postId': require('./post'),
  'posts/:postId/related': require('./related'),
};

// key value pair of endpoint => handler
module.exports = APIs;
