//ui.router
angular.module('scuba-diving').config(['$urlRouterProvider', '$stateProvider', '$locationProvider', 
	function($urlRouterProvider, $stateProvider, $locationProvider) 
	{
		$locationProvider.html5Mode(true);

		$stateProvider.state('activities',{
			url: '/activities',
			templateUrl: 'client/activities/views/activitiesList.html',
			controller: 'ActivitiesListCtrl'
		})
		.state('activityDetails',{
			url: '/activities/:activityId',
			templateUrl: 'client/activities/views/activityEdit.html',
			controller: 'ActivityEditCtrl'
		})
		.state('logbooks',{
			url: '/logbooks',
			templateUrl: 'client/logbooks/views/logbookList.html',
			controller: 'LogbookListCtrl'
		})
		.state('logbookDetails',{
			url: '/logbooks/:logbookId',
			templateUrl: 'client/logbooks/views/logbookEdit.html',
			controller: 'LogbookEditCtrl'
		})
		.state('roles',{
			url: '/roles',
			templateUrl: 'client/roles/views/roleList.html',
			controller: 'RoleListCtrl'
		})
		.state('profile',{
			url: '/profile',
			templateUrl: 'client/profile/views/profileEdit.html',
			controller: 'ProfilEditCtrl'
		})
		.state('home',{
			url: '/home',
			templateUrl: 'client/home/views/home.html',
			controller: 'HomeListCtrl'
		});

		$urlRouterProvider.otherwise("/home");
	}]);


angular.module('scuba-diving').run(function ($rootScope, $state) {
        $rootScope.$state = $state;
    });