import React from 'react';
import Link from 'next/link';
import { Box, Text, Flex, Card, Image } from 'rebass';

import { PostType } from '../external/types';

interface RelatedPostsType {
  relatedPosts: PostType[];
}

export const RelatedPosts: React.FC<RelatedPostsType> = ({ relatedPosts }) => (
  <Box bg="#0784F9" color="white" p={4}>
    <Text fontSize={3} fontWeight="bold">
      Similar posts:{' '}
    </Text>

    <br />

    <Flex flexWrap="wrap" flexDirection={['column', 'row']}>
      {relatedPosts.map((relatedPost) => (
        <Card width={[1, 1, 1 / 3]} p={[0, 5]} my={[5, 0]}>
          {/* RELATED POST THUMBNAIL */}
          {relatedPost.post_thumbnail && (
            <Image
              alt={relatedPost.title}
              src={relatedPost.post_thumbnail.URL}
              mb={4}
            />
          )}

          {/* RELATED POST TITLE */}
          <Link href={`/posts/${relatedPost.ID}`}>
            <Text
              fontSize={4}
              fontWeight="bolder"
              sx={{
                ':hover': {
                  cursor: 'pointer',
                  textDecoration: 'underline',
                },
              }}
              dangerouslySetInnerHTML={{
                __html: relatedPost.title,
              }}
            />
          </Link>
        </Card>
      ))}
    </Flex>
  </Box>
);
