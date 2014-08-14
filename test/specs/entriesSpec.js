var StubHelper = require("../helpers/stubHelper");
var TestHelper = require("../helpers/testHelper");

var formatDate = TestHelper.formatDate;
var selectProject = TestHelper.selectProject;


describe('app', function() {
	beforeEach(function() {
		driver.get("/",{id:'viewEntries'});		
	});
	
	it('should show all entries for current month', function() {
		assertEntries();	
		var date = new Date();
		assertDateOnPage(date);
	    var firstDay = new Date(date.getFullYear(), date.getMonth(),1);
		var lastDay = new Date(date.getFullYear(), date.getMonth() + 1,0);
		StubHelper.assertListHistory(firstDay,lastDay);
	});

	it('previous and next month should show corresponding month entries', function() {
		var date = new Date();
	    
	    $('.previous a').click(); 		
		assertEntries();
		var previousMonthFirstDayDate = new Date(date.getFullYear(), date.getMonth() -1 , 1)
		var previousMonthLastDayDate = new Date(date.getFullYear(), date.getMonth() , 0)
		assertDateOnPage(previousMonthFirstDayDate);
		StubHelper.assertListHistory(previousMonthFirstDayDate,previousMonthLastDayDate);

		$('.next a').click(); 	
		entries = assertEntries();
		var nextMonthFirstDayDate = new Date(date.getFullYear(), date.getMonth() , 1);
		var nextMonthLastDayDate = new Date(date.getFullYear(), date.getMonth() + 1 , 0);
		assertDateOnPage(nextMonthFirstDayDate);
		StubHelper.assertListHistory(nextMonthFirstDayDate,nextMonthLastDayDate);
	});

	it('should delete an entry',function() {
		$('.entry .close').click();
		driver.wait({id:'viewEntries'});		
		assertEntries();
		StubHelper.assertDeleteHistory([1]);
		expect($('.alert-success').getText()).toContain('Entry deleted successfully!')
	});

	it('should delete multiple entries',function() {
		var entryCheckboxes = $$('.entry td .checkbox input');
		entryCheckboxes.get(0).click();
		entryCheckboxes.get(1).click();
		$('#deleteSelected').click();
		driver.wait({id:'viewEntries'});		
		assertEntries();
		StubHelper.assertDeleteHistory([1,2]);
		expect($('.alert-success').getText()).toContain('Entries deleted successfully!')
	});

	it('should delete all entries',function() {
		$('#viewEntries th .checkbox input').click();
		$('#deleteSelected').click();
		driver.wait({id:'viewEntries'});
		var entries = $$('.entry');	
		assertEntries();
		StubHelper.assertDeleteHistory([1,2,3]);
	});

	it('should add entries',function() {
		$('#addEntryPanel').click();
		selectProject('project1');
		expect($('#contact').getAttribute("value")).toEqual('contact1');
		$('#duration').sendKeys('8');
		
		var allEnabledDates = $$('.calendar-date:not(.date-disabled)');
		allEnabledDates.each(function(entry) {
			entry.click();
		});
		allEnabledDates.then(function(webElements) {
			$('#addEntriesSubmit').click();
			driver.wait({id:'viewEntries'});
			assertEntries();

			StubHelper.assertAddHistory(1, 1, 8, webElements);
			expect($('.alert-success').getText()).toContain('Entries added successfully!');
		});
	});

	it('should add entries for all weekdays',function() {
		$('#addEntryPanel').click();
		selectProject('project1');
		$('#duration').sendKeys('8');
		
		$('#selectAllWeekdays').click();
		
		var selectedDates = $$('.date-selected').then(function(webElements) {
			$('#addEntriesSubmit').click();
			driver.wait({id:'viewEntries'});
			assertEntries();
			StubHelper.assertAddHistory(1, 1, 8, webElements);
			expect($('.alert-success').getText()).toContain('Entries added successfully!');			
		});

	});

	var monthNames = [ "January", "February", "March", "April", "May", "June",
    	"July", "August", "September", "October", "November", "December" ];

	var assertEntries = function() {
		var entries = $$('.entry');
		expect(entries.count()).toBe(3);
		var entryData = createEntriesData(entries);
		var date = new Date();
		assertEntriesData(formatDate(date),entryData);		
	};

	var assertEntriesData = function(date, entryData) {
		expect(entryData).toEqual([
			{date:date,contact:"contact1",project:"project1",duration : "8"},
			{date:date,contact:"contact1",project:"project1",duration : "8"},
			{date:date,contact:"contact2",project:"project2",duration : "8"},
		]);
	};

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
});