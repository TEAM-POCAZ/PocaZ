#!/bin/bash

cd /home/ubuntu/workspace/PocaZ

git pull

cd server

npm run build

pm2 reload all

