import axios from 'axios';

import { API } from '../../constants';
import { PostType, response } from '../types';
import log from '../../utils/logger';

interface relatedPostsResponseType extends response {
  data: PostType[];
}

// related 3 posts
export const getRelatedPosts = (postId: number): Promise<PostType[] | null> => {
  return new Promise(async (resolve) => {
    try {
      const relatedPostsResponse = await axios.get(
        `${API}/posts/${postId}/related`,
      );
      const relatedPosts = relatedPostsResponse.data as relatedPostsResponseType;

      resolve(relatedPosts.data);
    } catch (e) {
      log(e.message);
      resolve(null);
    }
  });
};
