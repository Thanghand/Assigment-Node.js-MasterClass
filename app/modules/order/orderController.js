const Controller = require('../../shared/controllers/controller');


function OrderController() {
    Controller.call(this, 'order');
}

OrderController.prototype = Object.create(Controller.prototype);
const orderController = new Controller();


orderController.post('/', function (req, res) {

});

module.exports = orderController;