#!/bin/bash
source ./UI/.env

#docker run \
#    --env PROXY="http://dbproxy:8000" \
#    -v "${PWD}/UI/uicode:/usr/src/app" \
#    --rm --name SearchEngineUIBuild searchengine-ui:$UI_RELEASE_TAG /usr/src/scripts/build.sh

docker-compose -f docker-compose.yml up
