const UserTransformsModel = require('../../shared/transfomrations/UserTransformsModel');
const HashUtil = require('../../shared/utils/HashUtil');
module.exports = ValidationUserLogic;

function ValidationUserLogic(userRepository) {
    this.UserTransformsModel = UserTransformsModel;
    this.userRepository = userRepository;
}
ValidationUserLogic.prototype.validateNewAccount = function validateNewAccount(body) {

    const userEntity = this.UserTransformsModel.transformBodyToUserEntity(body);
    const hashPassword = HashUtil.hash(userEntity.password);
    if (!hashPassword){
        console.log('Cannot hash password');
        throw new Error('Sorry there is something wrong');
    }

    if (!userEntity.username || !userEntity.email || !userEntity.password)
        throw new Error('Username, email or password cannot be empty');

    userEntity.password = hashPassword;
    return new Promise((resolve, reject) => {
        const userRepository = this.userRepository;

        userRepository.getByQuery(userEntity.schema, { email: userEntity.email, username: userEntity.username})
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