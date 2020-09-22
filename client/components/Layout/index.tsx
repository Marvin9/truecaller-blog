import React from 'react';
import { Flex } from 'rebass';

import Header from './Header';
import Navigation from './Navigation';

/**
 * Layout component contains Heading & Category section which
 * is common for all pages, we just have to change the body
 */
export const Layout: React.FC = ({ children }) => (
  <>
    {/* HEADER SECTION WHICH CONTAINS TRUECALLER LOGO */}
    <Header />

    <br />

    {/* CATEGORIES & TAGS LIST SECTION */}
    <Navigation />

    {/* DYNAMIC BODY SECTION, TO LIST ALL ARTICLES/RENDER FULL ARTICLE */}
    <Flex sx={{ maxWidth: 1024, mx: 'auto', p: 3 }} flexWrap="wrap">
      {children}
    </Flex>
  </>
);
