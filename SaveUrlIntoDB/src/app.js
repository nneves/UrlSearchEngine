'use strict';

var R = require('request-promise');
var log = require('fancy-log');
var PouchDB = require('pouchdb');
var toid = require('to-id');
var _ = require('lodash');
var Hapi = require('hapi');
var Joi = require('joi');
var base64Img = require('base64-img');

const SERVER_PORT = process.env.SERVER_PORT || 8000;

const COUCHDB_HOST = process.env.COUCHDB_HOST || 'localhost';
const COUCHDB_PORT = process.env.COUCHDB_PORT || 5984;
const COUCHDB_DBNAME = process.env.COUCHDB_DBNAME || "searchengine";
const CONTENT_HOST = process.env.CONTENT_HOST || 'localhost';
const CONTENT_PORT = process.env.CONTENT_PORT || 6000;
const IMAGE_HOST = process.env.IMAGE_HOST || 'localhost';
const IMAGE_PORT = process.env.IMAGE_PORT || 3000;
const IMAGE_WIDTH = process.env.IMAGE_WIDTH || 1024;
const IMAGE_HEIGHT = process.env.IMAGE_HEIGHT || 900;
const IMAGE_CLIP_WIDTH = process.env.IMAGE_CLIP_WIDTH || 1024;
const IMAGE_CLIP_HEIGHT = process.env.IMAGE_CLIP_HEIGHT || 900;

const CDB = new PouchDB("http://" + COUCHDB_HOST + ":" + COUCHDB_PORT + "/" + COUCHDB_DBNAME);


function contentDocumentFactory(url, content, title, image) {
    var ts = (new Date()).toISOString();
    var o = {
        content: content,
        title: title,
        image: image,
        _id: toid(url + "/" + title) + "/" + ts
    };

    return o;
}

function getContent(url) {
    var serviceURI = "http://" + CONTENT_HOST + ":" + CONTENT_PORT + "/";
    return R.get(serviceURI + url);
}

function getImage(url) {
    var serviceURI = "http://" + IMAGE_HOST + ":" + IMAGE_PORT + "/?url=";
    var serviceParams = "&width="+IMAGE_WIDTH+"&height="+IMAGE_HEIGHT;
    var requestUrl = serviceURI + url + serviceParams;
    return R.get(requestUrl);
}

function getImageBase64(url) {
    var serviceURI = "http://" + IMAGE_HOST + ":" + IMAGE_PORT + "/?url=";
    //var serviceParams = "&width="+IMAGE_WIDTH+"&height="+IMAGE_HEIGHT;
    var serviceParams = 
        '&width='+IMAGE_WIDTH+
        '&height='+IMAGE_HEIGHT+
        '&clipRect=%7B"top"%3A0%2C"left"%3A0%2C'+
        '"width"%3A'+IMAGE_CLIP_WIDTH+'%2C'+
        '"height"%3A'+IMAGE_CLIP_HEIGHT+'%7D';
    var requestUrl = serviceURI + url + serviceParams;
    console.log("=>", requestUrl);
    return new Promise(function(resolve, reject){
        base64Img.requestBase64(requestUrl, function(err, res, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        });
    });
}

const test = "http://www.botdream.com";

function postUrlHandler(request, reply) {
    var url = request.payload.url;
    var response = {"result":"", "message":""};
    Promise.all([
        getContent(url),
        getImageBase64(url)
    ])
    .then(function([content, image]) {
        var data = JSON.parse(content);
        if (data.hasOwnProperty("error") && data.error != "") {
            console.log("=>", data.error);
            throw new Error(data.error);
        }
        var doc = contentDocumentFactory(url, data.content, data.title, image);
        return CDB.put(doc);

    })
    .then(function() {
        response.result = "success";
        log(response.result);
        reply(response);
    })
    .catch(function(reason) {
        response.result = "failed";
        response.message = reason.message;
        log.error(response.result, response.message);
        reply(response);
    });
}

const postUrlConfig = {
    handler: postUrlHandler, 
    validate: { 
        payload: { 
            url: Joi.string().min(1).required()
        } 
    },
    cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
    }
};


const server = new Hapi.Server();
server.connection({ port: SERVER_PORT });


server.route({
    method: 'POST',
    path: '/url',
    config: postUrlConfig
});


server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
