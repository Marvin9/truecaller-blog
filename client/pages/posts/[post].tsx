import React, { useEffect, useState } from 'react';
import { Flex, Image, Text } from 'rebass';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';

import { PostType } from '../../external/types';
import { getPost, getRelatedPosts } from '../../external/apis';
import { Layout } from '../../components/Layout';
import { RelatedPosts } from '../../components/RelatedPosts';

const Post: React.FC = () => {
  const [postData, updatePostData] = useState<PostType>(null);
  const [relatedPostsData, updateRelatedPostsData] = useState<PostType[]>([]);
  const [initLoading, updateInitLoading] = useState(true);
  useEffect(() => {
    if (initLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [initLoading]);

  const router = useRouter();
  const { post } = router.query;

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

  const Article = !initLoading && (
    // COMPLETE ARTICLE
    <Flex flexDirection="column" mt={4}>
      {/* ARTICLE MAIN IMAGE */}
      <Image src={postData.post_thumbnail.URL} alt={postData.title} />
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
  );

  return (
    <>
      <Layout kind="article">{Article}</Layout>

      {/* RELATED POSTS */}
      {!initLoading && <RelatedPosts relatedPosts={relatedPostsData} />}
    </>
  );
};

// THIS PAGE SHOULD LOAD SERVER SIDE
// SO THAT WE GET ACCESS TO router.query EVEN ON HARD REFRESH
export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default Post;
