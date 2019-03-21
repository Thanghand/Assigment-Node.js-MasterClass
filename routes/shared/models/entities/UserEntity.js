const BaseEntity = require('./BaseEntity');

module.exports = UserEntity;

function UserEntity(){
    BaseEntity.call(this, 'user');

    this.username = "";
    this.email = "";
    this.password = "";
    this.phone = "";
    this.isLogin = false;
    this.address =  {
        street: "",
        city: "",
        zipCode: 0
    }
}