import axios from 'axios';

import log from '../../utils/logger';
import { API } from '../../constants';
import { PostType, response } from '../types';

interface postResponse extends response {
  data: PostType;
}

// get single post
export const getPost = (postId: number): Promise<PostType | null> => {
  return new Promise(async (resolve) => {
    try {
      const response = await axios.get(`${API}/posts/${postId}`);
      const postData = response.data as postResponse;

      resolve(postData.data);
    } catch (e) {
      log(e.message);
      resolve(null);
    }
  });
};
