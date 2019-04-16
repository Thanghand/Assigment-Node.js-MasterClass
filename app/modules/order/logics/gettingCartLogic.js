const AddingNewCartRequest = require('../models/addingNewCartRequest');
const OrderEntity = require('../../../shared/models/entities/orderEntity');

function GettingCartLogic(orderRepository){
    this.orderRepository = orderRepository;
}

GettingCartLogic.prototype.getCurrentCart = function(userId){
    return new Promise(((resolve, reject) => {
        const query = {userId: userId};
        this.orderRepository.getByQuery('order', query)
            .then((entities) => {
                entities.forEach( e => {
                    if (!e.isPayed){
                        resolve(e);
                    }
                });
                let orderEntity = new OrderEntity(userId);
                resolve(orderEntity);
            }, err => reject(err));
    }));
};

module.exports = GettingCartLogic;

