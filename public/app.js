var App = angular.module('App', ['ngRoute', 'ui.bootstrap'])
.config(['$routeProvider', '$locationProvider', '$httpProvider',
	function($routeProvider, $locationProvider, $httpProvider) {

		$routeProvider
		.when('/login', {
			title: 'Login',
			templateUrl: 'html/login.html',
			controller: 'AuthController',
			controllerAs: 'loginvctrl',
			access: {requireLogin: false}
		})
		.otherwise({
			redirectTo: '/'
		});

		$locationProvider.html5Mode(true);
		$httpProvider.interceptors.push('TokenInterceptor');
}]);


GpsKovetoApp.run(['$window', '$location', '$rootScope', 'AuthService',
	function($window, $location, $rootScope, AuthService) {
        
}]);
