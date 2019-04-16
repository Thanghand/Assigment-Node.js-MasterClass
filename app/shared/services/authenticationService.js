const TokenRepository = require('../repository/tokenRepository');


function AuthenticationService() {}

AuthenticationService.prototype.verifyToken = function(tokenId){
    return new Promise((resolve, reject) => {
        TokenRepository.get('token', tokenId)
            .then(tokenEntity => {
                resolve(tokenEntity)
            }, err => reject(err));
    });
};

const service = new AuthenticationService();
module.exports = service;