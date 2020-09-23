const APIs = {
  // get all posts [20 max], add query param named 'page'
  posts: require('./posts'),
  // get all available categories
  categories: require('./categories'),
  // get single post
  'posts/:postId': require('./post'),
  // get 3 related posts
  'posts/:postId/related': require('./related'),
  // get top 10 tags based on post count
  tags: require('./tags'),
};

// key value pair of endpoint => handler
module.exports = APIs;
