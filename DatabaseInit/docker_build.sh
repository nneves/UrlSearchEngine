#!/bin/sh
source ../.env

docker build --no-cache -t searchengine-databaseinit:$DB_INIT_RELEASE_TAG .
