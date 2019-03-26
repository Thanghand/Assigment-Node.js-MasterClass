const Controller = require('../../../shared/controllers/controller');
const ResponseBuilder = require('../../../shared/models/responseBuilder');

// Define controller
function ProfileController(configPath) {
    Controller.call(this, configPath);
}
ProfileController.prototype = Object.create(Controller.prototype);

// Create controller
const profileController = new ProfileController('profile');

profileController.get('/:id', function(req, res){
    ResponseBuilder.onSuccess(res)
    .setMessage('Nothing happen')
    .build();
});

profileController.put('/:id', function(req, res){

});

profileController.use('/:id', function (req, res, next){
    next(req, res);
});

module.exports = profileController;