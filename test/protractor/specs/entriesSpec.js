describe('app', function() {
	
	beforeAll(function() {
		persistUser();		
	});
	
	it('should show all entries', function() {
		driver.get("/",{id:'viewEntries'});
		expect($$('.entry').count()).toBe(3);
	});
	
});