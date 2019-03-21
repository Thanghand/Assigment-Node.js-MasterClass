const Controller = require('../../../shared/controllers/Controller');
const ResponseBuilder = require('../../../shared/models/ResponseBuilder');
const UserRepository = require('../shared/repository/UserRepository');
const TokenRepository = require('../../../shared/repository/TokenRepository');

const ValidationUserLogic = require('./logics/ValidationUserLogic');
const VerifyUserLogic = require('./logics/VerifyUserLogic');

// Define controller
function AuthController(configPath){
    Controller.call(this, configPath);

    this.userRepository = new UserRepository();
    this.tokenRepository = new TokenRepository();

    this.validationUserLogic = new ValidationUserLogic(this.userRepository);
    this.verifyUserLogic = new VerifyUserLogic(this.userRepository, this.tokenRepository);
}

AuthController.prototype = Object.create(Controller.prototype);

// Create Controller
const authController = new AuthController('auth');
const self = authController;

authController.post('/signIn',  (req, res) => {

    self.verifyUserLogic
        .verifyAccount(req.body)
        .then(result => {
            ResponseBuilder.onSuccess(res)
                .setMessage('SignIn successfully')
                .setBody(result)
                .build();
        }, err => {
            ResponseBuilder.onError(res, 401)
                .setMessage(`${err}`)
                .build();
        });


});

authController.post('/signUp',  (req, res) => {
    self.validationUserLogic
        .validateNewAccount(req.body)
        .then(result => {
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