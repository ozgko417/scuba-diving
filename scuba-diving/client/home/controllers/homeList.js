angular.module('scuba-diving').controller("HomeListCtrl", ['$scope', '$meteor', 
	function($scope, $meteor) 
	{
		//$scope.activities = $meteor.collection(Activities).subscribe("AllActivities");

		$scope.page = 1;
		$scope.perPage = 4;
		$scope.sort = { date: 1};

		$scope.findlevel = function(levelvalue)
		{
			return Levels.findOne({value : levelvalue});
		}

		$scope.activities = $meteor.collection(function() {
			return Activities.find({}, {
				sort: $scope.sort
			});
		});

		$scope.logbooks = $meteor.collection(function(){
			return Logbooks.find({},{
				sort: $scope.sort
			});
		});

		$meteor.autorun($scope, function(){

			$meteor.subscribe("AllLevels");

			$meteor.subscribe('AllActivities', {
				limit: parseInt($scope.perPage),
				skip: parseInt(($scope.page -1) * $scope.perPage),
				sort: $scope.sort
			});

			$meteor.subscribe('AllLogbooks',{
				limit: parseInt($scope.perPage),
				skip: parseInt(($scope.page -1) * $scope.perPage),
				sort: $scope.sort
			});
		});
	}]);