const Controller = require('../../shared/controllers/controller');
const OrderRepository = require('./repository/orderRepository');
const ShoppingCartLogic = require('./logics/shoppingCartLogic');
const ResponseBuilder = require('../../shared/models/responseBuilder');

// Define controller
function ShoppingController(path){
    Controller.call(this, path);
    this.orderRepository =  OrderRepository;
    this.shoppingCartLogic = new ShoppingCartLogic(this.orderRepository);
}
ShoppingController.prototype = Object.create(Controller.prototype);

// Create controller

const shoppingController = new ShoppingController('shopping');
const self = shoppingController;

shoppingController.post('/', (req, res) => {
    self.shoppingCartLogic.addCart(req.body)
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
    console.log("UserID: ", userId);
    self.shoppingCartLogic.getCurrentCart(userId)
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

module.exports = shoppingController;