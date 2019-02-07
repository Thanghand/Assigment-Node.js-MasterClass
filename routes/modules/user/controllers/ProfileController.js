var Controller = require('../../../shared/controllers/Controller');
var ResponseBuilder = require('../../../shared/models/ResponseBuilder');

var ProfileController = new Controller('profile')

ProfileController.get('/:id', function(req, res){
    ResponseBuilder.onSuccess(res)
    .setMessage('Nothing happen')
    .build();
});

ProfileController.put('/:id', function(req, res){

});

module.exports = ProfileController;