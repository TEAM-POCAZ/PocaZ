#!/bin/bash

cd /home/ubuntu/workspace/PocaZ

git pull

cd client

yarn build

cp -r dist/* /var/www/pocaz/
