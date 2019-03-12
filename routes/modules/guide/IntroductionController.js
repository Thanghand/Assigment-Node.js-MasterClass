// Define dependency
const ResponseBuilder = require('../../shared/models/ResponseBuilder');
const guideRepository = require('./GuideRepository');
const Controller = require('../../shared/controllers/Controller');

// Define Controller
function IntroductionController(configPath){
    Controller.call(this, configPath);
};
IntroductionController.prototype = Object.create(Controller.prototype);


const introductionController = new Controller('hello');

introductionController.get('/', function(req, res){
    ResponseBuilder.onSuccess(res)
                    .setMessage("Get All messages successfully")
                    .setBody(guideRepository.getAllMessages())
                    .build();
});
  
introductionController.get('/:id', function(req, res){
    const index = req.params.id;
    if (isNaN(index)) 
        throw new Error('Sorry Id should be a number');
       
    if(guideRepository.getAllMessages().length - 1 < index){
       
        ResponseBuilder.onError(res)
                        .setMessage('Sorry id does not existed ' + req.params.id)
                        .build();
    } else {
        ResponseBuilder.onSuccess(res)
                        .setMessage('Get Message successflly')
                        .setBody(guideRepository.getMessage(index))
                        .build();
    }
});

introductionController.post('/', function(req, res){
    ResponseBuilder.onSuccess(res)
                    .setMessage('Add Message successflly with body')
                    .setBody(req.body)
                    .build();
});

module.exports = introductionController;

