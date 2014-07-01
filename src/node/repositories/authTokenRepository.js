var MongoClient = require('mongodb').MongoClient;
var Q = require('q');
var crypto = require('crypto');
var moment = require('moment');
require('moment-isoduration');

var config = require('konfig')();
var globalSalt = config.app["identifier.encryption.global.salt"];

MongoClient.connect(config.app["mongodb.uri"], function(err, db) {
    if(err) throw err;
    var collection = db.collection("authtokens");

    collection.ensureIndex("authToken",{unique : true} ,function(err, indexName) {
      if(!err)
         console.log("created index: " + indexName);
       else{
        throw err;
       }      
    });

    var ttlDurationinISO = config.app["authToken.ttl"];
    var ttlDuration = moment.duration.fromIsoduration(ttlDurationinISO).milliseconds();
    
    collection.ensureIndex({ "date": 1 }, { expireAfterSeconds: ttlDuration } ,function(err, indexName) {
      if(!err)
         console.log("created index: " + indexName);
       else{
        throw err;
       }      
    });

  exports.addAuthToken = function(authToken, identifier) {
    var sha256 = crypto.createHash('sha256');
    sha256.update(globalSalt + identifier);    
    var hashedIdentifier = sha256.digest('hex');
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