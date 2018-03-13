#!/bin/sh
echo "Run /start.sh script ...";

if [ ! -d "/src/node_modules" ]; then
    echo "Restore node_modules back into /src folder!";
    mv /dev_node_modules /src/node_modules;
fi

echo "Run app: npm start";
cd /src;
npm start;
