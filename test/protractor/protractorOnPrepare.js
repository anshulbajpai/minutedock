var ScreenShotReporter = require('protractor-screenshot-reporter');
var MongoServer = require("mongo-sync").Server
var Fiber = require('fibers');

require('jasmine-before-all');

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

var mongodb;

var clearCollection = function(collectionName) {
    mongodb.getCollection(collectionName).drop();                
};

var addMongoDocument = function(collectionName, document) {
    mongodb.getCollection(collectionName).insert(document);    
}; 

Fiber(function() {
    mongodb = new MongoServer("localhost").db("minutedocktest");    
    clearCollection("authtokens");     
    clearCollection("users");
    addMongoDocument("authtokens",authToken);
    addMongoDocument("users",user);            
}).run();

clearUsers = function() {
    Fiber(function() {
        clearCollection("users"); 
    }).run();
};

persistAuthToken = function() {
    Fiber(function() {
        addMongoDocument("authtokens",authToken);        
    }).run();
};


driver.get("/");
resetSessionCookie();