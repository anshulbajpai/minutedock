var request = require("request");

describe('app', function() {

	it('should navigate to home page from menu home link', function() {
		driver.get("/#/search",{id:'searchEntriesPanel'});
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
	
	it('should reload contacts and projects', function() {
		setContactsAndProjects();
		driver.get("/#/search",{id:'searchEntriesPanel'});
		$('#appMenu').click();
		$('#search').click();
		driver.wait({id:'searchEntriesPanel'});
		$('#appMenu').click();
		$('#refresh').click();
		driver.wait({id:'searchEntriesPanel'});
		selectProject('project3');
		expect($('#contact').getAttribute("value")).toEqual('contact3');
		resetContactsAndProjects();
	});

	var selectProject = function(projectName) {
		$('#project').click();
		$('#project').sendKeys(projectName);
		$('.autocomplete').element(by.cssContainingText('li',projectName)).click();
	};

	var setContactsAndProjects = function() {
		var options = {
	        "uri" : "http://localhost:9444/contactsprojects/",    
    	    "method":"POST",
    	    "json" : {}
    	};
		options.json.contacts = [{id:3,name:"contact3"}];
		options.json.projects = [{id:3,name:"project3", contact_id: 3}];
	    request(options);
	};

	var resetContactsAndProjects = function() {
		var options = {
	        "uri" : "http://localhost:9444/reset/contactsprojects/",    
    	    "method":"POST"
    	};
	    request(options);
	};
	
});