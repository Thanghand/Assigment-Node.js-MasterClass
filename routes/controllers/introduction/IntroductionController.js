// Define dependency
var ResponseBuilder = require('../../models/ResponseBuilder');
var guideRepository = require('../../repositories/GuideRepository');
var BaseController = require('../../shared/base/BaseController');

var IntroductionController = BaseController;

// Define configPath;
IntroductionController.configPath = 'hello';

IntroductionController.get('/', function(req, res){
    ResponseBuilder.onSuccess(res)
                    .setMessage("Get All messages successfully")
                    .setBody(guideRepository.getAllMessages())
                    .build();
});

IntroductionController.get('/:id', function(req, res){
    var index = req.params.id;

    if (isNaN(index)) 
        throw new Error('Sorry Id should be a number');
       
    if(guideRepository.getAllMessages().length - 1 < index){
       
        ResponseBuilder.onError(res)
                        .setMessage('Sorry id does not existed' + req.params.id)
                        .build();
    } else {
        ResponseBuilder.onSuccess(res)
                        .setMessage('Get Message successflly')
                        .setBody(guideRepository.getMessage(index))
                        .build();
    }
});

module.exports = IntroductionController;