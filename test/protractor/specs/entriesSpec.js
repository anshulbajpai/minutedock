describe('app', function() {
	
	beforeAll(function() {
		persistUser();		
	});
	
	it('should show all entries for current month', function() {
		driver.get("/",{id:'viewEntries'});
		var entries = $$('.entry');
		expect(entries.count()).toBe(3);
		
		var entryData = createEntriesData(entries);
		
		var date = new Date();
		var firstDay = formatDate(new Date(date.getFullYear(), date.getMonth(), 1));
		var lastDay = formatDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
		
		assertEntriesData(firstDay,lastDay, entryData);
	});

	it('previous and next month should show corresponding month entries', function() {
		driver.get("/",{id:'viewEntries'});

	    $('.previous a').click(); 		

		var entries = $$('.entry');
		expect(entries.count()).toBe(3);
		
		var entryData = createEntriesData(entries);
		
		var date = new Date();
		var firstDay = formatDate(new Date(date.getFullYear(), date.getMonth() -1 , 1));
		var lastDay = formatDate(new Date(date.getFullYear(), date.getMonth(), 0));
		
		assertEntriesData(firstDay,lastDay, entryData);
		
		$('.next a').click(); 	

		entries = $$('.entry');
		expect(entries.count()).toBe(3);
		
		entryData = createEntriesData(entries);
		
		firstDay = formatDate(new Date(date.getFullYear(), date.getMonth() , 1));
		lastDay = formatDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
		
		assertEntriesData(firstDay,lastDay, entryData);
	});

	it('should delete an entry',function() {
		
	});

	it('should delete multiple entries',function() {

	});

	it('should delete all entries',function() {

	});

	it('should add entries for current month',function() {

	});

	it('should add entries for all weekdays',function() {

	});

	it('should add entries for any month',function() {

	});

	var assertEntriesData = function(firstDay, lastDay, entryData) {
		expect(entryData).toEqual([
			{date:firstDay,contact:"contact1",project:"project1",duration : "8"},
			{date:firstDay,contact:"contact1",project:"project1",duration : "8"},
			{date:lastDay,contact:"contact2",project:"project2",duration : "8"},
		]);
	};

	var createEntriesData = function(entries) {
		return entries.map(function(entry) {
			return { 
				date : entry.$(".date").getText(),
				contact : entry.$(".contact").getText(),
				project : entry.$(".project").getText(),
				duration : entry.$(".duration").getText()
			};
		});
	};

  	var formatDate = function(date) {
        var actualMonth = date.getMonth() + 1;
		return date.getDate() + "/" + actualMonth + "/" + date.getFullYear();
  	};	
});