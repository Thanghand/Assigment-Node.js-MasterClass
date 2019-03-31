const BaseEntity = require('./baseEntity');

module.exports = OrderEntity;

function OrderEntity(){
    BaseEntity.call(this);
    this.carts = [];
    this.isPayed = false;
    this.userId = '';
}