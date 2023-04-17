FROM node:latest

WORKDIR /app

COPY ./app/package.json .

RUN npm install

COPY ./app/ .

EXPOSE 3003

CMD node 'index.js'