FROM node:alpine

WORKDIR /app

COPY . .
RUN yarn

RUN yarn build
RUN ls | grep -v .next package.json node_modules | xargs rm -rf

CMD ["yarn", "start"]