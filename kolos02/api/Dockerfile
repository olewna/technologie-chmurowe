FROM node:14

COPY package*.json .

RUN npm install

COPY . .

RUN apt-get update && apt-get install -y curl

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f http://localhost:3000/ready || exit 1

EXPOSE 3000

CMD ["npm", "start"]