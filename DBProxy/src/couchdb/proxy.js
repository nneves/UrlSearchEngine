var env = require('../envvars.js');

function proxyHandler(request, reply) {
    const url = request.url.path.replace("/couchdb/", "");
    const method = request.method;
    const config = {
        uri: `http://${env.COUCHDB_HOST}:${env.COUCHDB_PORT}/${url}`,
        passThrough: true
    };
    console.log("HTTP PROXY => COUCHDB [", method.toUpperCase(), "]", config);
    return reply.proxy(config);
};

const config = {
    handler: proxyHandler,
};

const configDELETE = {
    handler: proxyHandler,
    payload: {
        parse: false
    }
};

module.exports = {
    config: config,
    configDELETE: configDELETE,
    proxyHandler: proxyHandler
};
