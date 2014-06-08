describe('my app', function() {
	
	driver.get("/");
	resetSessionCookie();
	
	it('should open registration page', function() {
		driver.get("/",{id:'apiKey'});
		expect(driver.isElementPresent({id:'apiKey'})).toBeTruthy();		
	});

});