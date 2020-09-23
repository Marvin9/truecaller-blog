/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
const axios = require('axios').default;

const { BLOG_ENDPOINT } = require('../utils/constants');
const response = require('../utils/response');

const topTenTagsCache = require('../redis/topTenTags.cache');

const MAX_TAGS_CALL = 10;

/**
 * top 10 tags based on post counts.
 * To avoid recalculation on each request, we will store it in redis cache
 * which will expire in 24 hours and required calculation again.
 *
 * ALGORITHM TO FIND TOP 10 LATEST TAGS:
 * => make array which should not exceed size 10.
 * => limit max calls
 *    [max tags that could be fethced = (per_page) * MAX_TAGS_CALL = 100 * 10 = 1000]
 * => Iterate to each /tags?page=n api
 *    => Iterate all 100 tags of page n
 *       => for individual tag, place it in topTenTags array
 *          such that order of that array remains descending & size of array must remain 10
 */
module.exports = async (req, res, next) => {
  try {
    const cache = await topTenTagsCache.getLatestTags();
    // check if it was calculated
    if (cache.length) {
      res.statusCode = 200;
      res.json(response.successResponse(cache));
      return;
    }

    let page = 1;
    const topTenTags = [];

    while (true && page <= MAX_TAGS_CALL) {
      const tagsResponse = await axios.get(`${BLOG_ENDPOINT}/tags?page=${page++}`);

      /**
       * example of tagsResponse.data
       * {
       *  found,
       *  tags: Array<>
       * }
       */
      const tagsData = tagsResponse.data.tags;

      if (tagsData.length === 0) {
        // we have now topTenTags
        break;
      }

      // we will use insertion sort.
      tagsData.forEach((tag) => {
        // post count
        const postCount = tag.post_count;

        // start iterating from min(10-1, end_index_of_array)
        let min = topTenTags.length > 9 ? 9 : topTenTags.length - 1;
        if (min === 0) {
          // that means topTenTags array is empty
          topTenTags.push(tag);

          return;
        }
        while (min >= 0 && postCount > topTenTags[min].post_count) {
          topTenTags[min] = topTenTags[min - 1];
          min--;
        }
        topTenTags[min + 1] = tag;

        if (topTenTags.length > 10) topTenTags.pop();
      });
    }

    // we are using { name, slug } on front end side
    // so we will store only necessary keys it in redis
    const necessaryTopTenTagsData = topTenTags.map((tag) =>
      JSON.stringify({ name: tag.name, slug: tag.slug }),
    );
    topTenTagsCache.storeLatestTags(necessaryTopTenTagsData);

    res.statusCode = 200;
    res.json(response.successResponse(topTenTags));
  } catch (e) {
    req.errorContext = 'Error fetching tags.';
    req.errorMessage = e.message;
    next();
  }
};
