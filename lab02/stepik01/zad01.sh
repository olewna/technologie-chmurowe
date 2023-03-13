#!/bin/bash
docker run -p 8080:8080 -it -d --name stepik2_1 node:12.22


docker cp server.js stepik2_1:/server.js

docker exec -it stepik2_1 bash -c "node ./server.js"
