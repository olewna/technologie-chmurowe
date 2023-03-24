#!/bin/bash

docker exec nginx01 sh -c "apt-get update && apt-get -y install gnupg"

docker exec nginx01 sh -c "tar -cvf nginx_data.tar /usr/share/nginx/html | gpg -c nginx_data.tar.gpg"

docker exec nginx01 sh -c "gpg -d nginx_data.tar.gpg"