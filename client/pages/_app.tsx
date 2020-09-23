import Head from 'next/head';

import '../styles/globals.css';
import '../styles/blog.css';
import 'nprogress/nprogress.css';

import TopProgressbar from '../components/TopProgressbar';

function TruecallerBlog({ Component, pageProps }) {
  // TODO ADD THEME WRAPPER
  return (
    <>
      <Head>
        <title>Truecaller blog</title>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <TopProgressbar />
      <Component {...pageProps} />
    </>
  );
}

export default TruecallerBlog;
