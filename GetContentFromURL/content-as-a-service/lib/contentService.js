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
    uri: url,
    timeout: 150000,
  }, function(error, response, body) {
    if (error) {
      callback(error.code, null);
    } else {
      //html = body.replace(/<script(.*?)<\/script>/g, ' ');
      var text = hget(body, {});
      callback(null, text);
    }
  });

}

module.exports = ContentService;
