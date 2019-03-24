const UserEntity = require('../../../../shared/models/entities/userEntity');

const UserTransformsModel = {};

UserTransformsModel.transformBodyToUserEntity = function transformBodyToEntity(body){
    const entity = new UserEntity();
    entity.username = body.username;
    entity.password = body.password;
    entity.email = body.email;
    entity.phone = body.phone ? body.phone : '';
    entity.address.street = body.address.street ? body.address.street : '';
    entity.address.city = body.address.city ? body.address.city : '';
    entity.address.zipCode = body.address.zipCode ? body.address.zipCode : '';
    return entity;
};

module.exports = UserTransformsModel;
