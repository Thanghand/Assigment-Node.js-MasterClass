const LocalFileDatabase = require ('../services/LocalFileDatabase');

module.exports = BaseRepository;

function BaseRepository(){
    this.add = function (entity){
        return new Promise((resolve, reject) => {
            LocalFileDatabase.create(entity.schema, entity.id, entity)
                .then(result => resolve(result),
                        err => reject(new Error(`failed: ${err}`)))
        });
    };

    this.update = (entity) => {
        return new Promise((resolve, reject) => {
            LocalFileDatabase.update(entity.schema, entity.id, entity)
                .then((result) => {
                    resolve(result);
                }, err => reject(new Error(err)));
        });
    };

    this.delete = function(id, callback) {

    };

   this.get = (entity) => {
       return new Promise((resolve, reject) => {
           LocalFileDatabase.read(entity.schema, entity.id)
               .then(result => {
                   resolve(result);
               }, err =>  reject(new Error(err)));
       });
   }

   this.getByQuery = (schema, queryString) => {
       return new Promise((resolve, reject) => {
           LocalFileDatabase.list(schema)
               .then(listFile => {
                   return listFile
               })
               .then(listFile => {
                   if (listFile.length === 0)
                       reject(new Error('Cannot find entity'));

                   const promises = [];
                   listFile.forEach( file => {
                       const id = file.split('.')[0];
                       promises.push(LocalFileDatabase.read(schema, id));
                   });

                   Promise.all(promises).then(userEntities => {
                       userEntities.forEach( data => {
                           for(const prop in queryString){
                               if (data[prop] && data[prop] === queryString[prop]){
                                   resolve(data);
                               }
                           }
                       });
                       reject(new Error('Cannot find entity'))
                   }, err => reject(new Error('Cannot find entity')));
               });
       });
   };
}


