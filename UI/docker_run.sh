#!/bin/bash

source ../.env
echo "Run version ${UI_RELEASE_TAG}";

# Run app in isolation
#docker run -p 8080:8080 --rm --name SearchEngineUI searchengine-ui:$UI_RELEASE_TAG

# Develop: run app with host sourcecode + npm packages
docker run -p 8080:8080 --rm -v "${PWD}/uicode:/usr/src/app" --name SearchEngineUI searchengine-ui:$UI_RELEASE_TAG

# Build app for deployment (maps host folder in order to deploy build)
#docker run -p 8080:8080 --rm -v "${PWD}/uicode:/usr/src/app" --name SearchEngineUI searchengine-ui:$UI_RELEASE_TAG /usr/src/scripts/build.sh
