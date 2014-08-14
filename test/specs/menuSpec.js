var StubHelper = require("../helpers/stubHelper");
var TestHelper = require("../helpers/testHelper");

var clickMenuItem = TestHelper.clickMenuItem;

describe('app', function() {

	it('should navigate to home page from menu home link', function() {
		driver.get("/#/search",{id:'searchEntriesPanel'});
		clickMenuItem('home');
		driver.wait({id:'viewEntries'});		
	});

	it('should navigate to search page from menu search link', function() {
		driver.get("/",{id:'viewEntries'});
		clickMenuItem('search');
		driver.wait({id:'searchEntriesPanel'});
	});

	it('should reload contacts and projects', function() {
		driver.get("/#/search",{id:'searchEntriesPanel'});
		clickMenuItem('search');
		driver.wait({id:'searchEntriesPanel'});

		var contacts = [{id:3,name:"contact3"}];
	    var projects = [{id:3,name:"project3", contact_id: 3}];
		StubHelper.setContactsAndProjects(contacts, projects);
		
		clickMenuItem('refresh');
		driver.wait({id:'searchEntriesPanel'});
		TestHelper.selectProject('project3');
		expect($('#contact').getAttribute("value")).toEqual('contact3');
		
		StubHelper.resetContactsAndProjects();
	});	
});