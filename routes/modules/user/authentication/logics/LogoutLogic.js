
const HashUtil = require('../../shared/utils/HashUtil');
const LogoutRequest = require('../models/LogoutRequest');
const TokenEntity = require('../../../../shared/models/entities/TokenEntity');

module.exports = LogoutLogic;

function LogoutLogic(userRepository, tokenRepository){
    this.userRepository = userRepository;
    this.tokenRepository = tokenRepository;
}

LogoutLogic.prototype.logout = function logout(request) {

    const logoutRequest = new LogoutRequest(request);
    const query = {
        email: logoutRequest.email
    };

    return new Promise((resolve, reject) => {
        this.userRepository.getByQuery('user', query)
            .then(entity => {
                return entity;
            },err => reject(err))
            .then(entity => {
                entity.isLogin = false;
                return new Promise((resolve, reject) => {

                    this.userRepository.update((entity)).then(entity => resolve(entity));
                });
            }, err => reject(err))
            .then(entity => {
                console.log('Logout testing');
                this.tokenRepository.delete('token', logoutRequest.token)
                    .then(result => resolve(result), err => reject(err))
            });
    });
};