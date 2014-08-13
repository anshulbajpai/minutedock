var request = require("request");

describe('app', function() {
	
	beforeEach(function() {
		driver.get("/",{id:'viewEntries'});		
	});
	
	it('should show all entries for current month', function() {
		var entries = assertEntries();	
		var date = new Date();
		assertDateOnPage(date);
	    var firstDay = new Date(date.getFullYear(), date.getMonth(),1);
		var lastDay = new Date(date.getFullYear(), date.getMonth() + 1,0);
		assertLastList(entries, firstDay, lastDay);
	});

	it('previous and next month should show corresponding month entries', function() {
		var date = new Date();
	    
	    $('.previous a').click(); 		
		var entries = assertEntries();
		var previousMonthFirstDayDate = new Date(date.getFullYear(), date.getMonth() -1 , 1)
		var previousMonthLastDayDate = new Date(date.getFullYear(), date.getMonth() , 0)
		assertDateOnPage(previousMonthFirstDayDate);
		assertLastList(entries,previousMonthFirstDayDate,previousMonthLastDayDate);

		$('.next a').click(); 	
		entries = assertEntries();
		var nextMonthFirstDayDate = new Date(date.getFullYear(), date.getMonth() , 1);
		var nextMonthLastDayDate = new Date(date.getFullYear(), date.getMonth() + 1 , 0);
		assertDateOnPage(nextMonthFirstDayDate);
		assertLastList(entries,nextMonthFirstDayDate,nextMonthLastDayDate);
	});

	it('should delete an entry',function() {
		$('.entry .close').click();
		driver.wait({id:'viewEntries'});		
		var entries = assertEntries();
		assertLastDeletes(entries, [1]);
		expect($('.alert-success').getText()).toContain('Entry deleted successfully!')
	});

	it('should delete multiple entries',function() {
		var entryCheckboxes = $$('.entry td .checkbox input');
		entryCheckboxes.get(0).click();
		entryCheckboxes.get(1).click();
		$('#deleteSelected').click();
		driver.wait({id:'viewEntries'});		
		var entries = assertEntries();
		assertLastDeletes(entries, [1,2]);
		expect($('.alert-success').getText()).toContain('Entries deleted successfully!')
	});

	it('should delete all entries',function() {
		$('#viewEntries th .checkbox input').click();
		$('#deleteSelected').click();
		driver.wait({id:'viewEntries'});
		var entries = $$('.entry');	
		var entries = assertEntries();
		assertLastDeletes(entries, [1,2,3]);
	});

	it('should add entries',function() {
		$('#addEntryPanel').click();
		selectProject('project1');
		$('#duration').sendKeys('8');
		
		var allEnabledDates = $$('.calendar-date:not(.date-disabled)');
		allEnabledDates.each(function(entry) {
			entry.click();
		});
		allEnabledDates.then(function(webElements) {
			$('#addEntriesSubmit').click();
			driver.wait({id:'viewEntries'});
			var entries = assertEntries();

			assertLastAdds(entries, 1, 1, 8, webElements);
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
			var entries = assertEntries();
			assertLastAdds(entries, 1, 1, 8, webElements);
			expect($('.alert-success').getText()).toContain('Entries added successfully!');			
		});

	});

	var monthNames = [ "January", "February", "March", "April", "May", "June",
    	"July", "August", "September", "October", "November", "December" ];

	var selectProject = function(projectName) {
		$('#project').click();
		$('#project').sendKeys(projectName);
		$('.autocomplete').element(by.cssContainingText('li',projectName)).click();
	};

	var assertEntries = function() {
		var entries = $$('.entry');
		expect(entries.count()).toBe(3);
		var entryData = createEntriesData(entries);
		var date = new Date();
		assertEntriesData(formatDate(date),entryData);
		return entries;
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

  	var formatDate = function(date) {
        var actualMonth = date.getMonth() + 1;
		return date.getDate() + "/" + actualMonth + "/" + date.getFullYear();
  	};

	var assertLastList = function(promise, fromDate, toDate) {
		var historyOptions = {
	        "uri" : "http://localhost:9444/history/entries/list",    
	        "method":"GET",
	        "json" : {}
	    };
		promise.then(function() {
		    request(historyOptions, function(error, obj, response) {
		    	var queryParams = response[response.length-1].query;
		    	expect(queryParams.from).toEqual(formatDate(fromDate));	
		    	expect(queryParams.to).toEqual(formatDate(toDate));	
		    	expect(queryParams.offset).toEqual('0');	
    		});
		});
	};

	var assertLastDeletes = function(promise, deletedIds) {
		var historyOptions = {
	        "uri" : "http://localhost:9444/history/entries/delete",    
	        "method":"GET",
	        "json" : {}
	    };
		promise.then(function() {
		    request(historyOptions, function(error, obj, response) {
		    	expect(response.length).toEqual(deletedIds.length);
		    	for(index in response){		    	
			    	var url = response[index].url;
			    	expect(url.indexOf("/entries/"+ deletedIds[index] +".json")).toEqual(0);		    		
		    	};
    		});
		});
	};

	var assertLastAdds = function(promise, projectId, contactId, duration, selectedDateElements) {
		var historyOptions = {
	        "uri" : "http://localhost:9444/history/entries/add",    
	        "method":"GET",
	        "json" : {}
	    };

	    var assertLoggedAtDate = function(entry) {
	    	return function(text) {
	    		var dayOfMonth = text.trim().split("\n")[0];
	    		var today = new Date();
	    		var date = new Date(today.getFullYear(), today.getMonth(), dayOfMonth);
	    		expect(entry.logged_at).toEqual(formatDate(date));	    		
	    	};
	    };

		promise.then(function() {
		    request(historyOptions, function(error, obj, response) {

		    	expect(selectedDateElements.length).toEqual(response.length);
		    	for(index in response){
		    		var entry = response[index].body.entry;
		    		expect(entry.project_id).toEqual(projectId);
		    		expect(entry.contact_id).toEqual(contactId);
		    		expect(entry.duration).toEqual(duration * 60 * 60);
		    		selectedDateElements[index].getText().then(assertLoggedAtDate(entry));
		    	}
    		});
		});		
	};
	
});