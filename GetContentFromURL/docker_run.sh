#!/bin/sh

docker run -p 6000:6000 -v "$PWD/tmp:/tmp" --rm --name GetContentFromURL searchengine-getcontentfromurl:0.0.7