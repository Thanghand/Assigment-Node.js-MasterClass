# Assigment1-Node.js-MasterClass 

# Introduction my library: 
- I'm really love this course, it help me to understand basically about node.js. 
- For my first assigment, I'm trying to make something different. I make my own library look the same with expressjs ^^. However, it has not finish yet.
- Now my library just only support with Get & Post method.

### Note: Eventhough I know Es6, my library is using basic javascript. I like to start with the basic first, so when I start to next Assgiment I will apply Es6.

# How does it work
- I make two important base object: BaseController and RouteController.

* When I start to work with route just config simple step: 
 ```
var introductionController = require('./controllers/introduction/IntroductionController');
var RouteController = require('./shared/base/RouteController');

var router = RouteController;
router.configRouting = {
    'controllers': [
        introductionController
    ]
};
 ```
 
 ```
IntroductionController.configPath = 'hello';
IntroductionController.get('/', function(req, res){
    ResponseBuilder.onSuccess(res)
                    .setMessage("Get All messages successfully")
                    .setBody(guideRepository.getAllMessages())
                    .build();
});
IntroductionController.post('/', function(req, res){
    ResponseBuilder.onSuccess(res)
                    .setMessage('Add Message successflly with body')
                    .setBody(req.body)
                    .build();
});
 ```
- I create class name ResponseBuilder to wrap and easy to use for responding

### Note: You can see , I can start new controller very quickly with these steps.

# How does my api work: 

### Get: /hello  => 
* {
    "statusCode": 200,
    "message": "Get All messages successfully",
    "data": [
        "Hello my name is thang Cao",
        "Welcome to my assigment",
        "Please connect to my facebook ThangHand",
        "Please contact to me via gmail: caohoangthang93@gmail.com"
    ]
}

### Get: /hello/{id} (/hello/1) => 
* {
    "statusCode": 200,
    "message": "Get Message successflly",
    "data": "Welcome to my assigment"
}

### Post : /hello  with body : { 'name': 'Thang Cao', 'age': 25 } => 
* {
    "statusCode": 200,
    "message": "Add Message successflly with body",
    "data": {
        "name": "ThangCao",
        "age": 25
    }
}

### Note: I have already handled error handling for my project. When you start with error api, it will response error message. Or you can send request with Put and Delete, it also responses error message.

