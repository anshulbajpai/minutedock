define(['modules/app','directives/typeaheadDirective','directives/typeaheadItemDirective'] , function (app) {
	app.controller('projectsController', ['$scope', function($scope){
		$scope.projects = [];

		$scope.search = function(query){			
			$scope.projects = $scope.model.projects
			.filter(function(item){
				return item.name.toLowerCase().indexOf(query) != -1;
			})
			.map(function(item){
				return {
					id: item.id,
					name: item.name,
					contactId: item.contactId,
					getContact: function(){
						var matchingContacts = $scope.model.contacts.filter(function(e){
							return item.contactId == e.id;
						});
						if(matchingContacts.length > 0){
							return matchingContacts[0];
						}
						else{
							return {};
						}
					}
				}
			});
		};

		$scope.select = function(project) {
			$scope.model.selectedProject = project;
			$scope.model.selectedContact = project.getContact();
		};

		$scope.hasProjects = function(){
			return $scope.projects.length > 0;
		};
	}]);
});