const Controller = require('../../../shared/controllers/controller');
const ResponseBuilder = require('../../../shared/models/responseBuilder');

// Define controller
function ProfileController(configPath) {
    console.log('Profile ', configPath);
    Controller.call(this, configPath);
}
ProfileController.prototype = Object.create(Controller.prototype);

// Create controller
const profileController = new ProfileController('profile');

profileController.get('/:id', function(req, res){
    console.log('Get Testing');

    ResponseBuilder.onSuccess(res)
    .setMessage('Nothing happen')
    .build();
});

profileController.put('/:id', function(req, res){

});

profileController.use('/:id', function (req, res, next){
    console.log('Testing');
});

module.exports = profileController;