FROM node:12.20.0-alpine

WORKDIR  /usr/src/proxy
COPY package*.json /usr/src/proxy/
RUN yarn install
COPY . .
RUN yarn run build

ARG PORT=3001
ENV PORT=${PORT}

EXPOSE $PORT

USER node

CMD ["node", "dist/src/index.js"]
