const R = require('request-promise');
const log = require('fancy-log');
const Joi = require('joi');
const env = require('../envvars.js');

function search(searchwords) {
    const apiUrl = `http://${env.COUCHDB_HOST}:${env.COUCHDB_PORT}/_fti/local/${env.COUCHDB_DBNAME}/_design/search/by_content?q=${searchwords}&include_docs=true`;
    console.log(apiUrl);
    return R.get(apiUrl);
};

function searchHandler(request, reply) {
    const searchwords = request.params.searchwords ? encodeURIComponent(request.params.searchwords) : '';
    let response = {"result":"", "message":""};

    Promise.all([
        search(searchwords)
    ])
    .then(function(data) {
        if (data[0].hasOwnProperty("etag") && data[0].etag != "") {
            throw new Error(data[0].error);
        }
        return data[0];
    })
    .then(function(data) {
        response.result = "success";
        response.data = JSON.parse(data);
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

const searchConfig = {
    handler: searchHandler, 
    cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
    }
};

module.exports = {
    searchConfig: searchConfig,
    searhcHandler: searchHandler
};
