var TestHelper = require("../helpers/testHelper");

describe('app', function() {

	it('should register a user', function() {
		driver.get("/",{id:'viewEntries'});
		$('#appMenu').click();
		$('#logout').click();
		expect(driver.getCurrentUrl()).toBe('http://minutedock.local.com:9443/login');
		clearUsers();
		persistAuthToken();
		driver.get("/",{id:'apiKey'});		
		resetSessionCookie();
		$('#apiKey').sendKeys("valid_api_key");
		$('#register').click();
		driver.wait({id:'viewEntries'});
		$('#addEntryPanel').click();
		TestHelper.selectProject('project1');
		expect($('#contact').getAttribute("value")).toEqual('contact1');
	});	
});