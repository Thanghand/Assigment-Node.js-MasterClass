var IntroductionController = require('./modules/guide/IntroductionController');
var AuthController = require('./modules/user/authentication/AuthController');
var ProfileController = require('./modules/user/profile/ProfileController');
var Routes = require('./shared/controllers/Routes');

var router = new Routes();
router.config = {
    controllers: [
        IntroductionController,
        AuthController,
        ProfileController,
    ]
};

module.exports = router;