angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth, $scope) {
	
	var vm = this;
	$scope.username = getSession(session_user);

	vm.doLogin = function() {
		if (vm.loginData == undefined || vm.loginData.username == undefined || vm.loginData.password == undefined) {
			
		} else {
			vm.proceccing = true;
			vm.error = '';

			Auth.login(vm.loginData.username, vm.loginData.password).then(function(responce){

				vm.loginData.username = '';
				vm.loginData.password = '';

				vm.proceccing = false;

				vm.user = responce.data;
				
				if (vm.user.status == 'success') {
					$scope.username = getSession(session_user);
					$location.path('/');
				} else {
					$location.path('/login');
				}
			});
		}
	}

	vm.logout = function() {
		Auth.logout().then(function(responce) {
			var answer = responce;
		});
		removeSession();
	}

	vm.isLoggedIn = function() {
		return Auth.isLoggedIn();
	}

	vm.gotoMainPage = function() {
		$location.path('/');
	}
})

.controller('LoginController', function($rootScope, $location, Auth, $scope) {
	$scope.description = 'Please sign in';

	if (Auth.isLoggedIn()) {
		$location.path('/');
	}
});