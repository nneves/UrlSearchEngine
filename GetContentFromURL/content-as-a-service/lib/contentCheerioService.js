/**
 * Module dependencies.
 */

var request = require('request');
var cheerio = require("cheerio");

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
  }, function(error, response, body) {
    if (error) {
      callback(error, null);
    }
    html = body.replace(/<script(.*?)<\/script>/g, ' ');
    var $ = cheerio.load(html, {
      withDomLvl1: true,
      normalizeWhitespace: true,
      xmlMode: false,
      decodeEntities: true
    });

    $("body").each(function() {
      var link = $(this);
      var text = link.text();
      callback(null, text);
    });
  });
}

module.exports = ContentService;
