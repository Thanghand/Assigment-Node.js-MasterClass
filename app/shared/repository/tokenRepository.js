const BaseRepository = require('./baseRepository');

function TokenRepository(){
    BaseRepository.call(this);
}
TokenRepository.prototype = Object.create(BaseRepository.prototype);

const tokenRepository = new TokenRepository();
module.exports = tokenRepository;
