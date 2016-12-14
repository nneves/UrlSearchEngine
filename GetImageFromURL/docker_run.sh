#!/bin/sh

docker run -p 3000:3000 -v "$PWD/tmp:/tmp" --rm --name GetImageFromURL searchengine-getimagefromurl:0.2.7