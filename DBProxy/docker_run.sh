#!/bin/sh
source ../.env

docker run -p 8000:8000 --rm --name DBProxy searchengine-dbproxydb:$DBPROXY_RELEASE_TAG
