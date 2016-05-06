angular.module('scuba-diving').controller("RoleListCtrl", ['$scope', '$meteor', 
	function($scope, $meteor) 
	{

		$scope.page = 1;
		$scope.perPage = 5;
		$scope.sort = { 'profile.name': 1};
		$scope.orderProperty = '1';

		$scope.users = $meteor.collection(function() {
			return Meteor.users.find({username : {$ne : 'admin'}}, {
				sort: $scope.getReactively('sort')
			});
		});

		
		$meteor.autorun($scope, function(){

			if(!Roles.userIsInRole(Meteor.userId(), ['role']))
			{
				console.log('No user or not have role');
				$scope.$state.go('home');
			}

			$meteor.subscribe('AllUsers', {
				limit: parseInt($scope.getReactively('perPage')),
				skip: parseInt(($scope.getReactively('page') -1) * $scope.getReactively('perPage')),
				sort: $scope.getReactively('sort')
			}, $scope.getReactively('search')).then(function(){
				$scope.usersCounts = $meteor.object(Counts, 'numberOfUsers', false);
			});
		});

		
		$scope.pageChanged = function(newPage) {
			$scope.page = newPage;
		};

		$scope.$watch('orderProperty', function() {
			if ($scope.orderProperty)
				$scope.sort = { 'profile.name': parseInt($scope.orderProperty)};
		});

		$scope.isUserInRole = function(user,roles)
		{
			if(Roles.userIsInRole(user._id, roles))
				return true;
		};

		$scope.userRoleCheck = function(user, roles)
		{
			if(Roles.userIsInRole(user._id, roles))
				return true;
		};

		$scope.changeRole = function(user)
		{
			if(Roles.userIsInRole(user._id, ['activity']))
				Roles.removeUsersFromRoles(user._id,['activity']);
			else
				Roles.addUsersToRoles(user._id,['activity']);
		};
	}]);