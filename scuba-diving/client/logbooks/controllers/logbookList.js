angular.module('scuba-diving').controller("LogbookListCtrl", ['$scope', '$meteor', 
	function($scope, $meteor) 
	{
		
		$scope.page = 1;
		$scope.perPage = 2;
		$scope.sort = { date: 1};
		$scope.orderProperty = '1';

		$scope.logbooks = $meteor.collection(function() {
			return Logbooks.find({}, {
				sort: $scope.getReactively('sort')
			});
		});

		$meteor.autorun($scope, function(){
			$meteor.subscribe('AllLogbooks', {
				limit: parseInt($scope.getReactively('perPage')),
				skip: parseInt(($scope.getReactively('page') -1) * $scope.getReactively('perPage')),
				sort: $scope.getReactively('sort')
			}, $scope.getReactively('search')).then(function(){
				$scope.logbooksCounts = $meteor.object(Counts, 'numberOfLogbooks', false);
			});

			if(!Roles.userIsInRole(Meteor.userId(), ['logbook']))
			{
				console.log('No user or not have role');
				$scope.$state.go('home');
			}
		});

		$scope.pageChanged = function(newPage) {
			$scope.page = newPage;
		};

		$scope.$watch('orderProperty', function() {
			if ($scope.orderProperty)
				$scope.sort = { date: parseInt($scope.orderProperty)};
		});

		$scope.remove = function(logbook)
		{
			$scope.logbooks.remove(logbook);
		};

		$scope.removeAll = function()
		{
			$scope.logbooks.remove();
		};

		$scope.isUserInRole = function(roles)
		{
			if(Roles.userIsInRole(Meteor.userId(), roles))
				return true;
		};
	}]);