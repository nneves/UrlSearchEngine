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
var dbSearch = require('./db/search.js');

const server = new Hapi.Server();
server.connection({ port: env.SERVER_PORT });

server.route([
    {
        method: 'POST',
        path: '/url',
        config: dbPost.postUrlConfig
    },
    {
        method: 'GET',
        path: '/search/{searchwords}',
        config: dbSearch.searchConfig
    }
]);

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
