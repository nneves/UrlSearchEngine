#!/bin/sh
source ../.env

#docker build --no-cache -t searchengine-dbproxy:$DBPROXY_RELEASE_TAG .
docker build -t searchengine-dbproxy:$DBPROXY_RELEASE_TAG .
