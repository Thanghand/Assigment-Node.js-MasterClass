function BaseRepository(name){
    this.name = name;
    this.add = function add(entity, callback){
        callback('Ok');
    };
};


function UserRepository(name){
    BaseRepository.call(this, name);
};

var user = new UserRepository('Thang');
user.add('Thang', function(result){
    console.log('test: ', result);
});
console.log('USer: ', user);
