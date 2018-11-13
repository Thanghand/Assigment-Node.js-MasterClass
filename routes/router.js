var introductionController = require('./controllers/introduction/IntroductionController');
var RouteController = require('./shared/base/RouteController');

var router = RouteController;
router.configRouting = {
    'controllers': [
        introductionController
    ]
};

module.exports = router;