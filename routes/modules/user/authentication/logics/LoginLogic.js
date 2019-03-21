const HashUtil = require('../../shared/utils/HashUtil');
const LoginRequest = require('../models/LoginRequest');
const TokenEntity = require('../../../../shared/models/entities/TokenEntity');

module.exports = LoginLogic;

function LoginLogic(userRepository, tokenRepository){
    this.userRepository = userRepository;
    this.tokenRepository = tokenRepository;
}

LoginLogic.prototype.verifyAccount =  function verifyAccount(request) {

    const loginRequest = new LoginRequest(request);
    const hashPassword = HashUtil.hash(loginRequest.password);

    const query = { 'email' : loginRequest.email};

    return new Promise((resolve, reject) => {
        this.userRepository.getByQuery('user', query)
            .then(entity => {
                if (hashPassword === entity.password)
                    return entity;
                else
                    reject(new Error(' Wrong email or password'));
            })
            .then(entity => {
                return new Promise((resolve, reject) => {
                    entity.isLogin = true;
                    this.userRepository.update(entity)
                        .then(userEntity => resolve(userEntity),
                                err => reject(err));
                });
            })
            .then(entity => {
                const tokenEntity = new TokenEntity(HashUtil.createRandomString(40), entity.email);
                return new Promise((resolve, reject) => {
                    this.tokenRepository.add(tokenEntity).then(tokenEntity => {
                        resolve({
                           tokenEntity: tokenEntity,
                           userInfo: entity
                       });
                    }, err => reject(err));
                });
            })
            .then(result => {
                const response = {
                    token: result.tokenEntity.id,
                    email: result.tokenEntity.email,
                    name: result.userInfo.username,
                    phone: result.userInfo.phone,
                    address: result.userInfo.address
                };

                resolve(response);
            }, err => reject(err));
    });
};




