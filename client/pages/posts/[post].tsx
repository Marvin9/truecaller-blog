import React, { useEffect, useState } from 'react';
import { Box, Card, Flex, Image, Text } from 'rebass';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { PostType } from '../../external/types';
import { getPost, getRelatedPosts } from '../../external/apis';
import { Layout } from '../../components/Layout';

const spinner = require('../../public/spinner.svg');

const Post: React.FC = () => {
  const [postData, updatePostData] = useState<PostType>(null);
  const [relatedPostsData, updateRelatedPostsData] = useState<PostType[]>([]);
  const [initLoading, updateInitLoading] = useState(true);

  const router = useRouter();
  const { post } = router.query;

  // TODO: handle post isNaN

  // LOAD COMPLETE POST & RELATED POSTS WHENEVER URL HITS => /posts/[post].jsx
  useEffect(() => {
    updateInitLoading(true);
    Promise.all([getPost(+post), getRelatedPosts(+post)])
      .then(([postData, relatedPostsData]) => {
        updatePostData(postData);
        updateRelatedPostsData(relatedPostsData);
      })
      .finally(() => updateInitLoading(false));
  }, [post]);

  const Spinner = (
    <img
      src={spinner}
      style={{
        position: 'absolute',
        left: '50%',
        top: '80%',
        transform: 'translate(-50%, -50%)',
        width: '100px',
      }}
    />
  );

  return (
    <>
      <Layout kind="article">
        {initLoading ? (
          Spinner
        ) : (
          // COMPLETE ARTICLE
          <Flex flexDirection="column" mt={4}>
            {/* ARTICLE MAIN IMAGE */}
            <Image src={postData.post_thumbnail.URL} />
            <br />

            {/* ARTICLE HEADING */}
            <Text
              fontSize={5}
              fontWeight="bold"
              dangerouslySetInnerHTML={{ __html: postData.title }}
            />

            {/* ARTICLE CONTENT */}
            <Text dangerouslySetInnerHTML={{ __html: postData.content }} />
          </Flex>
        )}
      </Layout>

      {/* RELATED POSTS */}
      {!initLoading && (
        <Box bg="#0784F9" color="white" p={4}>
          <Text fontSize={3} fontWeight="bold">
            Similar posts:{' '}
          </Text>
          <br />
          <Flex flexWrap="wrap">
            {relatedPostsData.map((relatedPost) => (
              <Card width={1 / 3} p={5}>
                <Image src={relatedPost.post_thumbnail.URL} mb={4} />
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
      )}
    </>
  );
};

export default Post;
