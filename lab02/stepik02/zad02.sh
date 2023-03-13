#!/bin/bash
docker run -p 8080:8080 -it -d --name stepik2_2 node:14

docker cp server.js stepik2_2:/server.js

docker exec -it stepik2_2 bash -c "npm install express"

docker exec -it stepik2_2 bash -c "node ./server.js"
