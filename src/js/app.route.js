angular.module('appRoute', ['ngRoute'])
.config(function($routeProvider){
  $routeProvider
	.when('/', {
		templateUrl: 'template/videolist.html'
	})
	.when('/login', {
		templateUrl: 'template/login.html',
		controller: 'LoginController'
	})
	.when('/watchvideo/:id', {
		templateUrl: 'template/watchvideo.html'
	});
});