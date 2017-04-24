angular.module('videoService', [])


.factory('Watch', function($http, $q) {
	var videoFactory = {};

	videoFactory.videos = function(sessionId, skip, limit) {

		var deferred = $q.defer();

		return $http.get(backend + '/videos?sessionId=' + sessionId + '&skip=' + skip + '&limit=' + limit).then(function(responce){

			deferred.resolve(responce.data);
			return responce.data;

		}, function(err){
			if (err.status == 401) {

				deferred.reject();
				return 401;
			}
		});

		return deferred.promise;
	}

	videoFactory.video = function(sessionId, videoId) {
		var deferred = $q.defer();

		return $http.get(backend + '/video?sessionId=' + sessionId + '&videoId=' + videoId).then(function(responce){

			deferred.resolve(responce.data);

			return responce.data;
		});

		return deferred.promise;
	}

	videoFactory.raiting = function() {
		
	}

	return videoFactory;
});