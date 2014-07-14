describe('app', function() {

	it('should register a user', function() {
		driver.get("/",{id:'viewEntries'});
		$('#appMenu').click();
		$('#logout').click();
		driver.getCurrentUrl().then(function(url) {
			expect(url).toBe('http://minutedock.local.com:9443/login');
			clearUsers();
			persistAuthToken();
			driver.get("/",{id:'apiKey'});		
			resetSessionCookie();
			$('#apiKey').sendKeys("valid_api_key");
			$('#register').click();
			driver.wait({id:'viewEntries'});								
		});
	});
	
});