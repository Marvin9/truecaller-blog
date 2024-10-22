// Individual post type which is returned from API => /posts
export type PostType = {
  // post ID used to navigate to full article
  ID: number;
  // article image
  post_thumbnail?: {
    URL: string;
  };
  // article title
  title: string;
  // article description
  excerpt: string;
  /*
    article categories in json format
    with key as category name & slug used to
    navigate to articles of that category
  */
  categories: {
    [key: string]: {
      ID: number;
      slug: string;
    };
  };
  tags: {
    [key: string]: {
      slug: string;
    };
  };
  // article author name
  author: {
    name: string;
  };
  // article published date
  date: string;
  // content
  content: string;
};

// response shape that come from API
export type response = {
  error: boolean;
  // extend and replace data type as required
  data: any;
};

// type of category/tag
export type categoryOrTagType = {
  // name of category
  name: string;
  // slug of category
  slug: string;
};
