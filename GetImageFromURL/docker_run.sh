#!/bin/sh
source ../.env

docker run -p 3000:3000 -v "$PWD/tmp:/tmp" --rm --name GetImageFromURL searchengine-getimagefromurl:$GETIMAGEFROMURL_RELEASE_TAG