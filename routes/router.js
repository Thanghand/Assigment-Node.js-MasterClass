var parseUrlUtil = require('./shared/utils/ParseUrlUtil');
var ResponseBuilder = require('./models/ResponseBuilder');
var introductionController = require('./controllers/introduction/IntroductionController');
var RouteController = require('./shared/base/RouteController');

var router = RouteController;
router.configRouting = {
    'hello': introductionController
};

module.exports = router;