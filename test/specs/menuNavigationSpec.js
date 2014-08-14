describe('app', function() {

	it('should navigate to home page from menu home link', function() {
		driver.get("/",{id:'viewEntries'});
		$('#appMenu').click();
		$('#home').click();
		driver.wait({id:'viewEntries'});		
	});

	it('should navigate to search page from menu search link', function() {
		driver.get("/",{id:'viewEntries'});
		$('#appMenu').click();
		$('#search').click();
		driver.wait({id:'searchEntriesPanel'});
	});
	
});