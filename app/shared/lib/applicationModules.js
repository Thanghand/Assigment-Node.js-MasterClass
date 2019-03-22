const parseUrlUtil = require('../utils/parseUrlUtil');
const ResponseBuilder = require('../models/responseBuilder');
const fs = require('fs');
const path = require('path');

const directory = baseDir = path.join(__dirname,'../../../db/');

module.exports = ApplicationModules;

function ApplicationModules(config) {
    this.config = config;
    this.mapControllers = [];
}

ApplicationModules.prototype.handleRequest = function (req, res) {
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

ApplicationModules.prototype.build = function () {

    // Setup controllers

    this.config.controllers.forEach(controller => {
        const key = controller.configPath;
        this.mapControllers = { ...this.mapControllers, ...{ [key]: controller } };
    }, this);

    // Init table database

    const userCollection = `${directory}user`;
    const tokenCollection = `${directory}token`;

    if(!fs.existsSync(userCollection))
        fs.mkdirSync(userCollection);

    if(!fs.existsSync(tokenCollection))
        fs.mkdirSync(tokenCollection);

};

