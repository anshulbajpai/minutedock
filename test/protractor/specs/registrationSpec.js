describe('app', function() {

	beforeAll(function() {
		clearUsers();	
	});

	it('should register a user', function() {
		driver.get("/",{id:'apiKey'});
		$('#apiKey').sendKeys("valid_api_key");
		$('#register').click();
		driver.wait({id:'viewEntries'});		
	});
	
});