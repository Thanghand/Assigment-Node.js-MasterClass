const UserTransformsModel = require('../../shared/transfomrations/UserTransformsModel');
const HashUtil = require('../../shared/utils/HashUtil');

module.exports = ValidationUserLogic;

function ValidationUserLogic(userRepository) {
    this.UserTransformsModel = UserTransformsModel;
    this.userRepository = userRepository;
}

ValidationUserLogic.prototype.validateNewAccount = function validateNewAccount(body) {

    const userEntity = this.UserTransformsModel.transformBodyToUserEntity(body);
    userEntity.password = HashUtil.hash(userEntity.password);

    if (!userEntity.username || !userEntity.email || !userEntity.password)
        throw new Error('Username, email or password cannot be empty');

    return new Promise((resolve, reject) => {

        const userRepository = this.userRepository;
        const request = { email: userEntity.email, username: userEntity.username};

        userRepository.getByQuery(userEntity.schema, request)
            .then((entity) => {
                reject(`Account has already existed, please change email: ${entity.email} or username: ${entity.username}`);
            }, (err) => {
                console.log(err);
                userRepository.add(userEntity).then(result => {
                    resolve(result);
                });
            });
    });
};