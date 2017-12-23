var fs = require('fs');
var R = require('request-promise');
var log = require('fancy-log');
var PouchDB = require('pouchdb');
var toid = require('to-id');
var _ = require('lodash');
var Joi = require('joi');
var base64Img = require('base64-img');
var env = require('../envvars.js');

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
        //parse: false,
        maxBytes: 1048576 * 10,
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data'
    },
    cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
    }
};

module.exports = {
    config: config,
    postBookmarks: postBookmarks
};
