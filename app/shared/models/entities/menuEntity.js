const BaseEntity = require('./baseEntity');

module.exports = MenuEntity;

function MenuEntity(){
    BaseEntity.call(this);
    this.name = '';
    this.description = '';
    this.prices = {
        small: 0,
        medium: 0,
        large: 0
    };
    this.sizes = ['small', 'medium', 'large'];
    this.image = '';
}