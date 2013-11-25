define(['modules/app','directives/typeaheadDirective','directives/typeaheadItemDirective'] , function (app) {
	app.controller('projectsController', ['$scope', function($scope){
		$scope.projects = [];

		$scope.search = function(query){			
			$scope.projects = $scope.model.projects
			.filter(function(item){
				return item.name.toLowerCase().indexOf(query) != -1;
			});
		};

		$scope.getContact = function(contactId){
			return $scope.model.contacts.firstOrDefault(function(item){
				return item.id == contactId;
			});
		};

		var getProject = function(projectId){
			return $scope.model.projects.firstOrDefault(function(item){
				return item.id == projectId;
			});	
		}

		$scope.select = function(project) {
			$scope.model.selectedProject = getProject(project.id);

			$scope.model.selectedContact = $scope.getContact(project.contactId);
		};

		$scope.hasProjects = function(){
			return $scope.projects.length > 0;
		};

		$scope.getSelectedText = function(project){
			return "@" + $scope.getContact(project.contactId).name + " #" + getProject(project.id).name;
		}

		Array.prototype.firstOrDefault = function(condition){
			var matchingElements = this.filter(condition);
			if(matchingElements.length > 0){
				return matchingElements[0];
			}
			else{
				return {};
			}
		};
	}]);
});