FROM node:18.16-alpine3.17 AS build

RUN mkdir -p /home/app/node_modules && chown -R node:node /home/app

WORKDIR /home/app

COPY package*.json .
COPY yarn.lock .

USER app

RUN yarn

COPY --chown=app:app . .

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]