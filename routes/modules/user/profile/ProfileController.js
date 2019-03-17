const Controller = require('../../../shared/controllers/Controller');
const ResponseBuilder = require('../../../shared/models/ResponseBuilder');

const ProfileController = new Controller('profile');

ProfileController.get('/:id', function(req, res){
    ResponseBuilder.onSuccess(res)
    .setMessage('Nothing happen')
    .build();
});

ProfileController.put('/:id', function(req, res){

});


module.exports = ProfileController;