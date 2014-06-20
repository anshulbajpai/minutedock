var request = require("request");

var resetEntries = function() {
	var options = {
        "uri" : "http://localhost:9444/resetEntries",    
        "method":"POST"
    };
    request(options);
};

describe('app', function() {
	
	beforeAll(function() {
		persistUser();		
	});

	beforeEach(function() {
		driver.get("/",{id:'viewEntries'});		
	});
	
	it('should show all entries for current month', function() {
		
		var entries = $$('.entry');
		expect(entries.count()).toBe(3);
		
		var entryData = createEntriesData(entries);
		
		var date = new Date();
		var firstDay = formatDate(new Date(date.getFullYear(), date.getMonth(), 1));
		
		assertEntriesData(firstDay,entryData);
	});

	it('previous and next month should show corresponding month entries', function() {
		
	    $('.previous a').click(); 		

		var entries = $$('.entry');
		expect(entries.count()).toBe(3);
		
		var entryData = createEntriesData(entries);
		
		var date = new Date();
		var firstDay = formatDate(new Date(date.getFullYear(), date.getMonth() -1 , 1));
		
		assertEntriesData(firstDay, entryData);
		
		$('.next a').click(); 	

		entries = $$('.entry');
		expect(entries.count()).toBe(3);
		
		entryData = createEntriesData(entries);
		
		firstDay = formatDate(new Date(date.getFullYear(), date.getMonth() , 1));
		
		assertEntriesData(firstDay, entryData);
	});

	it('should delete an entry',function() {
		$('.entry .close').click();
		driver.wait({id:'viewEntries'});		
		var entries = $$('.entry');
		expect(entries.count()).toBe(2);
		var entryData = createEntriesData(entries);
		var date = new Date();
		var firstDay = formatDate(new Date(date.getFullYear(), date.getMonth(), 1));
		
		expect(entryData).toEqual([
			{date:firstDay,contact:"contact1",project:"project1",duration : "8"},
			{date:firstDay,contact:"contact2",project:"project2",duration : "8"}
		]);

		entries.then(function() {
			resetEntries();			
		});
	});

	it('should delete multiple entries',function() {
		var entryCheckboxes = $$('.entry td .checkbox input');
		entryCheckboxes.get(0).click();
		entryCheckboxes.get(1).click();
		$('#deleteSelected').click();
		driver.wait({id:'viewEntries'});		
		var entries = $$('.entry');
		expect(entries.count()).toBe(1);
		var entryData = createEntriesData(entries);
		var date = new Date();
		var firstDay = formatDate(new Date(date.getFullYear(), date.getMonth(), 1));
		
		expect(entryData).toEqual([
			{date:firstDay,contact:"contact2",project:"project2",duration : "8"}
		]);

		entries.then(function() {
			resetEntries();			
		});
	});

	it('should delete all entries',function() {
		$('#viewEntries th .checkbox input').click();
		$('#deleteSelected').click();
		driver.wait({id:'viewEntries'});
		var entries = $$('.entry');	
		expect(entries.count()).toBe(0);	
		entries.then(function() {
			resetEntries();			
		});
	});

	it('should add entries for current month',function() {

	});

	it('should add entries for all weekdays',function() {

	});

	it('should add entries for any month',function() {

	});

	var assertEntriesData = function(firstDay, entryData) {
		expect(entryData).toEqual([
			{date:firstDay,contact:"contact1",project:"project1",duration : "8"},
			{date:firstDay,contact:"contact1",project:"project1",duration : "8"},
			{date:firstDay,contact:"contact2",project:"project2",duration : "8"},
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