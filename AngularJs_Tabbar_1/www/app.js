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
        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "app/views/home.html",
            })
            .state("formKaryawan", {
                url: "/formKaryawan",
                templateUrl: "app/views/form_karyawan.html"
            })
    }
]);

module.controller('RootController', function($scope,$state,$location) {
    console.log("config1");
    $state.transitionTo("home");

    $scope.movePage = function (param1, param2, param3, param4) {
        if (param4) {
            $location.path("/" + param1 + "/" + param2 + "/" + param3 + "/" + param4);
        } else if (param3) {
            $location.path("/" + param1 + "/" + param2 + "/" + param3);
        } else if (param2) {
            $location.path("/" + param1 + "/" + param2);
        } else if (param1) {
            $location.path("/" + param1);
        }
    };
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
module.controller('FormKaryawansController', function($scope, KaryawansService, $http, $location) {
    console.log('FormKaryawansController');
    let ctrl = this;
    ctrl.form = {}
    ctrl.submit = function () {
        ctrl.form.jenis_kelamin = "pria";
        ctrl.form.jenis_karyawan = "magang";
        ctrl.form.jabatan = "1";
        ctrl.form.divisi = "1";
        console.log(ctrl.form);
        // KaryawansService.insert(ctrl.form).then(function (response) {
        //     console.log('response', response.data.results);
        // }, (errorRequest) => {
        //     console.log('errorRequest', errorRequest);
        // });    

        var data = {
            nama: ctrl.form.nama,
            aalamat: ctrl.form.alamat,
            no_telepon: ctrl.form.no_telepon,
            no_rekening: ctrl.form.no_rekening,
            email: ctrl.form.email,
            pemilik_rekening: ctrl.form.pemilik_rekening,
            jenis_kelamin: ctrl.form.jenis_kelamin,
            jenis_karyawan: ctrl.form.jenis_karyawan,
            jabatan: ctrl.form.jabatan,
            divisi:ctrl.form.divisi
        };
    
        var config = {
            headers : {
                'Authorization': 'Token '+TokenUser,
            }
        }

        $http.post(karyawans, data, config)
        .then(function(response){
            console.log("response", response)
            $location.path("/home");
        },function(errorResponse){
            console.log("error");
        });
    }
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