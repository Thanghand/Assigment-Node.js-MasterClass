const Controller = require('../../../shared/controllers/controller');
const ResponseBuilder = require('../../../shared/models/responseBuilder');
const UserRepository = require('../shared/repository/userRepository');
const TokenRepository = require('../../../shared/repository/tokenRepository');

const CreateAccountLogic = require('./logics/createAccountLogic');
const LoginLogic = require('./logics/loginLogic');
const LogoutLogic = require('./logics/logoutLogic');

// Define controller
function AuthController(configPath){
    Controller.call(this, configPath);

    this.userRepository = new UserRepository();
    this.tokenRepository = new TokenRepository();

    this.createAccountLogic = new CreateAccountLogic(this.userRepository);
    this.loginLogic = new LoginLogic(this.userRepository, this.tokenRepository);
    this.logoutLogic = new LogoutLogic(this.userRepository, this.tokenRepository);
}

AuthController.prototype = Object.create(Controller.prototype);

// Create Controller
const authController = new AuthController('auth');
const self = authController;

authController.post('/signIn',  (req, res) => {

    self.loginLogic
        .verifyAccount(req.body)
        .then(result => {
            ResponseBuilder.onSuccess(res)
                .setMessage('SignIn successfully')
                .setBody(result)
                .build();
        }, err => {
            ResponseBuilder.onError(res, 401)
                .setMessage('Unauthorized')
                .build();
        });
});

authController.post('/logout', (req, res) => {

    self.logoutLogic
        .logout(req.body)
        .then(result => {
            if(result)
                ResponseBuilder.onSuccess(res)
                    .setMessage('Logout successfully')
                    .setBody(result)
                    .build();

        }, err => {
            ResponseBuilder.onError(res)
                .setMessage('Sorry there is something wrong')
                .build();
        })
});

authController.post('/signUp',  (req, res) => {

    self.createAccountLogic
        .createNewAccount(req.body)
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