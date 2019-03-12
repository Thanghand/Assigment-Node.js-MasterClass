const Controller = require('../../../shared/controllers/Controller');
const ResponseBuilder = require('../../../shared/models/ResponseBuilder');
const ValidationUserLogic = require('./logics/ValidationUserLogic');

// Define controller
function AuthController(configPath){
    Controller.call(this, configPath);
    this.validationUserLogic = new ValidationUserLogic();
};
AuthController.prototype = Object.create(Controller.prototype);

// Create Controller
const authController = new AuthController('auth');
const self = authController;

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