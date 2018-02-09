'use strict';

var R = require('request-promise');
var log = require('fancy-log');
var PouchDB = require('pouchdb');
var toid = require('to-id');
var _ = require('lodash');
var Hapi = require('hapi');
var Joi = require('joi');
var base64Img = require('base64-img');
var env = require('./envvars.js');
var dbPost = require('./db/post.js');
var dbRemove = require('./db/remove.js');
var dbSearch = require('./db/search.js');
var dbBookmark = require('./db/bookmark.js');
const couchdbProxy = require('./couchdb/proxy.js');

const server = new Hapi.Server();
server.connection({ port: env.SERVER_PORT });

server.route([
    {
        method: 'POST',
        path: '/url',
        config: dbPost.postUrlConfig
    },
    {
        method: 'DELETE',
        path: '/remove/{docid}',
        config: dbRemove.removeConfig
    },
    {
        method: 'GET',
        path: '/search/{searchwords}',
        config: dbSearch.searchConfig
    },
    {
        method: 'POST',
        path: '/bookmarks',
        config: dbBookmark.config
    },
    {
        method: 'POST',
        path: '/bookmarkchunks',
        config: dbBookmark.configChunks
    },
    {
        method: 'POST',
        path: '/bookmarkchunkscompleted',
        config: dbBookmark.configChunksCompleted
    },
    {
        method: 'GET',
        path: '/couchdb/{path*}',
        config: couchdbProxy.config
    },
    {
        method: 'POST',
        path: '/couchdb/{path*}',
        config: couchdbProxy.config
    },
    {
        method: 'PUT',
        path: '/couchdb/{path*}',
        config: couchdbProxy.config
    },
    {
        method: 'DELETE',
        path: '/couchdb/{path*}',
        config: couchdbProxy.configDELETE
    },
]);

function StartServer (err) {
    if (err) {
        console.log('Failed to load h2o2');
    }
    server.start((err) => {
        /*
        // HTTP Debug requests
        server.on('response', function (request) {
            console.log("-------------------------------");
            console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
            console.log(request.info);
            console.log("-------------------------------");
        });*/

        if (err) {
            throw err;
        }
        console.log(`Server running at: ${server.info.uri}`);
    });
};

// Run Point
server.register({register: require('h2o2')}, StartServer);