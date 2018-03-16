#!/bin/sh
source ../.env

docker build --no-cache -t searchengine-getcontentfromurl:$GETCONTENTFROMURL_RELEASE_TAG .