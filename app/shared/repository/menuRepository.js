const BaseRepository = require('./baseRepository');


function MenuRepository() {
    BaseRepository.call(this);
}

const menuRepository = new MenuRepository();
module.exports = menuRepository;
