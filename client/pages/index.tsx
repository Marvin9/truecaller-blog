import { InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';
import { Button, Flex } from 'rebass';

import { Layout } from '../components/Layout';
import { ArticleCard } from '../components/ArticleCard';
import { getPosts } from '../external/apis';

const svg = require('../public/spinner.svg');

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: {
      posts: posts || [],
    },
  };
}

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  let loadingMutex = false;

  // _posts is used to store more posts
  const [_posts, updatePosts] = useState(posts);
  const [nextPage, updateNextPage] = useState(2);
  const [nextPageLoading, updateNextPageLoading] = useState(false);

  // load more posts
  const loadNextPage = async () => {
    updateNextPageLoading(true);
    // if any page loading request is pending...
    if (loadingMutex) return;
    loadingMutex = true;
    const newPosts = await getPosts(nextPage);
    updateNextPage(nextPage + 1);
    updatePosts([..._posts, ...newPosts]);
    loadingMutex = false;
    updateNextPageLoading(false);
  };

  return (
    <>
      <Layout>
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

          {/* LOADING BUTTON AT THE END OF PAGE */}
          {nextPageLoading ? (
            <img src={svg} className="spinner" />
          ) : (
            <Button onClick={loadNextPage} bg="#0784F9" mx="auto" mt={4}>
              Older posts
            </Button>
          )}
        </Flex>
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
