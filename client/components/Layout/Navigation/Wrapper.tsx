import React from 'react';
import { Flex } from 'rebass';
import { Label, Select } from '@rebass/forms';

interface WrapperTypes {
  type: 'category' | 'tag';
}

export const Wrapper: React.FC<WrapperTypes> = ({ type }) => (
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
      <option>None</option>
    </Select>
  </Flex>
);
