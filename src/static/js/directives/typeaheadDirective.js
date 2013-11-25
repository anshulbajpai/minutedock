define(['modules/app'], function(app){	
	app.directive('typeahead', function () {
		return {
			restrict: 'E',
			transclude: true,
			replace: true,
			templateUrl : 'views/partials/typeahead.html',
			scope:{
				items:'=',
				onSearch:'&',
				term:"=",
				onSelect:"&",
				minLength:"=",
				placeholder:"@",
				selectedText:"&"
			},
			controller: ["$scope", function($scope){
				$scope.hide = false;				
				$scope.replaceText = '';

				this.activate = function(item) {
					$scope.active = item;					
				};

				this.activateNextItem = function() {
					var index = $scope.items.indexOf($scope.active);					
					this.activate($scope.items[(index + 1) % $scope.items.length]);										
				};

				this.activatePreviousItem = function() {
					var index = $scope.items.indexOf($scope.active);
					this.activate($scope.items[index == 0 ? $scope.items.length - 1 : index - 1]);
				};

				this.isActive = function(item) {
					return !$scope.active == false && $scope.active.id === item.id;
				};

				this.selectActive = function() {
					this.select($scope.active);
				};

				this.select = function(item) {
					$scope.hide = true;
					$scope.focused = true;
					$scope.onSelect({item:item});
					$scope.replaceText = $scope.selectedText({item:item});
				};

				$scope.isVisible = function() {
					return !$scope.hide && ($scope.focused || $scope.mousedOver);
				};

				$scope.query = function(){
					if($scope.term.length > $scope.minLength){
						$scope.hide = false;
						$scope.onSearch({query: $scope.term});
					}
				};


			}],
			link: function(scope, elem, attrs, controller){
				var $input = $(elem).find('input.form-control');
				var $list = $(elem).find('div.typeahead-dropdown');

				$input.attr("placeholder", scope.placeholder);

				$input.bind('focus', function() {
					scope.$apply(function() { scope.focused = true; });
				});

				$input.bind('blur', function() {
					scope.$apply(function() { scope.focused = false; });
				});

				$list.bind('mouseover', function() {
					scope.$apply(function() { scope.mousedOver = true; });
				});

				$list.bind('mouseleave', function() {
					scope.$apply(function() { scope.mousedOver = false; });
				});

				$input.bind('keyup', function(e) {
					if (e.keyCode === 9 || e.keyCode === 13) {
						scope.$apply(function() { controller.selectActive(); });
					}

					if (e.keyCode === 27) {
						scope.$apply(function() { scope.hide = true; });
					}
				});

				$input.bind('keydown', function(e) {
					if (e.keyCode === 9 || e.keyCode === 13 || e.keyCode === 27) {
						e.preventDefault();
					};

					if (e.keyCode === 40) {
						e.preventDefault();
						scope.$apply(function() { controller.activateNextItem(); });
					}

					if (e.keyCode === 38) {
						e.preventDefault();
						scope.$apply(function() { controller.activatePreviousItem(); });
					}
				});

				scope.$watch('items', function(items) {
					controller.activate(items.length ? items[0] : null);
				});

				scope.$watch('isVisible()', function(visible) {
					if (visible) {
						var pos = $input.position();
						var height = $input[0].offsetHeight;

						$list.css({
							top: pos.top + height,
							left: pos.left,
							display: 'block'
						});
					} else {
						$list.css('display', 'none');
					}
				});

				scope.$watch('replaceText', function(text){
					$input.val(text);
				});
			}
		}
	});
});