# Truecaller-blog server

- Built with Express, Redis & Wordpresss API.

### Available commands

- **start**

  ```bash
  yarn dev
  ```

- **lint**

  ```bash
  yarn run lint
  ```

### API

- `GET` - `/api/posts`

  - query parameters

    - category
    - tag
    - page

  - success response

  ```json
  {
      error: false,
      data: https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/posts/[posts - Response Parameters]
  }
  ```

  - error response (Same error response in each API).

  ```json
  {
    "error": true,
    "data": string
  }
  ```

- `GET` - `/api/categories`

  - success response

  ```json
  {
      error: false,
      data: https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/categories [categories - Response parameters]
  }
  ```

- `GET` - `/api/tags`

  - success response

  ```json
  {
      error: false,
      data: https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/tags [tags - Response parameters]
  }
  ```

- `GET` - `/api/posts/:postId`

  - success response

  ```json
  {
      error: false,
      data: https://developer.wordpress.com/docs/api/1.1/get/sites/%24site/posts/%24post_ID
  }
  ```

- `GET` - `/api/posts/:postId/related`

  - success response

  ```json
  {
      error: false,
      data: Same as /api/posts [Length 3]
  }
  ```
