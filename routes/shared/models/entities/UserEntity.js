
module.exports = UserEntity;

function UserEntity(){
    this.username = "";
    this.email = "";
    this.password = "";
    this.phone = "";
    this.address =  {
        street: "",
        city: "",
        zipCode: 0
    }
}