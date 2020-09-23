import '../styles/globals.css';
import '../styles/blog.css';

import 'nprogress/nprogress.css';

import TopProgressbar from '../components/TopProgressbar';

function TruecallerBlog({ Component, pageProps }) {
  // TODO ADD THEME WRAPPER
  return (
    <>
      <TopProgressbar />
      <Component {...pageProps} />
    </>
  );
}

export default TruecallerBlog;
