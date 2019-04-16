const AddingNewCartRequest = require('../models/addingNewCartRequest');
const OrderEntity = require('../../../shared/models/entities/orderEntity');

function AddingCartLogic(orderRepository){
    this.orderRepository = orderRepository;
}

AddingCartLogic.prototype.addCart = function (request) {

    const newCartRequest = new AddingNewCartRequest(request);

    return new Promise(((resolve, reject) => {
        const query = { userId: newCartRequest.user.id };

        this.orderRepository.getByQuery('order', query)
            .then(entities => {
                let entity = {};
                entities.forEach(e => {
                    if (!e.isPayed)
                        entity = e;
                });
                if (!entity.id)
                    reject(new Error('You do not have order'));

                let menuCart;
                entity.carts.forEach( cart => {
                    if(cart.id === newCartRequest.menu.id) {
                        cart.quantity += newCartRequest.menu.quantity;
                        menuCart = cart;
                    }
                });

                if (!menuCart)
                    entity.carts.push(newCartRequest.menu);

                this.orderRepository.update('order', entity)
                    .then((orderEntity) => resolve(orderEntity), err => reject(err));

            }, err => {
                // Doesn't have order
                console.log('Error: ', err);

                const orderEntity = new OrderEntity();
                orderEntity.carts.push(newCartRequest.menu);
                orderEntity.userId = newCartRequest.user.id;
                this.orderRepository.add('order', orderEntity)
                    .then((result) => {
                        resolve(result);
                    }, err => reject(err));
            });

    }));
};

module.exports = AddingCartLogic;

