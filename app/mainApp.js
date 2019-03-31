const IntroductionController = require('./modules/guide/introductionController');
const AuthController = require('./modules/user/authentication/authController');
const ProfileController = require('./modules/user/profile/profileController');
const MenuController = require('./modules/menu/menuController');
const OrderController = require('./modules/order/orderController');

const ApplicationModule = require('./shared/lib/applicationModules');

const mainApp = new ApplicationModule({
    controllers: [
        IntroductionController,
        AuthController,
        ProfileController,
        MenuController,
        OrderController
    ]
});

module.exports = mainApp;