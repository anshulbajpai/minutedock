var request = require("request");

var resetEntries = function() {
	var options = {
        "uri" : "http://localhost:9444/resetEntries",    
        "method":"POST"
    };
    request(options);
};

describe('app', function() {
	
	beforeEach(function() {
		driver.get("/",{id:'viewEntries'});		
	});
	
	it('should show all entries for current month', function() {
		
		var entries = $$('.entry');
		expect(entries.count()).toBe(3);
		
		var entryData = createEntriesData(entries);
		
		var date = new Date();
		var firstDay = formatDate(new Date(date.getFullYear(), date.getMonth(), 1));

		assertDateOnPage(date);	
		
		assertEntriesData(firstDay,entryData);
	});

	it('previous and next month should show corresponding month entries', function() {
		
	    $('.previous a').click(); 		

		var entries = $$('.entry');
		expect(entries.count()).toBe(3);
		
		var entryData = createEntriesData(entries);
		
		var date = new Date();
		var previousMonthFirstDayDate = new Date(date.getFullYear(), date.getMonth() -1 , 1)
		var firstDay = formatDate(previousMonthFirstDayDate);
		
		assertDateOnPage(previousMonthFirstDayDate);
		assertEntriesData(firstDay, entryData);
		
		$('.next a').click(); 	

		entries = $$('.entry');
		expect(entries.count()).toBe(3);
		
		entryData = createEntriesData(entries);
		
		var nextMonthFirstDayDate = new Date(date.getFullYear(), date.getMonth() , 1);
		firstDay = formatDate(nextMonthFirstDayDate);
		assertDateOnPage(nextMonthFirstDayDate);
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

		expect($('.alert-success').getText()).toContain('Entry deleted successfully!')

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

		expect($('.alert-success').getText()).toContain('Entries deleted successfully!')

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

	it('should add entries',function() {
		var entries = $$('.entry');
		$('#addEntryPanel').click();
		$('#contact').element(by.cssContainingText('option','contact1')).click();
		$('#project').element(by.cssContainingText('option','project1')).click();
		$('#duration').sendKeys('8');
		
		var allEnabledDates = $$('.calendar-date:not(.date-disabled)');
		allEnabledDates.each(function(entry) {
			entry.click();
		});

		entries.count().then(function(initialEntriesCount) {
			$('#addEntriesSubmit').click();
			driver.wait({id:'viewEntries'});
			var newEntries = $$('.entry');
			
			allEnabledDates.count().then(function(newEntriesCount) {				
				expect(newEntries.count()).toBe(initialEntriesCount + newEntriesCount);
			});
			newEntries.then(function() {
				resetEntries();			
			});
		});
	});

	it('should add entries for all weekdays',function() {
		var entries = $$('.entry');
		$('#addEntryPanel').click();
		$('#contact').element(by.cssContainingText('option','contact1')).click();
		$('#project').element(by.cssContainingText('option','project1')).click();
		$('#duration').sendKeys('8');
		
		$('#selectAllWeekdays').click();
		
		var selectedDates = $$('.date-selected')
		
		entries.count().then(function(initialEntriesCount) {
			selectedDates.count().then(function(newEntriesCount) {
				$('#addEntriesSubmit').click();
				driver.wait({id:'viewEntries'});
				var newEntries = $$('.entry');
				expect(newEntries.count()).toBe(initialEntriesCount + newEntriesCount);
				newEntries.then(function() {
					resetEntries();			
				});

			});
		});
	});

	var assertEntriesData = function(firstDay, entryData) {
		expect(entryData).toEqual([
			{date:firstDay,contact:"contact1",project:"project1",duration : "8"},
			{date:firstDay,contact:"contact1",project:"project1",duration : "8"},
			{date:firstDay,contact:"contact2",project:"project2",duration : "8"},
		]);
	};

	var monthNames = [ "January", "February", "March", "April", "May", "June",
    	"July", "August", "September", "October", "November", "December" ]

	var assertDateOnPage = function(date) {
		expect($('#pageDate').getText()).toBe(monthNames[date.getMonth()] + " " + date.getFullYear());
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