const MenuRepository = require('../../shared/repository/menuRepository');
const TransformsModel = require('../../shared/transformatrions/transformsModel');

const PizzaItems = [
    {
        name: 'MEAT LOVERS',
        description: 'Xúc xích Peperoni, Thịt dăm bông, Xúc xích Ý, Thịt bò viên, Thịt heo muối',
        prices: {
            small: 7,
            medium: 8,
            large: 9.5
        },
        image: 'https://dominos.vn/Data/Sites/1/Product/579/meat.png'
    },
    {
        name: 'EXTRAVAGANZA',
        description: 'Xúc xích kiểu Ý, Thịt bò viên, Xúc xích Pepperoni',
        prices: {
            small: 7,
            medium: 8,
            large: 9.5
        },
        image: 'https://dominos.vn/Data/Sites/1/Product/578/1extra.png'
    },
    {
        name: 'PRIME BEEF',
        description: 'Bò viên kiểu Ý, Thịt bò xé',
        prices: {
            small: 7,
            medium: 8,
            large: 9.5
        },
        image: 'https://dominos.vn/Data/Sites/1/Product/576/singapore.png'
    },
    {
        name: 'SINGAPORE SEAFOOD',
        description: 'Tôm, Cua, Sốt Singpore',
        prices: {
            small: 7,
            medium: 8,
            large: 9.5
        },
        image: 'https://dominos.vn/Data/Sites/1/Product/579/meat.png'
    },
    {
        name: 'ALMOND CITRUS SEAFOOD',
        description: 'Tôm, Sò điệp, Hạnh nhân',
        prices: {
            small: 7,
            medium: 8,
            large: 9.5
        },
        image: 'https://dominos.vn/Data/Sites/1/Product/575/almond.png'
    }

];

function PrepareMenuData()
{
    this.menuRepository = MenuRepository;
    this.transformsModel = TransformsModel;
}

PrepareMenuData.prototype.run = function(){
    return new Promise(((resolve, reject) => {
        const promises = [];
        PizzaItems.forEach(p => {
            console.log('Menu: ', this.transformsModel);
            const menuEntity = this.transformsModel.transferRequestToMenuEntity(p);
            promises.push(this.menuRepository.add('menu', menuEntity));
        });

        Promise.all(promises).then(menuEntities => {
            resolve(menuEntities);
            reject(new Error('Cannot find entity'))
        }, err => reject(err));
    }));
};

const prepareMenuData = new PrepareMenuData();
module.exports = prepareMenuData;




