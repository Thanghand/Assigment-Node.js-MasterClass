const Controller = require('../../shared/controllers/controller');
const OrderRepository = require('./repository/orderRepository');
const ShoppingCartLogic = require('./logics/shoppingCartLogic');
const ResponseBuilder = require('../../shared/models/responseBuilder');

// Define controller
function OrderController(path){
    Controller.call(this, path);
    this.orderRepository =  OrderRepository;
    this.shoppingCartLogic = new ShoppingCartLogic(this.orderRepository);
}
OrderController.prototype = Object.create(Controller.prototype);

// Create controller

const orderController = new OrderController('order');
const self = orderController;

orderController.post('/shopping', (req, res) => {
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

module.exports = orderController;