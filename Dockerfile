FROM node:16-alpine

ADD /server/package.json /tmp/package.json

ADD /server/yarn.lock /tmp/yarn.lock

RUN rm -rf build

RUN cd /tmp && yarn install

ADD /server /src

RUN rm -rf src/node_modules && cp -a /tmp/node_modules /src/

RUN rm -rf tmp/package.json && rm -rf tmp/yarn.lock && rm -rf tmp/node_modules

ADD /client/package.json /tmp/package.json

ADD /client/yarn.lock /tmp/yarn.lock

RUN cd /tmp && yarn install

ADD /client /tmp/client

RUN rm -rf /tmp/client/node_modules && cp -a /tmp/node_modules /tmp/client

RUN cd /tmp/client && yarn build

WORKDIR /src

RUN yarn build

RUN cp -a /tmp/client/dist /src/build/src/

CMD ["node", "build/src/index.js"]