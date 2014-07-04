var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/minutedocktest",function(err,db) {
    if(err) throw err;
    var authToken = {
        "authToken" : "dd7e10bb-7df3-4f2f-b2c5-8ed1da2d255c",
        "identifier" : "e190f5ff2fcc72ac2fa7be0ca36e10f9cf9c137f63a501b15fd346304d2f5001",
        "date" : new Date()
    };

    var user = {
        "identifier" : "e190f5ff2fcc72ac2fa7be0ca36e10f9cf9c137f63a501b15fd346304d2f5001",
        "apiKey" : "WHS5Th2Lf/TxdTKItsEhsg==",
        "accountId" : "valid_account_id",
        "recordSalt" : "e25443ea-4a6d-452f-a3a7-41fa00b55e36",
        "date" : new Date()
    };
    var clearCollection = function(collectionName) {
        var collection = db.collection(collectionName);    
        collection.remove({},function(err) {
            if(err) throw err;  
        });
    };
    var addMongoDocument = function(collectionName, newDocument) {
        var collection = db.collection(collectionName);    
        collection.insert(newDocument, function(err, records) {
            if(err) throw err;  
        });
    };    

    clearUsers = function() {
        clearCollection("users");        
    };

    persistAuthToken = function() {
        addMongoDocument("authtokens",authToken);
    };

    clearCollection("authtokens");     
    clearCollection("users");  
    addMongoDocument("authtokens",authToken);
    addMongoDocument("users",user);   
});