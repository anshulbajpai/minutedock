describe('my app', function() {
	
	driver.get("/");

    driverManager.deleteCookie("connect.sess");
    driverManager.addCookie("connect.sess", params.loginCookie,"/","minutedock.local.com",false);

	it('should open registration page', function() {
		driver.get("/",{id:'apiKey'});
		expect(driver.isElementPresent({id:'apiKey'})).toBeTruthy();		
	});

});