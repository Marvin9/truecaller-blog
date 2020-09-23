import axios from 'axios';

import log from '../../utils/logger';
import * as types from '../types';
import { API } from '../../constants';

import { categoryType } from '../types';

interface catResponse extends types.response {
  data: {
    categories: categoryType[];
  };
}

export const getCategories = (): Promise<categoryType[] | null> => {
  return new Promise(async (resolve) => {
    try {
      const categoriesResp = await axios.get(`${API}/categories`);
      const categoriesData = categoriesResp.data as catResponse;

      resolve(categoriesData.data.categories);
    } catch (e) {
      log(e.message);
      resolve(null);
    }
  });
};
