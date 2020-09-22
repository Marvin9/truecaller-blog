const APIs = {
  posts: require('./posts'),
  categories: require('./categories'),
  'posts/:postId': require('./post'),
};

// key value pair of endpoint => handler
module.exports = APIs;
