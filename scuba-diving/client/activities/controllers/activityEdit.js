angular.module('scuba-diving').controller("ActivityEditCtrl", ['$scope', '$stateParams', '$meteor', 
	function($scope, $stateParams, $meteor) 
	{
		$scope.activity = $meteor.object(Activities, $stateParams.activityId, false);

		$scope.levels = $meteor.collection(function(){
			return Levels.find({});
		});

		$meteor.subscribe("AllLevels")

		var subscriptionHandle;

		$meteor.subscribe("AllActivities").then(function(handle){
			subscriptionHandle = handle;
		});

		$scope.$on('$destroy', function(){
			subscriptionHandle.stop();
		});
		
		$scope.save = function()
		{
			$scope.activity.save().then(function(numberOfDocs)
			{
				console.log('Success', numberOfDocs);
			}, function(error){
				console.log('error', error);
			});
		};

		$scope.reset = function()
		{
			$scope.activity.reset();
		};

		$scope.isUserInRole = function(roles)
		{
			if(Roles.userIsInRole(Meteor.userId(), roles))
				return true;
		};

		$scope.isUserOwner = function(activity)
		{
			if(activity.owner === Meteor.userId())
				return true;
		};

		$scope.findlevel = function(levelvalue)
		{
			return Levels.findOne({value : levelvalue});
		};
	}]);