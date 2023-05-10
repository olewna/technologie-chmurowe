#!/bin/bash

GIT_REPO=$1

docker network create app_network

docker build -t my_app --build-arg GIT_REPO=$GIT_REPO .

docker run -itd -p 80:80 --name my_app --network app_network my_app