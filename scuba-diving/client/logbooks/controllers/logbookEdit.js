angular.module('scuba-diving').controller("LogbookEditCtrl", ['$scope', '$stateParams', '$meteor', 
	function($scope, $stateParams, $meteor) 
	{
		
		$meteor.autorun($scope, function(){
			if(!Roles.userIsInRole(Meteor.userId(), ['logbook']))
			{
				console.log('No user or not have role');
				$scope.$state.go('home');
			}
		});

		$scope.logbook = $meteor.object(Logbooks, $stateParams.logbookId, false);

		var subscriptionHandle;

		$meteor.subscribe("AllLogbooks").then(function(handle){
			subscriptionHandle = handle;
		});

		$scope.$on('$destroy', function(){
			subscriptionHandle.stop();
		});

		$scope.save = function()
		{
			$scope.logbook.save().then(function(numberOfDocs)
			{
				console.log('Success', numberOfDocs);
			}, function(error){
				console.log('error', error);
			});
		};

		$scope.reset = function()
		{
			$scope.logbook.reset();
		};
	}]);