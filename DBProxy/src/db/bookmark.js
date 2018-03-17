var fs = require('fs');
var R = require('request-promise');
var log = require('fancy-log');
var PouchDB = require('pouchdb');
var toid = require('to-id');
var _ = require('lodash');
var Joi = require('joi');
var base64Img = require('base64-img');
var env = require('../envvars.js');
var murmur = require("murmurhash-js");

const CDB = new PouchDB("http://" + env.COUCHDB_HOST + ":" + env.COUCHDB_PORT + "/" + env.COUCHDB_DBBOOKMARK);

function contentBookmark(bookmarkList) {
    var ts = (new Date()).toISOString();
    var o = {
        bookmarkList: bookmarkList,
        _id: ts,
    };
    return o;
};

// curl --form file=@bookmarks_23_12_2017.html http://localhost:8000/bookmarks
function postBookmarks(request, reply) {
    var myRegexp = /HREF="(.*?)"/g;
    var urlList = [];
    var response = {"result":"", "message":"", "data":{}};

    var data = request.payload;
    if (data.file) {
        data.file.pipe(require('split')()).on('data', (chunk) => {            
            var match = myRegexp.exec(chunk.toString());
            if(match !== null) {
                urlList.push(match[1]);
            }
          });

        data.file.on('end', function (err) {
            var doc = contentBookmark(urlList);
            CDB.put(doc).then(function(data) {
                response.result = "success";
                response.data = data;
                log(response.result);
                reply(response);
            });
        });
    }
};

const config = {
    handler: postBookmarks,
    payload: {
        parse: true,
        maxBytes: 1048576 * 10,
        output: 'stream',
        allow: 'multipart/form-data',
        defaultContentType: 'text/*'
    },
    cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
    }
};

var dataChunks = "";
function postBookmarkChunks(request, reply) {
    var response = {"success": true};
    /*
    {   qqpartindex: '0',
        qqpartbyteoffset: '0',
        qqchunksize: '200000',
        qqtotalparts: '13',
        qqtotalfilesize: '2479013',
        qqfilename: 'bookmarks_29_12_2017.html',
        qquuid: '03f05051-b06b-4583-a00d-ed4184e7a215',
        qqfile: ...
    }
    */
    dataChunks += request.payload.qqfile.toString();
    reply(response);
};

const configChunks = {
    handler: postBookmarkChunks,
    payload: {
        parse: true,
        output: 'data',
        allow: 'multipart/form-data',
    },
    cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
    }
};


function postBookmarkChunksCompleted(request, reply) {
    var myRegexp = /HREF="(.*?)"/g;
    var urlList = [];
    var response = {};
    dataChunks.split('\n').map((chunk) => {
        var match = myRegexp.exec(chunk.toString());
        if(match !== null) {
            var url = match[1];
            var hash = murmur.murmur3(url, 0);
            urlList.push({url: url, hash: String(hash), deleted: false, edited: ""});
        }
    });
    dataChunks = "";

    if (urlList.length > 0) {
        var doc = contentBookmark(urlList);
        CDB.put(doc).then(function(data) {
            response.success = true;
            response.data = data;
            log(response);
            reply(response);
        });
    } else {
        response.success = false;
        response.error =  "Uploaded file does not contain a valid list of URLs!";
        response.preventRetry = true;
        log(response);
        reply(response).code(406);
    }
};

const configChunksCompleted = {
    handler: postBookmarkChunksCompleted,
    payload: {
        parse: true,
        output: 'data',
        allow: 'application/x-www-form-urlencoded',
    },
    cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
    }
};

module.exports = {
    config: config,
    configChunks: configChunks,
    postBookmarks: postBookmarks,
    configChunksCompleted: configChunksCompleted,
    postBookmarkChunks: postBookmarkChunks,
    postBookmarkChunksCompleted: postBookmarkChunksCompleted
};
