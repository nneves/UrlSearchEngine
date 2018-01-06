var env = require('../envvars.js');

function proxyHandler(request, reply) {
    const config = {
        uri: `http://${env.COUCHDB_HOST}:${env.COUCHDB_PORT}/${request.params.path}`,
        passThrough: true
    };
    console.log("HTTP PROXY => COUCHDB: ", config);
    return reply.proxy(config);
};

const config = {
    handler: proxyHandler, 
};

module.exports = {
    config: config,
    proxyHandler: proxyHandler
};
