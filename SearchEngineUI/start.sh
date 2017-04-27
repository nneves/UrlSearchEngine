#!/bin/sh
echo "Run /start.sh script ...";

echo "Restore node_modules back into /src folder!";
mv /dev_node_modules /src/node_modules;

echo "Run app: npm start";
cd /src;
npm start;
