
module.exports = BaseRepository;

function BaseRepository(){
    this.add = function (entity, callback){
        callback(true);
    };

    this.update = function(entity, callback){
        callback(true); 
    };

    this.delete = function(id, callback) {
        callback(true);
    };
}


