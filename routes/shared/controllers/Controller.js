var parseUrlUtil = require('../utils/parseUrlUtil');
var objectUtil = require('../utils/objectUtil');
var ResponseBuilder = require('../models/ResponseBuilder');
var StringDecoder = require('string_decoder').StringDecoder;


module.exports = Controller;

function Controller(path) {
    this.configPath = path;
    this.mappingGetPath = {};
    this.mappingPostPath = {};
    this.mappingPutPath = {};
    this.mappingDeletePath = {};
}

Controller.prototype.get = function get(path, functionRequestAndResponse) {
    if (path === '/') {
        this.mappingGetPath[this.configPath] = functionRequestAndResponse;
        return;
    }
    this.mappingGetPath[this.configPath + path] = functionRequestAndResponse;
};

Controller.prototype.post = function (path, functionRequestAndResponse) {
    if (path === '/') {
        this.mappingPostPath[this.configPath] = functionRequestAndResponse;
        return;
    }
    this.mappingPostPath[this.configPath + path] = functionRequestAndResponse;

};

Controller.prototype.put = function (path, functionRequestAndResponse) {
    this.mappingPutPath[path] = functionRequestAndResponse;
};

Controller.prototype.delete = function (path, functionRequestAndResponse) {
    this.mappingDeletePath[path] = functionRequestAndResponse;
};

Controller.prototype.handleRequest = function (req, res) {
    var method = req.method.toLowerCase();
    switch (method) {
        case 'get': {
            // Get the query string as an object
            var trimpath = parseUrlUtil.parseUrl(req.url);
            if (trimpath === this.configPath) {
                var methodPath = this.mappingGetPath[this.configPath];
                methodPath(req, res);
            } else {
                var queryStringObject = parseUrlUtil.getQueryObjectFromUrl(req.url);
                if (objectUtil.isEmpty(queryStringObject)) {
                    var methodPath = {};
                    for (var key in this.mappingGetPath) {
                        if (key.includes(':')) {
                            var methodPath = this.mappingGetPath[key];
                            var nameObject = key.split(':')[1];
                            var params = {};
                            const objectOfTrimPath = trimpath.split('/')[1];
                            params[nameObject] = objectOfTrimPath;
                            req["params"] = params;
                            methodPath(req, res);
                            return;
                        }
                    }
                } else {
                    // TODO: Will Handle later
                    console.log("BBBBB");
                }
            }
            break;
        }

        case 'post': {
            var trimpath = parseUrlUtil.parseUrl(req.url);
            var decoder = new StringDecoder('utf-8');
            var buffer = '';
            req.on('data', (data) => {
                buffer += decoder.write(data);
            }).on('end', () => {
                buffer += decoder.end();
                req.body = buffer;
                try {
                    if (trimpath === this.configPath) {
                        let methodPath = this.mappingPostPath[this.configPath];
                        methodPath(req, res);
                        return;
                    }

                    let methodPath = this.mappingPostPath[trimpath];
                    if (methodPath === undefined)
                        throw new Error('Cannot find api');

                    methodPath(req, res);
                } catch (ex) {
                    console.error('Error: ', ex);
                    ResponseBuilder.onError(res)
                        .setMessage('This method have not support yet')
                        .build();
                }
            }, this);
            break;
        }
        default: {
            ResponseBuilder.onError(res)
                .setMessage('This method have not support yet')
                .build();
            break;
        }
    }
};