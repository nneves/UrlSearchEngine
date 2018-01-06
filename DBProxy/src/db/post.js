var R = require('request-promise');
var log = require('fancy-log');
var PouchDB = require('pouchdb');
var toid = require('to-id');
var _ = require('lodash');
var Joi = require('joi');
var base64Img = require('base64-img');
var env = require('../envvars.js');

const CDB = new PouchDB("http://" + env.COUCHDB_HOST + ":" + env.COUCHDB_PORT + "/" + env.COUCHDB_DBNAME);

function contentDocumentFactory(url, content, title, image) {
    var ts = (new Date()).toISOString();
    var o = {
        content: content,
        title: title,
        url: url,
        image: image,
        _id: toid(url + "_" + title) + "_" + ts
    };

    return o;
};

function getContent(url) {
    var serviceURI = "http://" + env.CONTENT_HOST + ":" + env.CONTENT_PORT + "/";
    return R.get(serviceURI + url);
};

function getImage(url) {
    var serviceURI = "http://" + env.IMAGE_HOST + ":" + env.IMAGE_PORT + "/?url=";
    var serviceParams = "&width="+env.IMAGE_WIDTH+"&height="+env.IMAGE_HEIGHT;
    var requestUrl = serviceURI + url + serviceParams;
    return R.get(requestUrl);
};

function getImageBase64(url) {
    var serviceURI = "http://" + env.IMAGE_HOST + ":" + env.IMAGE_PORT + "/?url=";
    //var serviceParams = "&width="+env.IMAGE_WIDTH+"&height="+Ienv.MAGE_HEIGHT;
    var serviceParams = 
        '&width='+env.IMAGE_WIDTH+
        '&height='+env.IMAGE_HEIGHT+
        '&clipRect=%7B"top"%3A0%2C"left"%3A0%2C'+
        '"width"%3A'+env.IMAGE_CLIP_WIDTH+'%2C'+
        '"height"%3A'+env.IMAGE_CLIP_HEIGHT+'%7D';
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
};

const test = "http://www.botdream.com";

function postUrlHandler(request, reply) {
    var url = request.payload.url;
    var response = {"result":"", "message":"", "data":{}};
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
    .then(function(data) {
        response.result = "success";
        response.data = data;
        log(response.result);
        reply(response);
    })
    .catch(function(reason) {
        response.result = "failed";
        response.message = reason.message;
        log.error(response.result, response.message);
        reply(response);
    });
};

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

module.exports = {
    postUrlConfig: postUrlConfig,
    postUrlHandler: postUrlHandler
};
