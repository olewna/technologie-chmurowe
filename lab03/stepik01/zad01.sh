#!/bin/bash

docker run -d -p 80:80 --name stepik3_1 nginx

echo "Hello World!" > index.html
docker cp index.html stepik3_1:/usr/share/nginx/html/

docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' stepik3_1