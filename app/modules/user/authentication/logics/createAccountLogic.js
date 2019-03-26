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



    return new Promise((resolve, reject) => {

        if (!userEntity.username || !userEntity.email || !userEntity.password)
            reject (Error('Username, email or password cannot be empty'));

        const userRepository = this.userRepository;
        const query  = { email: userEntity.email, username: userEntity.username};

        userRepository.getByQuery('user', query)
            .then((entities) => {
                if (entities.length > 0)
                    reject(`Account has already existed, please change email: ${userEntity.email} or username: ${userEntity.username}`);
            }, (err) => {
                console.log(err);
                userRepository.add('user', userEntity).then(result => {
                    resolve(result);
                });
            });
    });
};