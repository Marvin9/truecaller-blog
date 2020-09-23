/* eslint-disable no-async-promise-executor */

/**
 * Calculating top 10 tags based on post count is heavy process,
 * it consumes ~3s on each requests
 * by caching it in redis it is reduced to less than ~0.5ms on every request except first one,
 * however it is necessary to perform this calculation once in a day.
 * therefore we add expire 24 hours constraint to key
 */

const redisClient = require('./config');
const log = require('../utils/logger');

// Top 10 truecaller tags
const TRUECALLER_TAGS = 'TRUECALLER_TAGS';
// Expire key in 1 day
const EXPIRE = 5; // 60 * 60 * 24;

const getLatestTags = () =>
  new Promise(async (resolve) => {
    redisClient.smembers(TRUECALLER_TAGS, (err, res) => {
      // before sending response, parse json
      resolve(res.map((data) => JSON.parse(data)));
    });
  });

/**
 *
 * @param {Array<{
 *  name: string;
 *  slug: string;
 * }>} latestTags
 */
const storeLatestTags = (latestTags) =>
  new Promise(async (resolve) => {
    redisClient.sadd(TRUECALLER_TAGS, latestTags, (err, res) => {
      if (err) {
        log(err);
        resolve(null);
        return;
      }
      redisClient.expire(TRUECALLER_TAGS, EXPIRE);
      resolve(res);
    });
  });

module.exports = {
  getLatestTags,
  storeLatestTags,
};
