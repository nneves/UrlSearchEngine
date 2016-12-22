/**
 * Module dependencies.
 */

var request = require('request');
var hget = require('hget');

/**
 * Content service.
 *
 * The service starts, kills or restarts content server
 *
 * The constructor expects a configuration object as parameter, with these properties:
 *   command: Command to start a phantomjs process
 *   path: Destination of temporary images
 *
 * @param {Object} Server configuration
 * @api public
 */
var ContentService = function(config) {
  this.config = config;
}

ContentService.prototype.startService = function() {
  return this;
}

ContentService.prototype.fetchData = function(url, callback) {
  request({
    method: 'GET',
    uri: url,
    timeout: 150000,
  }, function(error, response, body) {
    if (error) {
      response = {}
      response.statusCode = 500;
      response.statusMessage = error.errno;

      callback(error.code, response, null);
    } else {
      //html = body.replace(/<script(.*?)<\/script>/g, ' ');
      var text = hget(body, {});
      callback(null, response, text);
    }
  });

}

module.exports = ContentService;
