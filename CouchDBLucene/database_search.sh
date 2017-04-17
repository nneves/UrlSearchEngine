#!/bin/sh

curl -X GET http://localhost:5984/_fti/local/searchengine/_design/search/by_content?q=nirvana&include_docs=true
