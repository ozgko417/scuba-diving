angular.module('scuba-diving').controller("ProfilEditCtrl", ['$scope', '$meteor', 
	function($scope, $meteor) 
	{
		$scope.levels = $meteor.collection(function(){
			return Levels.find({});
		});

		
		$scope.userProfile = $meteor.collection(function() {
			return Meteor.users.find({_id: Meteor.userId()}, {fields: {profile: 1}});
		}, false);

		$meteor.autorun($scope, function(){
			
			$meteor.subscribe('Profile');
			$meteor.subscribe("AllLevels");

			if(!Meteor.userId())
			{
				console.log('No user or not have role');
				$scope.$state.go('home');
			}
		});

		$scope.save = function()
		{
			$scope.userProfile.save().then(function(numberOfDocs)
			{
				console.log('Success', numberOfDocs);
			}, function(error){
				console.log('error', error);
			});
		};
	}]);