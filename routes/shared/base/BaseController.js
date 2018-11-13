var parseUrlUtil = require('../utils/parseUrlUtil');
var objectUtil = require('../utils/objectUtil');
var ResponseBuilder = require('../../models/ResponseBuilder');
var StringDecoder = require('string_decoder').StringDecoder;

const mappingGetPath = {};
const mappingPostPath = {};
const mappingPutPath = {};
const mappingDeletePath = {};

var BaseController = {
    configPath : '',
    get: function(path, functionRequestAndResponse){
        if (path === '/'){
            mappingGetPath[this.configPath] = functionRequestAndResponse;
            return;
        }
        mappingGetPath[path] = functionRequestAndResponse;
    },

    post: function(path, functionRequestAndResponse){
        if (path === '/'){
            mappingPostPath[this.configPath] = functionRequestAndResponse;  
        }
    },

    put: function(path, functionRequestAndResponse){
        mappingPutPath[path] = functionRequestAndResponse;
    },

    delete: function(path, functionRequestAndResponse){
        mappingDeletePath[path] = functionRequestAndResponse;
    },

    handleRequest: function(req, res){
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
                    if (objectUtil.isEmpty(queryStringObject)){
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
                var trimpath = parseUrlUtil.parseUrl(req.url);
                if (trimpath === this.configPath){
                    var decoder = new StringDecoder('utf-8');
                    var buffer = '';
                    req.on('data', function(data) {
                        buffer += decoder.write(data);
                    });

                    req.on('end', function() {
                        buffer += decoder.end();
                        req.body = buffer;
                        var methodPath = mappingPostPath[trimpath];
                        methodPath(req, res);
                    });

                    return;
                }
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


module.exports = BaseController;