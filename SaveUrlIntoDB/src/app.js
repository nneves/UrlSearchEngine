'use strict';

var R = require('request-promise');
var log = require('fancy-log');
var PouchDB = require('pouchdb');
var toid = require('to-id');
var _ = require('lodash');
var Hapi = require('hapi');

const COUCHDB_HOST = process.env.COUCHDB_HOST || 'localhost';
const COUCHDB_PORT = process.env.COUCHDB_PORT || 5984;
const COUCHDB_DBNAME = process.env.COUCHDB_DBNAME || "searchengine";
const CONTENT_HOST = process.env.CONTENT_HOST || 'localhost';
const CONTENT_PORT = process.env.CONTENT_PORT || 6000;


const CDB = new PouchDB("http://" + COUCHDB_HOST + ":" + COUCHDB_PORT + "/" + COUCHDB_DBNAME);


function contentDocumentFactory(url, content, title) {
    var ts = (new Date()).toISOString();
    var o = {
        content: content,
        title: title,
        _id: toid(url + "/" + title) + "/" + ts
    };

    return o;
}

function getContent(url) {
    var serviceURI = "http://" + CONTENT_HOST + ":" + CONTENT_PORT + "/";
    return R.get(serviceURI + url);
}

const test = "http://www.botdream.com";

function webhandler(request, reply) {
    var url = request.params.url;
    getContent(url)
        .then(function(content) {
            var data = JSON.parse(content)
            if (data.hasOwnProperty("error") && data.error != "") {
                throw new Error(data.error);
            }
            var doc = contentDocumentFactory(url, data.content, data.title);
            return CDB.put(doc);
        })
        .then(function() {
            log("success");
            reply("success");
        })
        .catch(function(reason) {
            log.error("failed", reason);
            reply("failed");
        });
}



const server = new Hapi.Server();
server.connection({ port: 6001 });


server.route({
    method: 'GET',
    path: '/{url}',
    handler: webhandler
});


server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
