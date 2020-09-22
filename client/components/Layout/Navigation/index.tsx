import React from 'react';
import { Flex } from 'rebass';

import { Wrapper } from './Wrapper';

const Navigation: React.FC = () => (
  <Flex
    bg="#0784F9"
    color="white"
    sx={{ maxWidth: 1024, mx: 'auto', p: 3, borderRadius: '10px' }}
    alignItems="center"
    justifyContent="center"
  >
    <Wrapper type="category" />
    <Wrapper type="tag" />
  </Flex>
);

export default Navigation;
