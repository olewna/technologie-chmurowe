FROM node:latest

ENV plik "index.js"

WORKDIR /app

COPY ./app/package.json .

RUN npm install

COPY ./app/ .

CMD node ${plik}
