/* eslint-disable no-plusplus */
const axios = require('axios').default;

const { BLOG_ENDPOINT } = require('../utils/constants');
const response = require('../utils/response');

const maxBound = 3;

// returns top 3 related posts with title, thumbnail and date posted
module.exports = async (req, res, next) => {
  const { postId } = req.params;

  if (!postId || isNaN(+postId)) {
    res.statusCode = 400;
    res.json(response.errorResponse('Invalid postId.'));
    return;
  }

  try {
    const relatedPosts = await axios.post(`${BLOG_ENDPOINT}/posts/${postId}/related`);
    const relatedPostsData = relatedPosts.data;

    /**
     * example of relate post response
     * {
     *  total,
     *  max_score,
     *  hits: Array<{
     *    _score,
     *    fields: { ==>post_id<==, blog_id }
     *  }>
     * }
     */

    const getRelatedPostPromises = [];
    //  top 3
    const totalHits = relatedPostsData.hits.length;
    const min = totalHits < maxBound ? totalHits : maxBound;
    for (let i = 0; i < min; i++) {
      const hit = relatedPostsData.hits[i];
      const postIdOfHit = hit.fields.post_id;

      const getRelatedPostPromise = axios.get(`${BLOG_ENDPOINT}/posts/${postIdOfHit}`);
      getRelatedPostPromises.push(getRelatedPostPromise);
    }

    Promise.all(getRelatedPostPromises)
      .then((relatedPostsResponse) => {
        res.statusCode = 200;
        res.json(response.successResponse(relatedPostsResponse.map((_) => _.data)));
      })
      .catch((e) => {
        req.errorContext = 'Error fetching related posts.';
        req.errorMessage = e.message;
        next();
      });
  } catch (e) {
    req.errorContext = 'Error fetching related posts.';
    req.errorMessage = e.message;
    next();
  }
};
