const IntroductionController = require('./modules/guide/introductionController');
const AuthController = require('./modules/user/authentication/authController');
const ProfileController = require('./modules/user/profile/profileController');
const MenuController = require('./modules/menu/menuController');
const ShoppingController = require('./modules/order/shoppingController');

const ApplicationModule = require('./shared/lib/applicationModules');

const mainApp = new ApplicationModule({
    controllers: [
        IntroductionController,
        AuthController,
        ProfileController,
        MenuController,
        ShoppingController
    ]
});

module.exports = mainApp;