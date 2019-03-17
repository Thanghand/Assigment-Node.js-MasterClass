const UserTransformsModel = require('../../shared/transfomrations/UserTransformsModel');

module.exports = VerifyUserLogic;

function VerifyUserLogic(userRepository){
    this.userRepository = userRepository;
}
