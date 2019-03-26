const Controller = require('../../shared/controllers/controller');
const MenuRepository = require('../../shared/repository/menuRepository');
const SearchMenuLogic = require('./logics/searchMenuLogic');
const ResponseBuilder = require('../../shared/models/responseBuilder');

// Define Controller
function MenuController(path){
    Controller.call(this, path);

    this.menuRepository = MenuRepository;
    this.searchMenuLogic = new SearchMenuLogic(this.menuRepository);
}
MenuController.prototype = Object.create(Controller.prototype);

// Create controller
const menuController = new MenuController('menus');
const self = menuController;

menuController.get('/', (req, res) => {
    self.searchMenuLogic.getAll()
        .then(menuEntities => {
            ResponseBuilder.onSuccess(res)
                .setMessage('Get all menu')
                .setBody(menuEntities)
                .build();
        }, err => {
            ResponseBuilder.onError(res)
                .setMessage(`${err}`)
                .build();
        });
});

module.exports = menuController;
