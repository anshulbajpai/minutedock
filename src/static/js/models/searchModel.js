define([], function() {
	var SearchModel = function(contacts, projects) {
		this._contacts = contacts;
		this._projects = projects;
		this.projectNames = projects.map(function(project) {return project.name});
	};

	SearchModel.prototype.isInvalid = function() {
		return !this.selectedProject || !this.selectedContact || !this.fromDate || !this.toDate;
	};

	SearchModel.prototype.selectProject = function(selectedProjectName) {
	  var that = this;
	  this.selectedProject = this._projects.filter(function(project) {
	    return project.name === selectedProjectName;
	  })[0];
	  
	  this.selectedContact = this._contacts.filter(function(contact) {
	    return contact.id === that.selectedProject.contactId;
	  })[0];
	};


	return SearchModel;
});