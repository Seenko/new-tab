FROM node:16-alpine

WORKDIR /app

RUN apk add --no-cache git

COPY package*.json ./

RUN npm install

RUN mkdir /app/node_modules/.vite
RUN chown -R node:node /app/node_modules/.vite

USER node

EXPOSE 3000
