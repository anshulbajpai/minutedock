var MongoClient = require('mongodb').MongoClient;
var Q = require('q');
var Hashes = require('jshashes');

var config = require('../config.json');
var SHA256 =  new Hashes.SHA256;

MongoClient.connect(config["mongodb.uri"], function(err, db) {
    if(err) throw err;
    var collection = db.collection("authtokens");

    collection.ensureIndex("authToken",{unique : true} ,function(err, indexName) {
      if(!err)
         console.log("created index: " + indexName);
       else{
        throw err;
       }      
    });

	exports.addAuthToken = function(authToken, identifier) {
    var globalSalt = config["identifier.encryption.global.salt"];
    var hashedIdentifier = SHA256.hex(globalSalt + identifier);
		var document = {authToken : authToken, identifier : hashedIdentifier, date : new Date()};
		collection.insert(document, function(err, records) {
			if(err) throw err;	
		});		
	};  

  exports.removeAuthToken = function(authToken) {
    collection.remove({authToken : authToken},function(err) {
      if(err) throw err;
    });
  };  

	exports.findIdentifier = function(authToken) {
    var deferred = Q.defer();
		collection.find({authToken : authToken}).nextObject(function(err, doc) {            
      if(doc){
        deferred.resolve(doc.identifier);                
      }
      else{
      	deferred.reject();                    
      }
    });
    return deferred.promise;
	};

});