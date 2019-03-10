// Dependencies
var http = require('http');
var https = require('https');
var config = require('./config');
var router = require('./routes/router');
var fs = require('fs');

// Configure the server to respond to all requests with a string
var httpServer = http.createServer(function (req, res) {
  router.handleRequest(req, res);
});

// Start the server
httpServer.listen(config.httpPort, function () {
  console.log('The http server is up and running on port ' + config.httpPort + ' in ' + config.envName + ' mode.');
  router.build();
});

var serverOptions = {
	'key': fs.readFileSync('./https/key.pem'),
	'cert': fs.readFileSync('./https/cert.pem')
};

var httpsServer = https.createServer(serverOptions, function (req, res) {
 	router.handleRequest(req, res);
});

httpsServer.listen(config.httpsPort, function () {
  console.log('The https server is up and running on port ' + config.httpsPort + ' in ' + config.envName + ' mode.');
  router.build();
});

