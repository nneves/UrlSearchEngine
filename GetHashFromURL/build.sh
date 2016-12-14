#!/bin/sh
gox -osarch="linux/amd64" -osarch="darwin/amd64"
rm ./GetHashFromURL
ln -s ./GetHashFromURL_darwin_amd64 ./GetHashFromURL
