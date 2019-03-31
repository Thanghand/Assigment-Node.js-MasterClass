const parseUrlUtil = require('../utils/parseUrlUtil');
const ResponseBuilder = require('../models/responseBuilder');
const PrepareMenuData = require('../../modules/prepare/prepareMenus');
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

    if(!fs.existsSync(directory))
        fs.mkdirSync(directory);

    const userCollection = `${directory}user`;
    const tokenCollection = `${directory}token`;
    const menuCollection = `${directory}menu`;
    const orderCollection = `${directory}order`;

    CreateCollection(userCollection);
    CreateCollection(tokenCollection);
    CreateCollection(orderCollection);

    // PreparePizzas.run();
    if(!fs.existsSync(menuCollection))
    {
        CreateCollection(menuCollection);
        PrepareMenuData.run().then(menuEntities => {
            console.log('Menu Entities: ', menuEntities);
        });
    }
};

function CreateCollection(collection){
    if(!fs.existsSync(collection))
        fs.mkdirSync(collection);
}

