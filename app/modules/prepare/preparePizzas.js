const MenuRepository = require('../../shared/repository/menuRepository');
const TransformsModel = require('../../shared/transformatrions/transformsModel');

const PizzaItems = [
    {
        name: '',
        description: '',
        prices: {
            small: 7,
            medium: 8,
            large: 9.5
        },
        image: ''
    }
];

function PrepareMenuData()
{
    this.menuRepository = MenuRepository;
    this.transformsModel = TransformsModel;
    this.run = function(){
        return new Promise(((resolve, reject) => {
            const promises = [];
            PizzaItems.forEach(p => {
                const menuEntity = this.transformsModel.transferRequestToMenuEntity(p);
                promises.push(this.menuRepository.add(menuEntity));
            });

            Promise.all(promises).then(menuEntities => {
                resolve(menuEntities);
                reject(new Error('Cannot find entity'))
            }, err => reject(err));
        }));
    }
}

const prepareMenuData = new PrepareMenuData();
module.exports = prepareMenuData;

