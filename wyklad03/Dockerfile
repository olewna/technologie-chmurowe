FROM node:alpine

WORKDIR /opt/app

COPY ./package.json .

RUN npm install

COPY . .

CMD node index.js

# na koncu dawac zmienione rzeczy. Tu ustawiamy na koncu wlaczanie serwera poniewaz bedziemy go modyfikowac