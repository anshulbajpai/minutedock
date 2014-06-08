var ScreenShotReporter = require('protractor-screenshot-reporter');
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

var originalGet = driver.get
driver.get = function(url, by) {
    originalGet.call(driver, "http://minutedock.local.com:9443" + url)
    if(by){
        driver.wait(function() {
            return driver.isElementPresent(by);
        },5000);        
    }    
};

jasmine.getEnv().addReporter(new ScreenShotReporter({
    baseDirectory: './testResults/screenshots',
    pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
      return descriptions.join('-');
    },
    takeScreenShotsOnlyForFailedSpecs: true
}));

MongoClient.connect("mongodb://localhost:27017/minutedocktest", function(err, db) {
    if(err) throw err;
    
    var collection = db.collection("authtokens");
    
    collection.remove({},function(err) {
        if(err) throw err;  
    });

    var document = {
        "authToken" : "dd7e10bb-7df3-4f2f-b2c5-8ed1da2d255c",
        "identifier" : "e190f5ff2fcc72ac2fa7be0ca36e10f9cf9c137f63a501b15fd346304d2f5001",
        "date" : new Date()
    }

    collection.insert(document, function(err, records) {
        if(err) throw err;  
    });
});