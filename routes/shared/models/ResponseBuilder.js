var objectUtil = require('../utils/objectUtil');

var ResponseBuilder = {
    statusCode : 200,
    message: '',
    body: {},
    isSuccess: false,
    res: {},
    setMessage: function (message){
        this.message = message;
        return this;
    },

    setBody: function(body){
        this.body = body
        return this;
    },
    onSuccess: function(res){
        this.statusCode = 200;
        this.isSuccess = true;
        this.body = {};
        this.message = '';
        this.res = res;
        this.res.writeHead(this.statusCode);
        return this;
    },
    onError: function(res){
        this.statusCode = 500;
        this.isSuccess = false;
        this.body = {};
        this.message = '';
        this.res = res;
        this.res.writeHead(this.statusCode);
        return this;
    },

    onError: function(res, statusCode){
        this.statusCode = statusCode !== undefined ? statusCode : 500;
        this.isSuccess = false;
        this.body = {};
        this.message = '';
        this.res = res;
        this.res.writeHead(this.statusCode);
        return this;
    },
    buildBodyOnly(){
        try {
            if (this.res === undefined){
                throw new Error('Res object is undefined');
            }
            var data = objectUtil.isJsonValid(this.body) ? JSON.parse(this.body) : this.body;
            return this.res.end(data);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    build(){
        try {
            var response = {};
            if (Object.keys(this.body).length === 0 
                || this.body === undefined 
                || this.body === null){
                response = {
                    'statusCode': this.statusCode,
                    'message': this.message,
                };
            } else {
                var data = objectUtil.isJsonValid(this.body) ? JSON.parse(this.body) : this.body;
                response = {
                    'statusCode': this.statusCode,
                    'message': this.message,
                    'data': data
                };
            }
            
            if (this.res === undefined){
                throw new Error('Res object is undefined');
            }
            return this.res.end(JSON.stringify(response));
        } catch (error) {
            throw new Error (error.message);
        }
          
    }
};

module.exports = ResponseBuilder;