# UrlSearchEngine

Multi services architecture to Index and Search URLs by it's content using CouchDB+Lucene as a SearchEngine. 

NOTE: This project is still under heavy development, please expect some WIP!

Quick start (docker and docker-compose required):

```
// Launch all required services
docker-compose up

// Initialize CouchDB database, design documents and sample data
./couchdb_init.sh

// Test GetImageFromURL
open http://localhost:3000/?url=www.botdream.com&width=1024&height=900

// Test GetContentFromURL
curl http://localhost:6000/\?url\=www.botdream.com

// Open CouchDB UI
open http://localhost:5984/_utils/database.html\?searchengine/_all_docs

// Test CouchDB+Lucene search
curl -X GET --silent http://localhost:5984/_fti/local/searchengine/_design/search/by_content?q=brilliant&include_docs=true | jq .

// Insert CouchDB Document [TODO => use CouchDB UI to manual insert data, or look into CouchDBLucene/database_init.sh script or use SendFavoritesToCouchDB app with Chrome Bookmarks file]

//SaveUrlIntoDB service (POST)
curl -d 'url=http://www.botdream.com' http://localhost:8000/url

// shutdown services
docker-compose stop
OR
CTRL+C in the original terminal

// clean services data (reset containers)
docker-compose rm

// when changing source code you should rebuild docker images, use this generic command to build all and ignore cache (will take some time, forces to rebuild all images from scratch)
docker-compose build --no-cache
```

TODO:

- [ ] Finish SeachEngineUI
- [ ] Bundle SearchEngineUI into an Express.js/Hapi.js webapp
- [ ] Add Logic to the previous webapp (insert URL content/image into CouchDB document, search content)
- [ ] Add agent plugin for Email (Read email account to insert links content into CouchDB)
- [ ] Add agent plugin for Slack/Telegraf (Use NodeRed telegram/slack integration to insert links content into CouchDB)


# Run services independently [use only for development]

### GetImageFromURL
-----------------------

A simple screenshot web service powered by [Express](http://expressjs.com) and [PhantomJS](http://www.phantomjs.org/). Forked from [screenshot-app](http://github.com/visionmedia/screenshot-app).

Original documentation avaliable [here](https://github.com/nneves/UrlSearchEngine/screenshot-as-a-service/Readme.md)

For a quick service test run this commands:

```
cd GetImageFromURL

./docker_build.sh
./docker_run.sh

open http://localhost:3000/?url=www.botdream.com&width=1024&height=900
// or with clipping params
open http://localhost:3000/?url=www.botdream.com&width=1024&height=900&clipRect=%7B%22top%22%3A0%2C%22left%22%3A0%2C%22width%22%3A1024%2C%22height%22%3A800%7D

curl http://localhost:3000/?url=www.botdream.com&width=1024&height=900 > botdream.png
curl --silent http://localhost:3000/\?url\=www.botdream.com\&width\=1024\&height\=900 | imgcat
```

### GetContentFromURL
-----------------------
A simple content scraping web service powered by [Express](http://expressjs.com) and [Cheerio.js](https://cheerio.js.org/)

For a quick service test run this commands:

```
cd GetContentFromURL

./docker_build.sh
./docker_run.sh

curl http://localhost:6000/\?url\=www.botdream.com
```

CouchDBLucene
-----------------------
Create a database and some docs and then you can start setting up and querying indexes as explained in the [couchdb-lucene readme](https://github.com/rnewson/couchdb-lucene#indexing-strategy).

For a quick service test run this commands:

```
cd CouchDBLucene

docker-compose up
./database_init.sh

open http://localhost:5984/_utils/

curl -X GET --silent http://localhost:5984/_fti/local/searchengine/_design/search/by_content?q=nirvana&include_docs=true | jq .

curl -X GET --silent http://localhost:5984/_fti/local/searchengine/_design/search/by_content?q=einstein&include_docs=true | jq .

curl -X GET --silent http://localhost:5984/_fti/local/searchengine/_design/search/by_content?q=brilliant&include_docs=true | jq .

// Clear CouchDB data
docker-compose rm
```

More info on CouchDB-Lucene fulltext search here: [couchdblucene-fulltext-search](http://www.slideshare.net/martin.rehfeld/couchdblucene)


SendFavoritesToCouchDB
-----------------------
A simple tool made in GO to parse Google Chrome Bookmark exported HTML file into CouchDB-Lucene.


For a quick service test run this commands:

```
cd SendFavoritesToCouchDB

# export Chrome Bookmark file to ./bookmarks_sample.html

# ./build.sh # in case you need to change the sourcecode and compile the tool

# Launch CouchDB-Lucene service and initialize database

# Launch GetContentFromURL service

./SendFavoritesToCouchDB ./bookmarks_sample.html
```

SearchEngineUI
-----------------------
An experimental UI using Vue.js, basic webpack-dev-server http server, no backend yet implemented, neither docker container available!

![Web UI](https://cldup.com/2sYdRTkeLF.png)

For a quick service test run this commands:

```
cd SearchEngineUI

npm install
npm start

open http://localhost:8080
```

### SaveUrlIntoDB
-----------------------
A simple url-to-index service. Send meat , get sauge.

This takes the given url, passes it through GetContentFromURL, then pushes it into the `searchengine` CouchDB database where couchdb-lucene is indexing documents. 

curl -d 'url=http://www.botdream.com' http://localhost:8000/url

then when its done:

```
curl -X GET --silent http://localhost:5984/_fti/local/searchengine/_design/search/by_content?q=botdream&include_docs=true | jq .
```

NOTE: service engine is now indexing by title:
```
curl -X GET --silent http://localhost:5984/_fti/local/searchengine/_design/search/by_title\?q\=botdream\&include_docs\=true | jq .
```
