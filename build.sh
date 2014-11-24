#!/bin/bash
echo "Building meteor-famous-threejs..."
meteor build ./

echo "Start boot2docker..."
boot2docker init
boot2docker up
$(boot2docker shellinit)

echo "Build Docker Image..."
docker build --force-rm=false -t "zephadias/meteor-famous-threejs" .

echo "Push Docker image to Docker Hub..."
docker push zephadias/meteor-famous-threejs

echo "DONE!"
