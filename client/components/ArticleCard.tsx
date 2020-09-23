import React from 'react';
import { Box, Card, Flex, Image, Text } from 'rebass';
import Link from 'next/link';

import { formatTimeDiff } from '../utils/timeDiff';

type commonForCategoryAndTag = {
  [name: string]: {
    slug: string;
  };
};

interface ArticleCardTypes {
  articleID: number;
  articleThumbnailURL: string;
  articleTitle: string;
  articleDescription: string;
  articleCategories: commonForCategoryAndTag;
  articleTags: commonForCategoryAndTag;
  articleAuthor: string;
  articlePublishedDate: string;
}

export const ArticleCard: React.FC<ArticleCardTypes> = ({
  articleID,
  articleThumbnailURL,
  articleTitle,
  articleDescription,
  articleCategories,
  articleAuthor,
  articlePublishedDate,
  articleTags,
}) => (
  <Box width={1} p={[0, 3]} mb={[4, 0]}>
    <Card sx={{ border: '1px solid #EAEAEA' }}>
      {/* THUMBNAIL */}
      {articleThumbnailURL && (
        <Link href={`/posts/${articleID}`}>
          <Image
            src={articleThumbnailURL}
            sx={{ cursor: 'pointer' }}
            alt={articleTitle}
          />
        </Link>
      )}

      {/* CARD BODY */}
      <Box p={[3, 4]}>
        {/* ARTICLE TITLE */}
        <Link href={`/posts/${articleID}`}>
          <Text
            fontSize={4}
            fontWeight="bold"
            dangerouslySetInnerHTML={{ __html: articleTitle }}
            sx={{
              cursor: 'pointer',
              ':hover': {
                textDecoration: 'underline',
              },
            }}
          ></Text>
        </Link>

        {/* ARTICLE DESCRIPTION */}
        <Text
          fontSize={1}
          lineHeight={1.5}
          dangerouslySetInnerHTML={{ __html: articleDescription }}
        />

        {/* ARTICLE CATEGORIES */}
        <Flex flexWrap="wrap">
          {Object.keys(articleCategories).map((articleCategory, idx) => (
            <Link
              href={`/?category=${articleCategories[articleCategory].slug}`}
              key={`${articleCategory}_${idx}`}
            >
              <Box
                sx={{
                  display: 'inline-block',
                  py: 1,
                  mb: 2,
                  mr: 3,
                  borderRadius: 9999,
                  fontWeight: 'lighter',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                fontSize={1}
              >
                {articleCategory}
              </Box>
            </Link>
          ))}
        </Flex>

        <br />

        {/* PUBLISHED TIME & AUTHOR NAME */}
        <Text fontSize={1}>
          {formatTimeDiff(new Date(articlePublishedDate))} by{' '}
          <u>{articleAuthor}</u>
        </Text>

        <br />

        {/* ARTICLE TAGS */}
        <Flex flexWrap="wrap">
          {Object.keys(articleTags).map((articleTag) => (
            <Link
              key={articleTag}
              href={`/?tag=${articleTags[articleTag].slug}`}
            >
              <Box
                mr={2}
                my={1}
                py={2}
                px={3}
                sx={{ border: '1px solid lightgrey', cursor: 'pointer' }}
                fontSize={1}
              >
                {articleTag}
              </Box>
            </Link>
          ))}
        </Flex>
      </Box>
    </Card>
  </Box>
);
