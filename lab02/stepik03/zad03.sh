#!/bin/bash
docker run -d --name mongo mongo

docker run -p 8080:8080 -it -d --name stepik2_3 --link mongo:mongo -e MONGO_URL=mongodb://mongo:27017/myapp node:14 

docker cp server.js stepik2_3:/server.js

docker exec -it stepik2_3 bash -c "npm install express mongodb"

docker exec -it stepik2_3 bash -c "node ./server.js"
