import React, { useEffect, useState } from 'react';
import { Flex } from 'rebass';
import { Label, Select } from '@rebass/forms';

import { categoryType } from '../../../external/types';
import { getCategories } from '../../../external/apis';

interface WrapperTypes {
  type: 'category' | 'tag';
}

export const Wrapper: React.FC<WrapperTypes> = ({ type }) => {
  // list is either categories or tags, based on 'type'
  const [list, updateList] = useState<categoryType[]>([]);

  useEffect(() => {
    if (type === 'category') {
      // load categories
      getCategories().then((categories) => {
        console.log(categories);
        updateList(categories);
      });
    }
  }, []);

  return (
    <Flex alignItems="center" justifyContent="center" mx={5}>
      <Label fontWeight="bolder" width="auto">
        {type === 'category' ? 'Categories' : 'Tags'}
      </Label>
      <Select
        name={type}
        defaultValue="None"
        width="200px"
        ml={4}
        sx={{ border: 'none', borderBottom: '1px solid white' }}
      >
        <option className="opt">None</option>
        {list.map((listItem) => (
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
