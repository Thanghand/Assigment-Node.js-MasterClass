// Define dependency
const ResponseBuilder = require('../../shared/models/responseBuilder');
const guideRepository = require('./guideRepository');
const Controller = require('../../shared/controllers/controller');

// Define Controller
function IntroductionController(configPath){
    Controller.call(this, configPath);
}

IntroductionController.prototype = Object.create(Controller.prototype);


const introductionController = new Controller('hello');

introductionController.get('/', (req, res) => {
    ResponseBuilder.onSuccess(res)
                    .setMessage("Get All messages successfully")
                    .setBody(guideRepository.getAllMessages())
                    .build();
});
  
introductionController.get('/:id', (req, res) => {
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

introductionController.post('/', (req, res) => {
    ResponseBuilder.onSuccess(res)
                    .setMessage('Add Message successflly with body')
                    .setBody(req.body)
                    .build();
});

module.exports = introductionController;

