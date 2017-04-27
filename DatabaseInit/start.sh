#!/bin/sh
set -e

echo "Run /start.sh script ...";

# check for COUCHDB_HOST env var
if [[ -z "${COUCHDB_HOST}" ]]; then
  COUCHDB_HOST="localhost";
  echo "Set COUCHDB_HOST default value: "$COUCHDB_HOST;
fi;

# check for COUCHDB_PORT env var
if [[ -z "${COUCHDB_PORT}" ]]; then
  COUCHDB_PORT="5984";
  echo "Set COUCHDB_PORT default value: "$COUCHDB_PORT;
fi;

COUCHDB_ADDRESS="${COUCHDB_HOST} ${COUCHDB_PORT}";
echo "nc -zv ${COUCHDB_ADDRESS}";

# wait for couchdb tcp port to be available
echo "Waiting for CouchDB service to be ready!";
set +e;
while true; do
  SERVICE_RESPONSE=$(nc -zv $COUCHDB_ADDRESS 2>&1);
  #echo "RESPONSE:"$SERVICE_RESPONSE;

  VALIDATE=$(echo $SERVICE_RESPONSE | grep -v "open");
  #echo "TEST: "$VALIDATE;

  # nc return "open" in linux
  if [[ -n "${SERVICE_RESPONSE}" && -z "${VALIDATE}" ]]; then
    echo "CouchDB service is ready!";
    sleep 2;
    break;
  else
    printf ".";
  fi;
  sleep 1;
done;
set -e;

# verify if database requires initialization
if [[ ! -f "/dbinitstatus/.dbinitdone" ]]; then
  echo "Run database initialization command [.dbinitdone not found]";
  # note: if init fails, toch and npm start will never run
  npm run init && touch /dbinitstatus/.dbinitdone && npm start;
else
  echo "Database already initialized! [found .dbinitdone]";
  npm start;
fi
