var BaseController = require('../../../shared/controllers/BaseController');

// Define AuthController
var AuthController =  Object.assign({}, BaseController);;
AuthController.configPath = 'auth';

AuthController.post('/signIn', function(req, res){

});

AuthController.post('/signUp', function(req, res){

});

module.exports = AuthController;