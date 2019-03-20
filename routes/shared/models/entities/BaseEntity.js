module.exports = BaseEntity;

const ObjectId = () => {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};

function BaseEntity(schema, id){
    this.schema= schema;
    this.id = id ? id : ObjectId();
    this.createdAt = new Date();
    this.updatedAt = "";
}

