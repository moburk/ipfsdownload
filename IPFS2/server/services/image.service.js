var Q = require('q');

service = {}

module.exports = service;

var hashes = [];

service.getimg = getimg;
service.displayimg = displayimg;

function getimg(hash) {
    var deferred = Q.defer();
    hashes.push(hash);
    console.log(hash);
    deferred.resolve(hash);
    return deferred.promise;
}

function displayimg(){
    var deferred = Q.defer();
    deferred.resolve(hashes);
    return deferred.promise;
}