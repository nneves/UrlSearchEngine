var request = require('request-promise-native');
var log = require('fancy-log');
var seedData = require('./searchengine.json');

var COUCHDB_HOST = process.env.COUCHDB_HOST || 'localhost';
var COUCHDB_PORT = process.env.COUCHDB_PORT || '5984';
var COUCHDBADDRESS = `http://${COUCHDB_HOST}:${COUCHDB_PORT}`;

log ('running initdb for ',COUCHDBADDRESS);
log ('using seed data in searchengine.json');

seedSearchEngineDbPostOptions = {
  method: 'PUT',
  uri: `${COUCHDBADDRESS}/searchengine`,
}

seedDataPostOptions = {
    method: 'POST',
    uri: `${COUCHDBADDRESS}/searchengine/_bulk_docs`,
    body: seedData,
    json: true // Automatically stringifies the body to JSON
};

Promise.all([
  request(seedSearchEngineDbPostOptions).then(() => request(seedDataPostOptions))
])
  .then(() => {
    log("successfully seeded users, searchengine db, and seeded data.");
  })
  .catch((reason) => {
    log.error("failed to seed db",reason);
    process.exit(1);
  })

