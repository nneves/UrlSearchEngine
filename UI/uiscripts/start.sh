#!/bin/sh

# Verify if node_modules are missing, if so copy pre-installation from /usr/src/cache
echo "Run start.sh script ...";
if [ ! -d "node_modules" ]; then
  echo "No node_modules found, restoring pre-installed folder'";
  #npm install;
  ln -s /usr/src/cache/node_modules /usr/src/app/node_modules;
fi

echo "Run app: npm start";
npm start;
