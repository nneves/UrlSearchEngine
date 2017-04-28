var R = require('request-promise');
var log = require('fancy-log');
var Joi = require('joi');
var env = require('../envvars.js');

function getDocumentRevision(docid) {
    var apiUrl = `http://${env.COUCHDB_HOST}:${env.COUCHDB_PORT}/${env.COUCHDB_DBNAME}/${docid}`;
    console.log("[GET]", apiUrl);
    return R.get(apiUrl);
};

function removeDocument(docid, docrev) {
    var apiUrl = `http://${env.COUCHDB_HOST}:${env.COUCHDB_PORT}/${env.COUCHDB_DBNAME}/${docid}?rev=${docrev}`;
    console.log("[DELETE]", apiUrl);
    return R.delete(apiUrl);
};

function removeHandler(request, reply) {
    var docid = request.params.docid ? encodeURIComponent(request.params.docid) : '';
    var response = {"result":"", "message":""};

    Promise.all([
        getDocumentRevision(docid)
    ])
    .then(function(data) {
        if (data.hasOwnProperty("_rev") && data._rev != "") {
            console.log("ERROR");
            throw new Error(data.error);
        }
        return data;
    })
    .then(function(data) {
        var docdata = JSON.parse(data);
        return [docdata._id, docdata._rev];
    })
    .then(function([docid, docrev]){
        return removeDocument(encodeURIComponent(docid), docrev);
    })
    .then(function(res) {
        response.result = "success";
        response.data = res;
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

const removeConfig = {
    handler: removeHandler,
    validate: {
        params: {
            docid: Joi.string().required()
        }
    },
    cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
    }
};

module.exports = {
    removeConfig: removeConfig,
    removeHandler: removeHandler
};
