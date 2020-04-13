console.log("ha?")
var module = angular.module('myApp', ['onsen','ui.router']);

module.run(function ($location) {
    angular.element(document).ready(function () {
        
    });
});

module.config([
    "$stateProvider",
    "$urlRouterProvider",
    function (
        $stateProvider,
        $state,
        $urlRouterProvider,
        $location
    ) {
        // console.log("config", $location.path());
        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "app/views/home.html",
            })
    }
]);

module.controller('RootController', function($scope,$state) {
    console.log("config1");
    $state.transitionTo("home");
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
    ctrl.karyawans = []
    ctrl.refresh = function ($done) {
        KaryawansService.get().then(function (response) {
            console.log('response', response.data.results);
            ctrl.karyawans = response.data.results;
            $done();
        }, (errorRequest) => {
            console.log('errorRequest', errorRequest);
            ons.notification.alert(errorRequest.data.detail);
            ctrl.karyawans = [];
            $done();
        });    
    }
    
});
module.controller('LoginController', function($rootScope, LoginService) {
    console.log('LoginController');
    let ctrl = this;
    ctrl.logout = function () {
        TokenUser = ""; 
        $rootScope.tokenExist = false;
    }
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
                $rootScope.tokenExist = true;
                ons.notification.alert('Logged in');
            }
		}, (errorRequest) => {
            console.log('errorRequest', errorRequest);
            ons.notification.alert('Incorrect username or password.');
		});
    }
    
});