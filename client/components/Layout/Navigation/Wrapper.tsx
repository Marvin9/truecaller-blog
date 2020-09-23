import React, { useEffect, useState } from 'react';
import { Flex } from 'rebass';
import { Label, Select } from '@rebass/forms';
import router from 'next/router';

import { categoryType } from '../../../external/types';
import { getCategories } from '../../../external/apis';

interface WrapperTypes {
  type: 'category' | 'tag';
}

// default list selection
const none = 'none';

export const Wrapper: React.FC<WrapperTypes> = ({ type }) => {
  // list is either categories or tags, based on 'type'
  const [list, updateList] = useState<categoryType[]>([]);
  const [listSelection, selectListItem] = useState(none);

  useEffect(() => {
    if (type === 'category') {
      // load categories
      getCategories().then((categories) => {
        updateList(categories);
      });
    }
  }, []);

  useEffect(() => {
    if (listSelection !== none) {
      router.push(`/?${type}=${listSelection}`);
    } else {
      router.push('/');
    }
  }, [listSelection]);

  return (
    <Flex alignItems="center" justifyContent="center" mx={5}>
      <Label fontWeight="bolder" width="auto">
        {type === 'category' ? 'Categories' : 'Tags'}
      </Label>
      <Select
        name={type}
        value={listSelection}
        width="200px"
        ml={4}
        sx={{ border: 'none', borderBottom: '1px solid white' }}
        onChange={(e) => selectListItem(e.target.value)}
      >
        <option className="opt" value="none">
          None
        </option>
        {/* LIST OF AVAILABLE CATEGORIES/TAGS */}
        {list.map((listItem) => (
          // slug is value to inject in search query
          // example => /?category=--->foo-bar<--- slug
          // => /?tag=--->foo-bar<-- slug
          <option className="opt" value={listItem.slug} key={listItem.slug}>
            {listItem.name}
          </option>
        ))}
      </Select>
      <style jsx>{`
        .opt {
          color: #000;
        }
      `}</style>
    </Flex>
  );
};
