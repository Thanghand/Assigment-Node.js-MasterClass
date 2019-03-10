var Controller = require('../../../shared/controllers/Controller');
var ResponseBuilder = require('../../../shared/models/ResponseBuilder');
var ValidationUserLogic = require('./logics/ValidationUserLogic');

// Defne controller
function AuthController(configPath){
    Controller.call(this, configPath);
    this.validationUserLogic = new ValidationUserLogic();
};
AuthController.prototype = Object.create(Controller.prototype);

// Create Controller
var authController = new AuthController('auth');
var self = authController;

authController.post('/signIn', function (req, res) {
    ResponseBuilder.onSuccess(res)
        .setMessage('SignIn successfully')
        .build();
});

authController.post('/signUp', function (req, res) {
    self.validationUserLogic.validateNewAccount(req.body, function(response){
        ResponseBuilder.onSuccess(res)
        .setMessage('SignUp successfully')
        .setBody(response)
        .build();
    });
});

module.exports = authController;