angular.module('videoCtrl', [])

//on videolist.html open
.controller('videoController', function($scope, $location, Auth, Watch) {

	var vs = this;
	
	if (!Auth.isLoggedIn()) {
		$location.path('/login');
	} else {
		var sessionId = getSession(session_id);
		vs.sessionId = sessionId;
		vs.showPreloader = showPreloader();

		Watch.videos(sessionId).then(function(responce){
			console.log('Videos: ');
			console.log(responce);

			if (responce) {
				var $scope = angular
            .element(document.getElementById('videolist'))
            .scope();
				setTimeout(function(){
					$scope.$apply(function () {
            $scope.videos = videoArrayHandling(responce.data);
          });
          vs.hidePreloader = hidePreloader();
				}, 1000);
			} else {
				$location.path('/login');
			}
		});
	}

	$scope.morevideos = function() {
		var $scope = angular
          .element(document.getElementById('videolist'))
          .scope();
		skip = $scope.videos.length;
		console.log(skip);

		var sessionId = getSession(session_id);
		showPreloader();
	
		Watch.videos(sessionId, skip, videos_on_page).then(function(responce){

			if (responce) {
				var v = videoArrayHandling(responce.data);
				i = 0;

				if (v.length > 0) {

					var $scope = angular
            .element(document.getElementById('videolist'))
            .scope();

					setTimeout(function(){
						$scope.$apply(function () {
	            $scope.videos = $scope.videos.concat(v);
	          });
						hidePreloader();	
					});
					
				} 
				else {
					$(window).scrollTop(window.pageYOffset - 60);
					hidePreloader();
				}
				
			} else {
				$location.path('/login');
			}
		});
	};

	$scope.watchvideo = function(videoId) {
		openVideo(videoId, $location);
	}
})

.controller('watchController', function($rootScope, $location, Auth, Watch, $scope, $routeParams){
	var w = this;
	var videoId = $routeParams['id'];
	w.videoId = videoId;
	var sessionId = getSession(session_id);
	w.sessionId = sessionId;

	if (!Auth.isLoggedIn()) {
		$location.path('/login');
	} else {
		Watch.video(sessionId, videoId).then(function(responce){

			console.log('Single video: ');
			console.log(responce);
			
			$scope.singlevideo = responce.data;
			console.log(responce.data);
		}, function(err){
			$location.path('/');
		});

		Watch.videos(sessionId, 0, 3).then(function(responce){
			$scope.videos = videoArrayHandling(responce.data);
		});
	}

	$scope.watchvideo = function(videoId) {
		openVideo(videoId, $location);
	}
})

.directive("scroll", function ($window, $location) {
  return function(scope, element, attrs) {
    angular.element($window).bind("scroll", function() {

			if (pageBottom()) {
				scope = angular
          .element(document.getElementById('videolist'))
          .scope();
				setTimeout(function(){
					if($location.path() === '/' && $('#loadMoreVideosSVG').hasClass('hidden') && scope.videos.length) {
						return scope.morevideos();
					}
				});
				
			}

    });
  };
});