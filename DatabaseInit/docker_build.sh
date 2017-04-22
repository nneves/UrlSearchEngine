#!/bin/sh
. ./docker_build_version.sh

docker build --no-cache -t searchengine-databaseinit:$DATABASEINIT_BUILD_VERION .
