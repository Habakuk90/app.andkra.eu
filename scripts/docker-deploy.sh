#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build --build-arg key=${GHOST_API_KEY} -t wahnsinnshub/app.andkra.eu:latest .
docker push wahnsinnshub/app.andkra.eu:latest

# TODO If we are build as release we want to push by the latest release number
