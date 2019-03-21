const IntroductionController = require('./modules/guide/IntroductionController');
const AuthController = require('./modules/user/authentication/AuthController');
const ProfileController = require('./modules/user/profile/ProfileController');
const Routes = require('./shared/controllers/Routes');

const router = new Routes({
    controllers: [
        IntroductionController,
        AuthController,
        ProfileController,
    ]
});

module.exports = router;