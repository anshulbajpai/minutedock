describe('my app', function() {
	
	driver.get("/");
	resetSessionCookie();
	
	it('should register a user', function() {
		driver.get("/",{id:'apiKey'});
		driver.findElement({id:'apiKey'}).sendKeys("valid_api_key");
		driver.findElement({id:'register'}).click();
		driver.wait({id:'viewEntries'});		
	});
	
});