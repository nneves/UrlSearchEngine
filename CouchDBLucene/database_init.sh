#!/bin/sh

curl -X PUT http://localhost:5984/searchengine

# DEBUG ONLY: delete previous created _design/search
rev=`curl -s -X GET http://localhost:5984/searchengine/_design/search | jq '{_rev: ._rev}' | grep '"' | cut -d ' ' -f 4 | cut -d '"' -f 2`
curl -X DELETE 'http://localhost:5984/searchengine/_design/search/?rev='$rev

curl -H 'Content-Type: application/json' \
  -X POST http://localhost:5984/searchengine \
  -d '{"_id": "_design/search", 
        "fulltext": {
          "by_content": { "index": "function(doc) { var ret=new Document(); ret.add(doc.content); return ret }" },
          "by_title": { "index": "function(doc) { var ret=new Document(); ret.add(doc.title); return ret }" }
        }
      }'

# sample data
curl -H 'Content-Type: application/json' \
  -X POST http://localhost:5984/searchengine \
  -d '{
    "_id": "053db227c88fb27bef9e927e500007e7",
    "content": "some text about albert einstein, a brilliant scientist"
  }'

curl -H 'Content-Type: application/json' \
  -X POST http://localhost:5984/searchengine \
  -d '{
    "_id": "053db227c88fb27bef9e927e50000e7a",
    "content": "Nirvana was the best band ever, Kurt Cobain was a brilliant musician"
  }'