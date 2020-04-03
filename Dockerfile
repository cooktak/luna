FROM node:12
MAINTAINER Joosung Park <admin@slowmotion.dev>

ADD . /app
WORKDIR /app

RUN yarn && yarn build

ENV NODE_ENV production
CMD yarn start:prod
