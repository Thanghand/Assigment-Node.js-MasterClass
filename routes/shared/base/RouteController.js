var parseUrlUtil = require('../utils/ParseUrlUtil');
var ResponseBuilder = require('../../models/ResponseBuilder');

var RouteController = {
    configRouting : {},
    handleRequest: function(req, res) {
        try {
            var trimpath = parseUrlUtil.parseUrl(req.url);
            console.log('New Request path: ', req.url);

            // Get Endpoint
            var endpoint = trimpath.split('/')[0];

            // Get Controller
            var controller = this.configRouting[endpoint];
            if (controller === undefined){
                ResponseBuilder.onError(res)
                                .setMessage('Not found api')
                                .build();
            } else {
                controller.handleRequest(req, res);
            }

        } catch (ex){
            console.log('Error message: ', ex);
            ResponseBuilder.onError(res)
                            .setMessage(ex.message)
                            .build();
        }
    }
};

module.exports = RouteController;