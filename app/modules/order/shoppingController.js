const Controller = require('../../shared/controllers/controller');
const OrderRepository = require('./repository/orderRepository');
const AddingCartLogic = require('./logics/addingCartLogic');
const GettingCartLogic = require('./logics/gettingCartLogic');

const ResponseBuilder = require('../../shared/models/responseBuilder');
const AuthenticationService = require('../../shared/services/authenticationService');

// Define controller
function ShoppingController(){
    Controller.call(this, 'shopping');
    this.orderRepository =  OrderRepository;
    this.addingCartLogic = new AddingCartLogic(this.orderRepository);
    this.gettingCartLogic = new GettingCartLogic(this.orderRepository);

}
ShoppingController.prototype = Object.create(Controller.prototype);

// Create controller
const shoppingController = new ShoppingController();

shoppingController.post('/', (req, res) => {
    shoppingController.addingCartLogic.addCart(req.body)
        .then(result => {
            ResponseBuilder.onSuccess(res)
                .setMessage('Adding cart successfully')
                .setBody(result)
                .build();
        }, err => {
            ResponseBuilder.onError(res)
                .setMessage('Adding cart failed')
                .setBody(err)
                .build();
        })
});


shoppingController.get('/:id', (req, res) => {
    const userId = req.params.id;
    shoppingController.gettingCartLogic.getCurrentCart(userId)
        .then(result => {
            if (result.carts.length === 0) {
                ResponseBuilder.onSuccess(res)
                    .setMessage('No cart available')
                    .build();
            }
            else {
                ResponseBuilder.onSuccess(res)
                    .setMessage('Getting cart successfully')
                    .setBody(result)
                    .build();
            }
        }, err => {
            ResponseBuilder.onError(res)
                .setMessage('Getting cart failed')
                .setBody(err)
                .build();
        });
});

shoppingController.use('/', function(req, res, next){
    console.log('Token: ', req.headers.authorization);
    const token = req.headers.authorization;
    if(!token)
        ResponseBuilder.onError(res)
            .setStatusCode(403)
            .setMessage('UnAuthorized')
            .setBody(err)
            .build();

    AuthenticationService.verifyToken(token)
        .then(() => {
            next(req, res);
        }, err => {
            ResponseBuilder.onError(res)
                .setStatusCode(403)
                .setMessage('UnAuthorized')
                .setBody(err)
                .build();
        });
});

module.exports = shoppingController;