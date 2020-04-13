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

module.controller('KaryawansController', function($scope) {
    console.log('KaryawansController');
});
module.controller('LoginController', function($scope, LoginService,) {
    console.log('LoginController');
    
});