import React from 'react';
import { Flex } from 'rebass';

import Header from './Header';
import Navigation from './Navigation';

interface LayoutTypes {
  kind?: 'list' | 'article';
  children: React.ReactNode;
}

/**
 * Layout component contains Heading & Category section which
 * is common for all pages, we just have to change the body
 */
export const Layout: React.FC<LayoutTypes> = ({ kind = 'list', children }) => (
  <>
    {/* HEADER SECTION WHICH CONTAINS TRUECALLER LOGO */}
    <Header />

    <br />

    {/* CATEGORIES & TAGS LIST SECTION */}
    <Navigation />

    {/* DYNAMIC BODY SECTION, TO LIST ALL ARTICLES/RENDER FULL ARTICLE */}
    <Flex
      sx={{ maxWidth: kind === 'article' ? 668 : 1024, mx: 'auto', p: 3 }}
      flexWrap="wrap"
    >
      {children}
    </Flex>
  </>
);
