var IntroductionController = require('./modules/guide/IntroductionController');
var AuthController = require('./modules/user/controllers/AuthController');
var ProfileController = require('./modules/user/controllers/ProfileController');
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