const APIs = {
  posts: require('./posts'),
  categories: require('./categories'),
  'posts/:postId': require('./post'),
  'posts/:postId/related': require('./related'),
  tags: require('./tags'),
};

// key value pair of endpoint => handler
module.exports = APIs;
