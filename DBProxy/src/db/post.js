const R = require('request-promise');
const log = require('fancy-log');
const PouchDB = require('pouchdb');
const toid = require('to-id');
const _ = require('lodash');
const Joi = require('joi');
const base64Img = require('base64-img');
const env = require('../envvars.js');

const CDB = new PouchDB("http://" + env.COUCHDB_HOST + ":" + env.COUCHDB_PORT + "/" + env.COUCHDB_DBNAME);

function contentDocumentFactory(url, content, title, image) {
    const ts = (new Date()).toISOString();
    const o = {
        content: content,
        title: title,
        url: url,
        image: image,
        _id: toid(url + "_" + title) + "_" + ts
    };
    return o;
};

function getContent(url) {
    const serviceURI = "http://" + env.CONTENT_HOST + ":" + env.CONTENT_PORT + "/";
    return R.get(serviceURI + url);
};

function getImage(url) {
    const serviceURI = "http://" + env.IMAGE_HOST + ":" + env.IMAGE_PORT + "/?url=";
    const serviceParams = "&width="+env.IMAGE_WIDTH+"&height="+env.IMAGE_HEIGHT;
    const requestUrl = serviceURI + url + serviceParams;
    return R.get(requestUrl);
};

function getImageBase64(url) {
    const serviceURI = "http://" + env.IMAGE_HOST + ":" + env.IMAGE_PORT + "/?url=";
    //const serviceParams = "&width="+env.IMAGE_WIDTH+"&height="+Ienv.MAGE_HEIGHT;
    const serviceParams = 
        '&width='+env.IMAGE_WIDTH+
        '&height='+env.IMAGE_HEIGHT+
        '&clipRect=%7B"top"%3A0%2C"left"%3A0%2C'+
        '"width"%3A'+env.IMAGE_CLIP_WIDTH+'%2C'+
        '"height"%3A'+env.IMAGE_CLIP_HEIGHT+'%7D';
    const requestUrl = serviceURI + url + serviceParams;
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
    const url = request.payload.url;
    let response = {"result":"", "message":"", "data":{}};
    Promise.all([
        getContent(url),
        getImageBase64(url)
    ])
    .then(function([content, image]) {
        const data = JSON.parse(content);
        if (data.hasOwnProperty("error") && data.error != "") {
            console.log("=>", data.error);
            throw new Error(data.error);
        }
        const doc = contentDocumentFactory(url, data.content, data.title, image);
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
