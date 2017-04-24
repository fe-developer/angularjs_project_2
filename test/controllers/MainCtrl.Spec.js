/**
 * MainCtrl testing
 * 
 */
describe('MainCtrl testing', function() {
	
	/**
	 * Testing LoginController
	 * 
	 */
	describe('Testing LoginController', function() {

		var ctrl,
				scope,
				location,
				rootScope;

		beforeEach(module('mainCtrl'));

		beforeEach(inject(function($controller, $rootScope, $location) {
			scope = $rootScope.$new();
			rootScope = $rootScope;
			location = $location;
			Auth = {
	      isLoggedIn: function() {}
	    };
			
			spyOn(Auth, 'isLoggedIn').and.returnValue(true);
			ctrl = $controller('LoginController', { $scope: scope, Auth: Auth });

		}));

		/**
		 * Scope.description testing
		 */
		it('Should initialize description in the scope', function(){
			expect(scope.description).toBeDefined();
			expect(scope.description).toBe('Please sign in');
		});
		
		/**
		 * Should open / page if Auth.isLoggedIn == true
		 */
		it('should open URL: /login', function() {
			rootScope.$apply();
      expect(location.path()).toBe('/');
		});

	});

	/**
	 * Testing mainController
	 * 
	 */
	describe('Testing mainController', function() {
		var vm,
				deferred,
				q,
				scope,
				location,
				rootScope,
				response;

		var user = {
	    "status": "success",
	    "sessionId": "joheAqVd1aaAnuFu5m3x10M31ftMbH25",
	    "username": "ali"
		}

		beforeEach(module('mainCtrl'));

		beforeEach(inject(function($controller, $rootScope, $location, $q) {
			scope = $rootScope.$new();
			q = $q;
			deferred = $q.defer();
			rootScope = $rootScope;
			location = $location;

			Auth = {
	      login: function() {},
	      logout: function() {},
	      isLoggedIn: function() {}
	    };

	    getSession = function() {
				return user.username;
			}
			
			vm = $controller('mainController', 
						{ $scope: scope, Auth: Auth },
						{
							loginData: {
								username: 'ali',
								password: 'password'
							}
						});

			Auth.login = function(){};
			spyOn(Auth, 'login').and.returnValue(deferred.promise);

			Auth.logout = function(){};
			spyOn(Auth, 'logout').and.returnValue(deferred.promise);
		}));
		
		/**
		 * Scope.username testing
		 */
		it('Should initialize username in the scope', function() {
			expect(scope.username).toBeDefined();
			expect(scope.username).toBe('ali');
		});
		
		/**
		 * doLogin function testing
		 *
		 */
		describe('doLogin function testing', function() {
			
			/**
			 * Clean the sign in form fields
			 */
			it('should clean the sign in form after log in', function() {
				vm.doLogin();
				deferred.resolve({ data: user });
				rootScope.$apply();
				expect(vm.loginData.username).toEqual('');
				expect(vm.loginData.password).toEqual('');
			});
			
			/**
			 * Login testing
			 */
			it('login: should get user object', function() {
				vm.doLogin();
				deferred.resolve({ data: user });
				rootScope.$apply();
				expect(vm.user).toBeDefined();
				expect(vm.user).toEqual(user);
			});
			
			/**
			 * Location path testing LOGIN SUCCESS
			 */
			it('if login success should go to URL /', function() {
				vm.doLogin();
				deferred.resolve({data: user});
				rootScope.$apply();
				expect(location.path()).toBe('/');
			});

			/**
			 * Location path testing LOGIN FAILED
			 */
			it('if login failed should go to /login', function() {
				vm.doLogin();
				deferred.resolve({data: { status: undefined }});
				rootScope.$apply();
				expect(location.path()).toBe('/login');
			});

		});

	});

});