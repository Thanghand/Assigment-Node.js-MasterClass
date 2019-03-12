const UserTransformsModel = require('../../shared/transfomrations/UserTransformsModel');
const UserRepository = require('../../shared/repository/UserRepository');

module.exports = ValidationUserLogic;

function ValidationUserLogic() {
    this.UserTransformsModel = new UserTransformsModel();
    this.userRepository = new UserRepository();
};

ValidationUserLogic.prototype.validateNewAccount = function validateNewAccount(body, response) {
    const userEntity = this.UserTransformsModel.transformBodyToUserEntity(body);

    if (!userEntity.username || !userEntity.email || !userEntity.password)
        throw new Error('Username, email or password cannot be empty');

    this.userRepository.add(userEntity, function (result) {
        response(userEntity);
    });
};

ValidationUserLogic.prototype.verifyAccount = function verifyAccount(body, response){

};