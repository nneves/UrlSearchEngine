#!/bin/bash

source .env
echo "Build version ${UI_RELEASE_TAG}"

#docker build --no-cache -t searchengine-ui:$UI_RELEASE_TAG .
docker build -t searchengine-ui:$UI_RELEASE_TAG .
