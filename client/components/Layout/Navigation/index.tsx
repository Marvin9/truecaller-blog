import React from 'react';
import Link from 'next/link';
import { Flex, Text } from 'rebass';

import { kind } from '../index';
import { Wrapper } from './Wrapper';

const Navigation: React.FC<{ kind: kind }> = ({ kind }) => (
  <Flex
    bg="#0784F9"
    color="white"
    sx={{ maxWidth: 1024, mx: 'auto', p: 3, borderRadius: '10px' }}
    alignItems="center"
    justifyContent="center"
    flexDirection={['column', 'row']}
  >
    {/* HOME PAGE LINK */}
    <Link href="/">
      <Text fontWeight="bold" sx={{ cursor: 'pointer' }} mb={[2, 0]}>
        HOME
      </Text>
    </Link>
    <Wrapper type="category" />
    <Wrapper type="tag" />
  </Flex>
);

export default Navigation;
