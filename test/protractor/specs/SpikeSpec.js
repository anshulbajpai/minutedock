describe('my app', function() {

	driver.get("/");

	it('should render title correctly', function() {
    	expect(driver.getTitle()).toBe("MinuteDock");
  	});

});