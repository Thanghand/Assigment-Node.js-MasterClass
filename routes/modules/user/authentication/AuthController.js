const Controller = require('../../../shared/controllers/Controller');
const ResponseBuilder = require('../../../shared/models/ResponseBuilder');
const UserRepository = require('../shared/repository/UserRepository');
const ValidationUserLogic = require('./logics/ValidationUserLogic');

// Define controller
function AuthController(configPath){
    Controller.call(this, configPath);
    this.userRepository = new UserRepository();
    this.validationUserLogic = new ValidationUserLogic(this.userRepository);
}

AuthController.prototype = Object.create(Controller.prototype);

// Create Controller
const authController = new AuthController('auth');
const self = authController;

authController.post('/signIn',  (req, res) => {
    ResponseBuilder.onSuccess(res)
                    .setMessage('SignIn successfully')
                    .build();
});

authController.post('/signUp',  (req, res) => {
    self.validationUserLogic
        .validateNewAccount(req.body)
        .then(function(result){
            ResponseBuilder.onSuccess(res)
                .setMessage('SignIn successfully')
                .setBody(result)
                .build();
        }, function (error) {
            ResponseBuilder.onError(res)
                .setMessage(error)
                .build();
        });
});

module.exports = authController;