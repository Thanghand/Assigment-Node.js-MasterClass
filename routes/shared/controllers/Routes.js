var parseUrlUtil = require('../utils/parseUrlUtil');
var ResponseBuilder = require('../models/ResponseBuilder');

module.exports = Routes;

function Routes(){
    this.config = {};
};

Routes.prototype.handleRequest = function(req, res){
    try {
        var trimpath = parseUrlUtil.parseUrl(req.url);
        console.log('New Request path: ', req.url);

        // Get Endpoint
        var endpoint = trimpath.split('/')[0];

        // Get Controller
        var foundController;
        this.config.controllers.forEach(function(controller) {
            if (controller.configPath === endpoint){
                foundController = controller;
                foundController.handleRequest(req, res); 
                return true;
            }
        });

        if (foundController === undefined)
            throw new Error('Cannot find api');

    } catch (ex){
        console.log('Error message: ', ex);
        ResponseBuilder.onError(res)
                        .setMessage('Internal error')
                        .build();
    }
};