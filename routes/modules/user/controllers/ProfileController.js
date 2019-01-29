var BaseController = require('../../../shared/controllers/BaseController');

var ProfileController = Object.assign({}, BaseController);
ProfileController.configPath = 'profile';

ProfileController.get('/:id', function(req, res){

});

ProfileController.put('/:id', function(req, res){

});

module.exports = ProfileController;