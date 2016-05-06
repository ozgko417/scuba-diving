angular.module('scuba-diving').controller("ActivitiesListCtrl", ['$scope', '$meteor', 
	function($scope, $meteor) 
	{

		$scope.page = 1;
		$scope.perPage = 3;
		$scope.sort = { date: 1};
		$scope.orderProperty = '1';

		$scope.levels = $meteor.collection(function(){
			return Levels.find({});
		});

		$scope.activities = $meteor.collection(function() {
			return Activities.find({}, {
				sort: $scope.getReactively('sort')
			});
		});

		$meteor.autorun($scope, function(){
			$meteor.subscribe('AllActivities', {
				limit: parseInt($scope.getReactively('perPage')),
				skip: parseInt(($scope.getReactively('page') -1) * $scope.getReactively('perPage')),
				sort: $scope.getReactively('sort')
			}, $scope.getReactively('search')).then(function(){
				$scope.activitiesCounts = $meteor.object(Counts, 'numberOfActivities', false);
			});

			$meteor.subscribe("AllLevels");
		});

		$scope.pageChanged = function(newPage) {
			$scope.page = newPage;
		};

		$scope.$watch('orderProperty', function() {
			if ($scope.orderProperty)
				$scope.sort = { date: parseInt($scope.orderProperty)};
		});

		$scope.remove = function(activity)
		{
			$scope.activities.remove(activity);
		};

		$scope.removeAll = function()
		{
			$scope.activities.remove();
		};

		$scope.isUserInRole = function(roles)
		{
			if(Roles.userIsInRole(Meteor.userId(), roles))
				return true;
		};

		$scope.findlevel = function(levelvalue)
		{
			return Levels.findOne({value : levelvalue});
		}
	}]);