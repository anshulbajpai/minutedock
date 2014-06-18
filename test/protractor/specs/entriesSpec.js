describe('app', function() {
	
	beforeAll(function() {
		persistUser();		
	});
	
	it('should show all entries for current month', function() {
		driver.get("/",{id:'viewEntries'});
		var entries = $$('.entry');
		expect(entries.count()).toBe(3);
		var entryData = entries.map(function(entry) {
			return { 
				date : entry.$(".date").getText(),
				contact : entry.$(".contact").getText(),
				project : entry.$(".project").getText(),
				duration : entry.$(".duration").getText()
			};
		});
		var today = formatDate(new Date());
		expect(entryData).toEqual([
			{date:today,contact:"contact1",project:"project1",duration : "8"},
			{date:today,contact:"contact1",project:"project1",duration : "8"},
			{date:today,contact:"contact2",project:"project2",duration : "8"},
		]);
	});

  	var formatDate = function(date) {
        var actualMonth = date.getMonth() + 1;
		return date.getDate() + "/" + actualMonth + "/" + date.getFullYear();
  	};

	
});