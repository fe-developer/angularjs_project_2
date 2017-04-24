/**
 * VideoCtrl testing
 * 
 */
describe('VideoCtrl testing', function() {
	
	/**
	 * Testing videoController
	 */
	describe('Testing videoController', function() {
		var ctrl,
				scope,
				q,
				deferred,
				location,
				rootScope;

		var videolist = [
			{
				$$hashKey: "object:6",
				description: "Description1",
				name: "[0] Getting Started With ReactJs",
				ratings: Array(8),
				url: "videos/Getting_Started_With_React.js.mp4",
				video_bg: "img/video_bg/Getting_Started_With_React.js.mp4.png",
				video_rating: 3,
				_id: "58f4c6f3e446e82ef818372a"
			},
			{
				$$hashKey: "object:7",
				description: "Description2",
				name: "[1] Getting Started With ReactJs",
				ratings: Array(8),
				url: "videos/Getting_Started_With_React.js.mp4",
				video_bg: "img/video_bg/Getting_Started_With_React.js.mp4.png",
				video_rating: 3,
				_id: "58f4c6f3e446e82ef818372a"
			},
			{
				$$hashKey: "object:8",
				description: "Description3",
				name: "[2] Getting Started With ReactJs",
				ratings: Array(8),
				url: "videos/Getting_Started_With_React.js.mp4",
				video_bg: "img/video_bg/Getting_Started_With_React.js.mp4.png",
				video_rating: 3,
				_id: "58f4c6f3e446e82ef818372a"
			}
		];

		var user = {
	    "status": "success",
	    "sessionId": "joheAqVd1aaAnuFu5m3x10M31ftMbH25",
	    "username": "ali"
		}

		beforeEach(module('videoCtrl'));

		beforeEach(inject(function($controller, $rootScope, $location, $q) {
			scope = $rootScope.$new();
			q = $q;
			deferred = $q.defer();
			rootScope = $rootScope;
			location = $location;

			Auth = {
	      isLoggedIn: function() {}
	    };
	    spyOn(Auth, 'isLoggedIn').and.returnValue(true);

	    Watch = {
	    	videos: function() {},
	    	video: function() {}
	    };
			spyOn(Watch, 'videos').and.returnValue(deferred.promise);
			spyOn(Watch, 'video').and.returnValue(deferred.promise);

			getSession = function() {
				return user.sessionId;
			}

			showPreloader = function() {}
			hidePreloader = function() {}

			ctrl = $controller('videoController', 
							{ 
								$scope: scope, 
								Auth: Auth,
								Watch: Watch
							});
		}));

		/**
		 * should get session id
		 */
		it('should get session id', function() {
			expect(ctrl.sessionId).toBeDefined();
			expect(ctrl.sessionId).toBe(user.sessionId);
		});

	});

	describe('Testing watchController', function() {
		var ctrl,
				scope,
				q,
				deferred,
				location,
				rootScope,
				routeParams;

		var user = {
	    "status": "success",
	    "sessionId": "joheAqVd1aaAnuFu5m3x10M31ftMbH25",
	    "username": "ali"
		}

		var video = {
			description: "Description1",
			name: "[0] Getting Started With ReactJs",
			ratings: Array(8),
			url: "videos/Getting_Started_With_React.js.mp4",
			video_rating: 3,
			_id: "58f4c6f3e446e82ef818372a"
		}

		beforeEach(module('videoCtrl'));

		beforeEach(inject(function($controller, $rootScope, $location, $q) {
			scope = $rootScope.$new();
			rootScope = $rootScope;
			location = $location;
			q = $q;
			deferred = $q.defer();

			Auth = {
	      isLoggedIn: function() {}
	    };
	    spyOn(Auth, 'isLoggedIn').and.returnValue(true);

	    Watch = {
	    	videos: function() {},
	    	video: function() {}
	    };
			spyOn(Watch, 'videos').and.returnValue(deferred.promise);
			spyOn(Watch, 'video').and.returnValue(deferred.promise);

			getSession = function() {
				return user.sessionId;
			}

			ctrl = $controller('watchController', 
							{ 
								$scope: scope, 
								$routeParams: {
									id: video._id
								},
								Auth: Auth,
								Watch: Watch
							});
		}));

		it('should get video id', function() {
			expect(ctrl.videoId).toBeDefined();
			expect(ctrl.videoId).toBe(video._id);
		});

		it('should get session id', function() {
			expect(ctrl.sessionId).toBeDefined();
			expect(ctrl.sessionId).toBe(user.sessionId);
		});
	});
});