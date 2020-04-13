console.log("ha?")
var module = angular.module('myApp', ['onsen']);

module.controller('RootController', function($scope) {
});
module.controller('PageController', function($scope) {
    $scope.alert = function(message) {
    ons.notification.alert(message);
    };
});

module.controller('TabbarController', function($scope) {
    $scope.title = 'Karyawans';
    $scope.updateTitle = function($event) {
        $scope.title = angular.element($event.tabItem).attr('label');
    };
});

module.controller('KaryawansController', function($scope, KaryawansService) {
    console.log('KaryawansController');
    let ctrl = this;
    
    ctrl.refresh = function () {
        KaryawansService.get().then(function (response) {
            console.log('response', response);
    
        }, (errorRequest) => {
            console.log('errorRequest', errorRequest);
            ons.notification.alert('error');
        });    
    }
    
});
module.controller('LoginController', function($rootScope, LoginService) {
    console.log('LoginController');
    let ctrl = this;
    this.token = $rootScope.token ? $rootScope : false;

    ctrl.login = function () {
        let username = ctrl.username;
        let password = ctrl.password;

        var post = {
			username: username,
			password: password
		};
		LoginService.login(post).then(function (response) {
            console.log('response', response);
            if (response.token) {
                TokenUser = response.token; 
                $rootScope.token = TokenUser;
                this.token = $rootScope.token;
                ons.notification.alert('Logged in');
            }
		}, (errorRequest) => {
            console.log('errorRequest', errorRequest);
            ons.notification.alert('Incorrect username or password.');
		});
    }
    
});