// Dependencies
var http = require('http');
var config = require('./config');
var router = require('./routes/router');

// Configure the server to respond to all requests with a string
var server = http.createServer(function (req, res) {
  router.handleRequest(req, res);
});

// Start the server
server.listen(config.port, function () {
  console.log('The server is up and running on port ' + config.port + ' in ' + config.envName + ' mode.');
  router.build();
});

