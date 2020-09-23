import { InferGetServerSidePropsType } from 'next';
import React, { useState, useEffect } from 'react';
import { Button, Flex, Text } from 'rebass';

import { Layout } from '../components/Layout';
import { ArticleCard } from '../components/ArticleCard';
import { getPosts } from '../external/apis';

const svg = require('../public/spinner.svg');

export async function getServerSideProps(context) {
  const { query } = context;

  let buildQuery = '';
  if (query.category) {
    buildQuery = `category=${query.category}`;
  } else if (query.tag) {
    buildQuery = `tag=${query.tag}`;
  }

  const posts = await getPosts(buildQuery);

  return {
    props: {
      posts: posts || [],
      query: buildQuery,
    },
  };
}

const Home: React.FC<InferGetServerSidePropsType<
  typeof getServerSideProps
>> = ({ posts, query }) => {
  // _posts is used to store more posts
  const [_posts, updatePosts] = useState(posts);
  const [nextPage, updateNextPage] = useState(2);
  const [nextPageLoading, updateNextPageLoading] = useState(false);

  // when there are all posts loaded
  const [disableLoading, updateDisableLoading] = useState(false);

  // load more posts
  const loadNextPage = async () => {
    // if all posts are loaded
    if (disableLoading) return;

    updateNextPageLoading(true);
    const newPosts = await getPosts(query, nextPage);
    if (newPosts === null || !newPosts.length) {
      updateDisableLoading(true);
      return;
    }
    updateNextPage(nextPage + 1);
    updatePosts([..._posts, ...newPosts]);
    updateNextPageLoading(false);
  };

  useEffect(() => {
    updatePosts(posts);
    updateNextPage(2);
    updateDisableLoading(false);
  }, [query]);

  return (
    <>
      <Layout>
        {/* SHOW QUERY => IS IT CATEGORY/TAG RELATED */}
        {!!query && (
          <Text fontSize={3} fontWeight="bolder">
            <u>
              {query.split('=')[0]}: {query.split('=')[1]}
            </u>
          </Text>
        )}

        {/* LIST OF ARTICLES */}
        <Flex flexWrap="wrap" alignItems="stretch">
          {_posts.map((post) => (
            <ArticleCard
              key={post.ID}
              articleID={post.ID}
              articleThumbnailURL={post.post_thumbnail.URL}
              articleTitle={post.title}
              articleDescription={post.excerpt}
              articleAuthor={post.author.name}
              articlePublishedDate={post.date}
              articleCategories={post.categories}
            />
          ))}
        </Flex>

        {/* LOADING BUTTON ONLY IF THERE ARE POSTS REMAINING TO LOAD */}
        {!disableLoading &&
          // LOADING BUTTON AT THE END OF PAGE
          (nextPageLoading ? (
            <img src={svg} className="spinner" />
          ) : (
            <Button onClick={loadNextPage} bg="#0784F9" mx="auto" mt={4}>
              Older posts
            </Button>
          ))}
      </Layout>
      <style jsx>{`
        .spinner {
          width: 50px;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};

export default Home;
