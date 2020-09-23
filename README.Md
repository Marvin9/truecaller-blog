# truecaller-blog

### Prerequisite:

- Node >=10.19.0
- npm or yarn
- redis

[Run using docker-compose](#run-using-docker-compose)

## Installation:

- ### Using [gnu make](https://www.gnu.org/software/make/manual/make.html):

  ```bash
  make install COMMAND="yarn"
  #OR
  make install COMMAND="npm i"
  ```

- ### Manually

  #### Client

  Move to `/client` directory.

  ```bash
  yarn
  #OR
  npm i
  ```

  #### Server

  Move to `/server` directory.

  ```bash
  yarn
  #OR
  npm i
  ```

## Run:

- Start [redis server](https://redis.io/topics/quickstart#starting-redis).

- ### Using gnu make

  ```bash
  make client #to run client
  ```

  ```bash
  make server #to run server
  ```

  OR

  ```bash
  make run-both #to run client & server concurrently
  ```

- ### Manually

  Move to `/client` directory.

  ```bash
  yarn dev
  #or
  npm run dev
  ```

  Move to `/server` directory.

  ```bash
  yarn start
  #or
  npm start
  ```

Open `http://localhost:3000` in browser. Server is running on port `8080`.

### Run using docker-compose

```bash
docker-compose up
```
