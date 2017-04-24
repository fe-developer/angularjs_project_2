angular.module('authService', [])


.factory('Auth', function($http, $q) {
	var authFactory = {};

	authFactory.login = function(username, password) {
		var deferred = $q.defer();

		return $http.post(backend + '/user/auth', {
			username: username,
			password: password
		}).then(function(responce){
			if (responce.data.sessionId != undefined) {
				setSession(session_id, responce.data.sessionId);
				setSession(session_user, responce.data.username);
				
				deferred.resolve(responce);

				return responce;
			}
		});

		return deferred.promise;
	}

	authFactory.logout = function() {
		var deferred = $q.defer();

		var sessionId = getSession();

		if (sessionId) {
			return $http.get(backend + '/user/logout?sessionId=' + sessionId).then(function(responce){
				deferred.resolve(responce);
				return responce;
			});
		}

		return deferred.promise;
	}

	authFactory.isLoggedIn = function() {
		var sessionId = getSession(session_id);

		if (sessionId) {
			return true;
		} else {
			return false;
		}
	}

	return authFactory;
});