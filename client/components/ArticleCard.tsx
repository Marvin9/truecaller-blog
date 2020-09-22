import React from 'react';
import { Box, Card, Flex, Image, Text } from 'rebass';

interface ArticleCardTypes {
  articleThumbnailURL: string;
  articleTitle: string;
  articleDescription: string;
  articleCategories: string[];
  articleAuthor: string;
  articlePublishedDate: Date;
}

export const ArticleCard: React.FC<ArticleCardTypes> = ({
  articleThumbnailURL,
  articleTitle,
  articleDescription,
  articleCategories,
  articleAuthor,
  articlePublishedDate,
}) => (
  <Card sx={{ border: '1px solid #EAEAEA' }}>
    {/* THUMBNAIL */}
    <Image src={articleThumbnailURL} />

    {/* CARD BODY */}
    <Box p={4}>
      {/* ARTICLE TITLE */}
      <Text fontSize={4} fontWeight="bold">
        {articleTitle}
      </Text>

      {/* ARTICLE DESCRIPTION */}
      <Text
        fontSize={1}
        lineHeight={1.5}
        dangerouslySetInnerHTML={{ __html: articleDescription }}
      />

      {/* ARTICLE CATEGORIES */}
      <Flex>
        {articleCategories.map((articleCategory, idx) => (
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
        {articlePublishedDate}
        <u>{articleAuthor}</u>
      </Text>
    </Box>
  </Card>
);
