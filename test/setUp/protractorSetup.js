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