 ScreenShotReporter = require('protractor-screenshot-reporter');
var MongoClient = require('mongodb').MongoClient;

driver = browser.driver;
params = browser.params;

var driverManager = driver.manage();

var deleteSessionCookie = function() {
    driverManager.deleteCookie("connect.sess");
};

var addSessionCookie = function() {
    driverManager.addCookie("connect.sess", params.loginCookie,"/","minutedock.local.com",false);
};

resetSessionCookie = function() {
    deleteSessionCookie();
    addSessionCookie();
};

var originalGet = driver.get;

var originalWait = driver.wait;

driver.wait = function(by) {
    originalWait.call(driver, function() {
        return driver.isElementPresent(by);
    },5000);
};

driver.get = function(url, by) {
    originalGet.call(driver, "http://minutedock.local.com:9443" + url)
    if(by){
        driver.wait(by);      
    }    
};

jasmine.getEnv().addReporter(new ScreenShotReporter({
    baseDirectory: './testResults/screenshots',
    pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
      return descriptions.join('-');
    },
    takeScreenShotsOnlyForFailedSpecs: true
}));

var clearCollection = function(db, collectionName) {
    var collection = db.collection(collectionName);    
    collection.remove({},function(err) {
        if(err) throw err;  
    });    
};

var mongodbUrl = "mongodb://localhost:27017/minutedocktest";

(function() {
    MongoClient.connect(mongodbUrl, function(err, db) {
        var clearCollection = function(collectionName) {
            var collection = db.collection(collectionName);    
            collection.remove({},function(err) {
                if(err) throw err;  
            });    
        };

        if(err) throw err;
        clearCollection("authtokens");     
        clearCollection("users");     
    });    
})();

var addMongoDocument = function(collectionName, newDocument) {
    MongoClient.connect(mongodbUrl, function(err, db) {
        if(err) throw err;
        var collection = db.collection(collectionName);    
        collection.insert(newDocument, function(err, records) {
            if(err) throw err;  
        });
    });
};

(function() {
    var authToken = {
        "authToken" : "dd7e10bb-7df3-4f2f-b2c5-8ed1da2d255c",
        "identifier" : "e190f5ff2fcc72ac2fa7be0ca36e10f9cf9c137f63a501b15fd346304d2f5001",
        "date" : new Date()
    };
    addMongoDocument("authtokens",authToken)
})();

persistUser = function() {
    var user = {
        "identifier" : "e190f5ff2fcc72ac2fa7be0ca36e10f9cf9c137f63a501b15fd346304d2f5001",
        "apiKey" : "WHS5Th2Lf/TxdTKItsEhsg==",
        "accountId" : "valid_account_id",
        "recordSalt" : "e25443ea-4a6d-452f-a3a7-41fa00b55e36",
        "date" : new Date()
    };
    addMongoDocument("users",user);
};
