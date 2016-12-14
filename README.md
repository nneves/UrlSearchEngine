# UrlSearchEngine

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

GetHashFromURL
-----------------------
A simple GO Lang web service to convert a URL to an HASH

For a quick service test run this commands:

```
cd GetHashFromURL

# ./build.sh # only if you need to re-compile the sourcecode
./docker_build.sh
./docker_run.sh

curl http://localhost:8000/api/hash/www.botdream.com
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

curl -X GET http://localhost:5984/_fti/local/searchengine/_design/search/by_content?q=nirvana&include_docs=true | jq .

curl -X GET http://localhost:5984/_fti/local/searchengine/_design/search/by_content?q=einstein&include_docs=true | jq .

curl -X GET http://localhost:5984/_fti/local/searchengine/_design/search/by_content?q=brilliant&include_docs=true | jq .

// Clear CouchDB data
docker-compose rm
```

More info on CouchDB-Lucene fulltext search here: [couchdblucene-fulltext-search](http://www.slideshare.net/martin.rehfeld/couchdblucene)
