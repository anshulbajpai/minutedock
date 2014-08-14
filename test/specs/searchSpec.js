var request = require("request");

var formatDate = function(date) {
    var actualMonth = date.getMonth() + 1;
	return date.getDate() + "/" + actualMonth + "/" + date.getFullYear();
};	

describe('search', function() {
	
	beforeEach(function() {
		driver.get("/#/search",{id:'searchEntriesPanel'});
	});
	
	it('should search entries in a given date range', function() {
		var today = new Date();

		var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
		
		selectProject('project1');
		expect($('#contact').getAttribute("value")).toEqual('contact1');
		
		$('#fromDateCalendar').click();
		$('#fromDateCalendar .quickdate-date-input').sendKeys(formatDate(yesterday));

		$('#toDateCalendar').click();
		$('#toDateCalendar .quickdate-date-input').sendKeys(formatDate(today));
		$('#toDateCalendar').click(); // to loose focus
		
		$('#searchEntries').click();
		var entries = $$('.entry');
		expect(entries.count()).toBe(3);		
		var entryData = createEntriesData(entries);
		assertEntriesData(entryData);
		entries.then(function() {
			assertLastSearch(formatDate(yesterday),formatDate(today),'1');
		});
	});

	it('should search entries in current year', function() {
		var today = new Date();
		var firstDayOfYear = new Date(today.getFullYear(), 0, 1);
		selectProject('project1');

		$('#quickSearch').click();
		var entries = $$('.entry');
		expect(entries.count()).toBe(3);		
		var entryData = createEntriesData(entries);
		assertEntriesData(entryData);
		entries.then(function() {
			assertLastSearch(formatDate(firstDayOfYear),formatDate(today),'1');
		});
	});

    var assertEntriesData = function(entryData) {
    	var date = formatDate(new Date());
		expect(entryData).toEqual([
			{date:date,duration : "8"},
			{date:date,duration : "8"},
			{date:date,duration : "8"},
		]);
    };		

	var selectProject = function(projectName) {
		$('#project').click();
		$('#project').sendKeys(projectName);
		$('.autocomplete').element(by.cssContainingText('li',projectName)).click();
	};

	var createEntriesData = function(entries) {
		return entries.map(function(entry) {
			return { 
				date : entry.$(".date").getText(),
				duration : entry.$(".duration").getText()
			};
		});
	};

	var historyOptions = {
        "uri" : "http://localhost:9444/history/entries/list",    
        "method":"GET",
        "json" : {}
    };

	var assertLastSearch = function(from, to, projectId) {
	    request(historyOptions, function(error, obj, response) {
	    	var queryParams = response[response.length-1].query;
	    	expect(queryParams.projects).toEqual(projectId);	
	    	expect(queryParams.from).toEqual(from);	
	    	expect(queryParams.to).toEqual(to);	
	    	expect(queryParams.offset).toEqual('0');	
    	});
	};
});