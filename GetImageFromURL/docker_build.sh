#!/bin/sh
source ../.env

docker build -t searchengine-getimagefromurl:$GETIMAGEFROMURL_RELEASE_TAG .