const parseUrlUtil = require('../utils/parseUrlUtil');
const objectUtil = require('../utils/objectUtil');
const ResponseBuilder = require('../models/responseBuilder');
const StringDecoder = require('string_decoder').StringDecoder;

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
    const method = req.method.toLowerCase();
    switch (method) {
        case 'get': {
            // Get the query string as an object
            const trimPath = parseUrlUtil.parseUrl(req.url);
            if (trimPath === this.configPath) {
                const methodPath = this.mappingGetPath[this.configPath];
                methodPath(req, res);
            } else {
                const queryStringObject = parseUrlUtil.getQueryObjectFromUrl(req.url);
                if (objectUtil.isEmpty(queryStringObject)) {
                    for (const key in this.mappingGetPath) {
                        if (key.includes(':')) {
                            const methodPath = this.mappingGetPath[key];
                            const nameObject = key.split(':')[1];
                            const params = {};
                            const objectOfTrimPath = trimPath.split('/')[1];
                            params[nameObject] = objectOfTrimPath;
                            req["params"] = params;
                            methodPath(req, res);
                            return;
                        }
                    }
                } else {
                    // TODO: Will Handle later
                    console.log("Handle Later");
                }
            }
            break;
        }

        case 'post': {
            const trimpath = parseUrlUtil.parseUrl(req.url);
            const  decoder = new StringDecoder('utf-8');

            let buffer = '';
            req.on('data', (data) => {
                buffer += decoder.write(data);
            }).on('end', () => {
                buffer += decoder.end();
                req.body = JSON.parse(buffer);
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
                                   .setMessage('Error ' + ex.message)
                                   .build();
                }
            }, this);
            break;
        }
        default: {
            ResponseBuilder.onError(res)
                .setMessage('Error')
                .build();
            break;
        }
    }
};
