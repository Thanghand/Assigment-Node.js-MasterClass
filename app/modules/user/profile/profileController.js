const Controller = require('../../../shared/controllers/controller');
const ResponseBuilder = require('../../../shared/models/responseBuilder');

const ProfileController = new Controller('profile')

ProfileController.get('/:id', function(req, res){
    ResponseBuilder.onSuccess(res)
    .setMessage('Nothing happen')
    .build();
});

ProfileController.put('/:id', function(req, res){

});


module.exports = ProfileController;