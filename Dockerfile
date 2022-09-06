FROM node:16-alpine

ADD /server/package.json /tmp/package.json

ADD /server/yarn.lock /tmp/yarn.lock

RUN rm -rf build

RUN cd /tmp && yarn install

ADD /server /src

RUN rm -rf src/node_modules && cp -a /tmp/node_modules /src/

ADD /client /tmp/client

RUN cd /tmp/client && yarn build

RUN cp -a /tmp/client/dist /src/src

WORKDIR /src

RUN yarn build

CMD ["node", "build/src/index.js"]