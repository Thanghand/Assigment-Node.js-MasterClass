const BaseEntity = require('./baseEntity');

module.exports = OrderEntity;

function OrderEntity(userId){
    BaseEntity.call(this);
    this.carts = [];
    this.isPayed = false;
    this.userId = userId ? userId : '';
}