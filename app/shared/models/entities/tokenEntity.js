const BaseEntity = require('./baseEntity');
module.exports = TokenEntity;

function TokenEntity(id, email){
    BaseEntity.call(this, 'token', id);
    this.email = email;
    this.expires = Date.now() + 1000 * 60 * 60;
}