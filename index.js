// Dependencies
const http = require('http');
const https = require('https');
const config = require('./config');
const app = require('./app/mainApp');
const fs = require('fs');

// Configure the server to respond to all requests with a string
const httpServer = http.createServer(function (req, res) {
  app.handleRequest(req, res);
});

// Start the server
httpServer.listen(config.httpPort, function () {
  console.log('The http server is up and running on port ' + config.httpPort + ' in ' + config.envName + ' mode.');
  app.build();
});

const serverOptions = {
	'key': fs.readFileSync('./https/key.pem'),
	'cert': fs.readFileSync('./https/cert.pem')
};

// const httpsServer = https.createServer(serverOptions, function (req, res) {
//  	app.handleRequest(req, res);
// });
//
// httpsServer.listen(config.httpsPort, function () {
//   console.log('The https server is up and running on port ' + config.httpsPort + ' in ' + config.envName + ' mode.');
//   app.build();
// });

