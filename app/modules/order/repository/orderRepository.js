const BaseRepository = require('../../../shared/repository/baseRepository');

function OrderRepository() {
    BaseRepository.call(this);
}

const orderRepository = new OrderRepository();
module.exports = orderRepository;
