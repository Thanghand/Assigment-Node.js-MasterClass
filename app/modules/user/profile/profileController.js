const Controller = require('../../../shared/controllers/controller');
const ResponseBuilder = require('../../../shared/models/responseBuilder');

// Define controller
function ProfileController() {
    Controller.call(this, 'profile');
}
ProfileController.prototype = Object.create(Controller.prototype);

// Create controller
const profileController = new ProfileController('');

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