var parseUrlUtil = require('../utils/parseUrlUtil');
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
            var foundController = undefined;
            this.configRouting.controllers.forEach(function(controller) {
                if (controller.configPath === endpoint){
                    foundController = controller;
                    return;
                }
            });

            if (foundController === undefined)
                throw new Error('Cannot find api');

            foundController.handleRequest(req, res);    
        } catch (ex){
            console.log('Error message: ', ex);
            ResponseBuilder.onError(res)
                            .setMessage(ex.message)
                            .build();
        }
    }
};

module.exports = RouteController;