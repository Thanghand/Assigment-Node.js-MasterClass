const UserTransformsModel = require('../../shared/transfomrations/userTransformsModel');
const HashUtil = require('../../shared/utils/hashUtil');

module.exports = CreateAccountLogic;

function CreateAccountLogic(userRepository) {
    this.UserTransformsModel = UserTransformsModel;
    this.userRepository = userRepository;
}

CreateAccountLogic.prototype.createNewAccount = function createNewAccount(body) {

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
                userRepository.add(userEntity).then(result => {
                    resolve(result);
                });
            });
    });
};