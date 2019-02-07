var BaseController = require('../../../shared/controllers/BaseController');
var ResponseBuilder = require('../../../shared/models/ResponseBuilder');

// Define AuthController
var AuthController = new BaseController('auth');

AuthController.post('/signIn', function (req, res) {
    ResponseBuilder.onSuccess(res)
        .setMessage('SignIn successfully')
        .build();
});

AuthController.post('/signUp', function (req, res) {
    ResponseBuilder.onSuccess(res)
        .setMessage('SignUp successfully')
        .build();
});

module.exports = AuthController;