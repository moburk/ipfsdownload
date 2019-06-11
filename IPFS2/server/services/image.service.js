var Q = require('q');
var crud = require('crud-sdk');



service = {}

module.exports = service;

var hashes;

service.getimg = getimg;
service.displayimg = displayimg;
//service.download = download;

/*function getimg(hash) {
    var deferred = Q.defer();
    hashes.push(hash);
    console.log(hash);
    if(hash == undefined)
        deferred.reject('error');
    deferred.resolve(hash);
    return deferred.promise;
}*/

function getimg(hash) {
    var deferred = Q.defer();
    //var temp = {"hash":hash.hash}
    console.log(typeof(hash));
    crud.create('mongodb+srv://test:test@todo-vzl0y.mongodb.net/test?retryWrites=true&w=majority','filehashes','hashes',hash,function(err,data){
        if(err) {
            console.log(err);
            deferred.reject('error');}
    })
    console.log(hash);
    if(hash == undefined)
        deferred.reject('error');
    deferred.resolve(hash);
    return deferred.promise;
}


/*function displayimg(){
    var deferred = Q.defer();
    deferred.resolve(hashes);
    return deferred.promise;
}*/

function displayimg(){
    var deferred = Q.defer();
    crud.readByCondition('mongodb+srv://test:test@todo-vzl0y.mongodb.net/test?retryWrites=true&w=majority','filehashes','hashes',{},function(err,result){
        if(err)
            deferred.reject(err);

        console.log(result);
    })
    deferred.resolve(hashes);
    return deferred.promise;
}



