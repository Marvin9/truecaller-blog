import axios from 'axios';

import { API } from '../../constants';
import log from '../../utils/logger';
import { categoryOrTagType, response } from '../types';

interface tagResonse extends response {
  data: categoryOrTagType[];
}

// get top 10 tags based on post count
export const getTags = (): Promise<categoryOrTagType[] | null> => {
  return new Promise(async (resolve) => {
    try {
      const tagsResp = await axios.get(`${API}/tags`);
      const tagsData = tagsResp.data as tagResonse;

      resolve(tagsData.data);
    } catch (e) {
      log(e.message);
      resolve(null);
    }
  });
};
