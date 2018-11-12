var parseUrlUtil = require('../utils/ParseUrlUtil');
var ResponseBuilder = require('../../models/ResponseBuilder');

const mappingGetPath = {};
const mappingPostPath = {};
const mappingPutPath = {};
const mappingDeletePath = {};

var BaseController = {
    configPath : '',
    get: function(path, functionRequestAndResponse){
        if (path === '/'){
            mappingGetPath[this.configPath] = functionRequestAndResponse;
        }
        mappingGetPath[path] = functionRequestAndResponse;

    },

    post: function(path, functionRequestAndResponse){
        mappingPostPath[path] = functionRequestAndResponse;        
        // mappingEndpoint[path] = functionRequestAndResponse;
    },

    put: function(path, functionRequestAndResponse){
        mappingPutPath[path] = functionRequestAndResponse;
    },

    delete: function(path, functionRequestAndResponse){
        mappingDeletePath[path] = functionRequestAndResponse;
    },

    handleRequest: function(req, res){
        console.log('Controller Handle request');
        var method = req.method.toLowerCase();
        switch(method){
            case 'get':{
                // Get the query string as an object
                var trimpath = parseUrlUtil.parseUrl(req.url);
                if (trimpath === this.configPath){
                    var methodPath = mappingGetPath[this.configPath];
                    methodPath(req, res);
                } else {
                    var queryStringObject = parseUrlUtil.getQueryObjectFromUrl(req.url);
                    if (isEmpty(queryStringObject)){
                        var methodPath = {};
                        for(var key in mappingGetPath) {
                            if(key.includes(':')){
                                var methodPath = mappingGetPath[key];
                                var nameObject = key.split(':')[1];
                                var params = {};
                                const objectOfTrimPath = trimpath.split('/')[1];
                                params[nameObject] = objectOfTrimPath;
                                req["params"] = params;
                                methodPath(req, res);
                                return;
                            }
                        }
                    } {
                        // TODO: Will Handle later
                        console.log("BBBBB");
                    }
                }
                break;
            }
            case 'post':{
                ResponseBuilder.onError(res)
                                .setMessage('This method have not support yet')
                                .build();
                break;
            }
            default: {
                ResponseBuilder.onError(res)
                                .setMessage('This method have not support yet')
                                .build();
                break;
            }
        }
    }
};

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

module.exports = BaseController;