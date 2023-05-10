FROM node:latest

WORKDIR /app

COPY *.json .

RUN npm i

COPY . .

CMD ["node", "index.js"]