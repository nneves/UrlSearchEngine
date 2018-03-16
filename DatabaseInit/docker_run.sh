#!/bin/sh
source ../.env

couchdbhost=`HOSTNAME`;
docker run --rm --name DatabaseInit --env COUCHDB_HOST=$couchdbhost searchengine-databaseinit:$DB_INIT_RELEASE_TAG
