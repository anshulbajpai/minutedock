var MongoClient = require('mongodb').MongoClient;
var Q = require('q');
var config = require('../config.json');

MongoClient.connect(config["mongodb.uri"], function(err, db) {
    if(err) throw err;
    var collection = db.collection("users");

    collection.ensureIndex("identifier",{unique : true} ,function(err, indexName) {
      if(!err)
	     console.log("created index: " + indexName);
       else{
        throw err;
       }      
    });

	exports.addUser = function(identifier, apiKey, accountId) {
		var document = {identifier : identifier, apiKey : apiKey, accountId: accountId, date : new Date()};
		collection.insert(document, function(err, records) {
			if(err) throw err;	
		});		
	};  

  exports.deleteUsers = function(identifier) {
    collection.remove({identifier : identifier},function(err) {
      if(err) throw err;
    });
  };  
  
	exports.findUser= function(identifier, callback) {
    var deferred = Q.defer();
		collection.find({identifier : identifier}).nextObject(function(err, doc) {            
      if(doc){
      	deferred.resolve(doc);                          	
      }
      else{
      	deferred.reject();
      }
    });
    return deferred.promise;
	};

});