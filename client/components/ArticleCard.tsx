import React from 'react';
import { Box, Card, Flex, Image, Text } from 'rebass';
import Link from 'next/link';

interface ArticleCardTypes {
  articleID: number;
  articleThumbnailURL: string;
  articleTitle: string;
  articleDescription: string;
  articleCategories: {
    [categoryName: string]: {
      ID: number;
    };
  };
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
}) => (
  <Box width={1 / 2} p={3}>
    <Card sx={{ border: '1px solid #EAEAEA' }}>
      {/* THUMBNAIL */}
      <Link href={`/posts/${articleID}`}>
        <Image src={articleThumbnailURL} sx={{ cursor: 'pointer' }} />
      </Link>

      {/* CARD BODY */}
      <Box p={4}>
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
        <Flex>
          {Object.keys(articleCategories).map((articleCategory, idx) => (
            <Box
              sx={{
                display: 'inline-block',
                py: 1,
                mb: 2,
                mr: 3,
                borderRadius: 9999,
                fontWeight: 'lighter',
                textDecoration: 'underline',
              }}
              fontSize={1}
              key={`${articleCategory}_${idx}`}
            >
              {articleCategory}
            </Box>
          ))}
        </Flex>

        <br />

        {/* PUBLISHED TIME & AUTHOR NAME */}
        <Text fontSize={1}>
          {articlePublishedDate} <u>{articleAuthor}</u>
        </Text>
      </Box>
    </Card>
  </Box>
);
