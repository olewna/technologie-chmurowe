#!/bin/bash

docker volume create nodejs_data

docker run -itd --name nodejs01 -p 3000:3000 --volume nodejs_data:/app node:latest

docker cp data.txt nodejs01:/app/data.txt

docker volume create all_volumes

docker run -itd --name temp -v all_volumes:/data node:latest

rm -rf /tmp/app
docker cp nodejs01:/app /tmp/app
docker cp /tmp/app temp:/data
docker cp nginx01:/usr/share/nginx/html /tmp/app
docker cp /tmp/app temp:/data

docker rm -f temp