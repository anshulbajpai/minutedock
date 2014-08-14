var request = require("request");
var TestHelper = require("./testHelper");
var formatDate = TestHelper.formatDate;

var flow = protractor.promise.controlFlow();

var createRequestPromise = function(options) {
    return function() {
        var defer = protractor.promise.defer();
        request(options, function(error, obj, response) {
        	if(error){
        		defer.reject(error);
        	} else {
    	    	defer.fulfill(response);
        	}
    	});
    	return defer.promise;        
    };
};

module.exports.assertListHistory = function(fromDate, toDate, projectId) {
    var options = {
        "uri" : "http://localhost:9444/history/entries/list",    
        "method":"GET",
        "json" : {}
    };

	flow.execute(createRequestPromise(options)).then(function(response) {
    	var queryParams = response[response.length-1].query;
        if(projectId){
            expect(queryParams.projects).toEqual(projectId);    
        }
    	expect(queryParams.from).toEqual(formatDate(fromDate));	
    	expect(queryParams.to).toEqual(formatDate(toDate));	
    	expect(queryParams.offset).toEqual('0');    		
	});
};

module.exports.assertDeleteHistory = function(deletedIds) {
    var options = {
        "uri" : "http://localhost:9444/history/entries/delete",    
        "method":"GET",
        "json" : {}
    };

	flow.execute(createRequestPromise(options)).then(function(response) {
    	expect(response.length).toEqual(deletedIds.length);
    	for(index in response){		    	
	    	var path = response[index].path;
	    	expect(path).toEqual("/entries/"+ deletedIds[index] +".json");		    		
    	};
	});
};

module.exports.assertAddHistory = function(projectId, contactId, duration, selectedDateElements) {
    var assertLoggedAtDate = function(entry) {
    	return function(text) {
    		var dayOfMonth = text.trim().split("\n")[0];
    		var today = new Date();
    		var date = new Date(today.getFullYear(), today.getMonth(), dayOfMonth);
    		expect(entry.logged_at).toEqual(formatDate(date));	    		
    	};
    };

    var options = {
        "uri" : "http://localhost:9444/history/entries/add",    
        "method":"GET",
        "json" : {}
    };

	flow.execute(createRequestPromise(options)).then(function(response) {
		expect(selectedDateElements.length).toEqual(response.length);
		for(index in response){
			var entry = response[index].body.entry;
			expect(entry.project_id).toEqual(projectId);
			expect(entry.contact_id).toEqual(contactId);
			expect(entry.duration).toEqual(duration * 60 * 60);
			selectedDateElements[index].getText().then(assertLoggedAtDate(entry));
		}			
	});
};

module.exports.setContactsAndProjects = function(contacts, projects) {
    var options = {
        "uri" : "http://localhost:9444/contactsprojects/",    
        "method":"POST",
        "json" : {}
    };
    options.json.contacts = contacts;
    options.json.projects = projects;
    flow.execute(createRequestPromise(options)).then(function() {});
};

module.exports.resetContactsAndProjects = function() {
    var options = {
        "uri" : "http://localhost:9444/reset/contactsprojects/",    
        "method":"POST"
    };
    flow.execute(createRequestPromise(options)).then(function() {});
};
