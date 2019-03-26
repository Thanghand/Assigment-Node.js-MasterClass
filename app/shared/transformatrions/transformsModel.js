const MenuEntity = require('../models/entities/menuEntity');


function TransformsModel(){}

TransformsModel.prototype.transferRequestToMenuEntity = function(request) {

    const menuEntity = new MenuEntity();
    menuEntity.name = request.name;
    menuEntity.description = request.description;
    menuEntity.prices = request.prices;
    menuEntity.image = request.image;
    return menuEntity;
};

const transformsModel = new TransformsModel();
module.exports = transformsModel;