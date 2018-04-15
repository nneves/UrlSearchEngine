#!/bin/bash
source .env;

if [[ "$@" == "build" || ! -d ./UI/uicode/build ]]
then
    echo "Building REACT app for production...";
    docker-compose build;
    docker run \
    --env PROXY="http://dbproxy:8000" \
    -v "${PWD}/UI/uicode:/usr/src/app" \
    --rm --name SearchEngineUIBuild searchengine-ui:$UI_RELEASE_TAG /usr/src/scripts/build.sh;
fi

docker-compose -f docker-compose.yml -f docker-compose.production.yml up;
