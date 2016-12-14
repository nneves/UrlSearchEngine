var utils = require('../lib/utils');
var join = require('path').join;
var fs = require('fs');
var path = require('path');
var request = require('request');

module.exports = function(app, useCors) {
  var contentService = app.settings.contentService;
  var fileCleanerService = app.settings.fileCleanerService;

  // routes
  app.get('/', function(req, res, next) {
    if (!req.param('url', false)) {
      return res.redirect('/usage.html');
    }

    var url = utils.url(req.param('url'));

    console.log('Get page content for url: %s', url);
    contentService.fetchData(url, function (err, data) {
      res.write(err || data);
      res.end();
    })
  });

  app.get('*', function(req, res, next) {
    // for backwards compatibility, try redirecting to the main route if the request looks like /www.google.com
    res.redirect('/?url=' + req.url.substring(1));
  });
};