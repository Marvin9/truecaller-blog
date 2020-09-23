// https://dev.to/vvo/show-a-top-progress-bar-on-fetch-and-router-events-in-next-js-4df3
import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';

type stateType = 'loading' | 'stop';

let timer;
let state: stateType;
let activeRequests = 0;
const delay = 250;

const load = () => {
  if (state === 'loading') return;

  state = 'loading';

  timer = setTimeout(() => {
    NProgress.start();
  }, delay);
};

const stop = () => {
  if (activeRequests > 0) return;

  state = 'stop';

  clearTimeout(timer);
  NProgress.done();
};

Router.events.on('routeChangeStart', load);
Router.events.on('routeChangeComplete', stop);
Router.events.on('routeChangeError', stop);

export default function TopProgressbar() {
  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      if (activeRequests === 0) load();

      activeRequests++;

      try {
        const response = await originalFetch(...args);
        return response;
      } catch (error) {
        return Promise.reject(error);
      } finally {
        activeRequests -= 1;
        if (activeRequests === 0) stop();
      }
    };
  }, []);
  return null;
}
