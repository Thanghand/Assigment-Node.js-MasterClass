var IntroductionController = require('./modules/guide/IntroductionController');
var AuthController = require('./modules/user/controllers/AuthController');
var ProfileController = require('./modules/user/controllers/ProfileController');

var RouteController = require('./shared/controllers/RouteController');

var router = RouteController;
router.configRouting = {
    'controllers': [
        IntroductionController,
        AuthController,
        ProfileController,
    ]
};

module.exports = router;