const LocalFileDatabase = require ('../services/localFileDatabase');

module.exports = BaseRepository;

function BaseRepository(){
    this.add = function (schema, entity){
        return new Promise((resolve, reject) => {
            LocalFileDatabase.create(schema, entity.id, entity)
                .then(result => resolve(result),
                        err => reject(new Error(`failed: ${err}`)))
        });
    };

    this.update = (schema, entity) => {
        return new Promise((resolve, reject) => {
            LocalFileDatabase.update(schema, entity.id, entity)
                .then((result) => {
                    resolve(result);
                }, err => reject(new Error(err)));
        });
    };

    this.delete = function(schema, id) {
        return new Promise((resolve, reject) => {
            LocalFileDatabase.delete(schema, id)
                .then(result => resolve(result), err => reject(err));
        });
    };

   this.get = (schema, id) => {
       return new Promise((resolve, reject) => {
           LocalFileDatabase.read(schema, id)
               .then(result => {
                   resolve(result);
               }, err =>  reject(new Error(err)));
       });
   };

   this.getByQuery = (schema, queryString) => {
       return new Promise((resolve, reject) => {
           LocalFileDatabase.list(schema)
               .then(listFile => listFile)
               .then(listFile => {
                   if (listFile.length === 0)
                       reject(new Error('Cannot find entity'));

                   const promises = [];
                   listFile.forEach( file => {
                       const id = file.split('.')[0];
                       promises.push(LocalFileDatabase.read(schema, id));
                   });

                   Promise.all(promises).then(entities => {
                       const datas = [];
                       entities.forEach( data => {
                           for(const prop in queryString){
                               if (data[prop] && data[prop] === queryString[prop]){
                                   datas.push(data);
                               }
                           }
                       });
                       if (datas.length === 0)
                           reject(new Error('Cannot find entity'));

                       resolve(datas);

                   }, err => reject(new Error('Cannot find entity')));
               });
       });
   };

   this.getAll = (schema) => {
       return new Promise(((resolve, reject) => {
           LocalFileDatabase.list(schema)
               .then(listFile => listFile, err => reject(err))
               .then(listFile => {

                   if (listFile.length === 0)
                       reject(new Error('Cannot find entity'));

                   const promises = [];
                   listFile.forEach( file => {
                       const id = file.split('.')[0];
                       promises.push(LocalFileDatabase.read(schema, id));
                   });
                   Promise.all(promises).then (entities => {
                       resolve(entities);
                   });
               });
       }));
   }
}


