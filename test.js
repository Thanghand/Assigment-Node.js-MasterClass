var obj = {
    a: undefined,
    b: 'thang',
    c: false
};
var objb = {
    b: 't',
    c: false
}
// a, b, c all found
for ( var prop in obj ) {
    console.log( "Object1: " + obj[prop] );
}

var matchingKeys = obj.filter(function(key){ return key.indexOf(b) !== -1 });

console.log( "Object1: " + matchingKeys);
