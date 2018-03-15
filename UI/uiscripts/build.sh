#!/bin/sh

# Verify if node_modules are missing, if so copy pre-installation from /usr/src/cache
echo "Run start.sh script ...";
if [ ! -d "node_modules" ]; then
  echo "No node_modules found, reinstalling with 'npm install'";
  npm install;
fi

echo "Build app: npm run build";
npm run build;
