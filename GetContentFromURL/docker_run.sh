#!/bin/sh
source ../.env

docker run -p 6000:6000 -v "$PWD/tmp:/tmp" --rm --name GetContentFromURL searchengine-getcontentfromurl:$GETCONTENTFROMURL_RELEASE_TAG