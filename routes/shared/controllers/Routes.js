const parseUrlUtil = require('../utils/parseUrlUtil');
const ResponseBuilder = require('../models/ResponseBuilder');

module.exports = Routes;

function Routes() {
    this.config = {};
    this.mapControllers = [];
}

Routes.prototype.handleRequest = function (req, res) {
    try {
        const trimpath = parseUrlUtil.parseUrl(req.url);
        console.log('New Request path: ', req.url);

        // Get Endpoint
        const endpoint = trimpath.split('/')[0];

        // Get Controller
        const foundController = this.mapControllers[endpoint];
        if (foundController === undefined)
            throw new Error('Cannot find api');

        foundController.handleRequest(req, res);

    } catch (ex) {
        console.log('Error message: ', ex);
        ResponseBuilder.onError(res)
            .setMessage('Internal error')
            .build();
    }
};

Routes.prototype.build = function () {
    this.config.controllers.forEach(controller => {
        const key = controller.configPath;
        this.mapControllers = { ...this.mapControllers, ...{ [key]: controller } };
    }, this);
};

