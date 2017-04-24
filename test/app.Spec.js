describe('Testing Routes', function () {

	// load the module
	beforeEach(function() {
		module('appRoute');

		inject(function ($injector) {
			$route = $injector.get('$route');
			$location = $injector.get('$location');
			$rootScope = $injector.get('$rootScope');
		});
	});
	
	it('Should open template/login.html', function() {

		expect($route.current).toBeUndefined();
    $location.path('/login');
    $rootScope.$digest();
    expect($route.current.templateUrl).toEqual('template/login.html');

	});

	it('Should open template/videolist.html', function() {

		expect($route.current).toBeUndefined();
    $location.path('/');
    $rootScope.$digest();
    expect($route.current.templateUrl).toEqual('template/videolist.html');

	});

	it('Should open template/watchvideo.html', function() {

		expect($route.current).toBeUndefined();
    $location.path('/watchvideo/1');
    $rootScope.$digest();
    expect($route.current.templateUrl).toEqual('template/watchvideo.html');

	});
});