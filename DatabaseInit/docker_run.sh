#!/bin/sh
. ./docker_build_version.sh

couchdbhost=`HOSTNAME`;
docker run --rm --name DatabaseInit --env COUCHDB_HOST=$couchdbhost searchengine-databaseinit:$DATABASEINIT_BUILD_VERION
