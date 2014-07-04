require('./mongoSetup');
require('./jasmineSetup');
require('./protractorSetup');

driver.get("/");
resetSessionCookie();
