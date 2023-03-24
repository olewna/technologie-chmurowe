#!/bin/bash

docker volume create nginx_data

docker run -itd --name nginx01 -p 8080:80 --volume nginx_data:/usr/share/nginx/html nginx:latest

docker exec -it nginx01 bash -c "echo 'Hello World' > /usr/share/nginx/html/index.html"
