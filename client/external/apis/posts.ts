import axios from 'axios';

import log from '../../utils/logger';
import * as types from '../types';
import { API } from '../../constants';

interface postsResponse extends types.response {
  data: {
    posts: types.PostType[];
  };
}

// getPosts will return Promise of
// all posts of page n or null if fail
export const getPosts = (
  query = '',
  page = 0,
): Promise<null | types.PostType[]> => {
  return new Promise(async (resolve) => {
    try {
      const response = await axios.get(`${API}/posts?${query}&page=${page}`);
      const postsData = response.data as postsResponse;

      resolve(postsData.data.posts);
    } catch (e) {
      log(e.message);
      resolve(null);
    }
  });
};
