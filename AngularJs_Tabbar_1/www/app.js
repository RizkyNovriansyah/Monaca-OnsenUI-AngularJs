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
            .state("detailKaryawan", {
                url: "/detailKaryawan/:id",
                templateUrl: "app/views/form_karyawan.html"
            })
    }
]);

module.controller('RootController', function($scope,$state,$location) {
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
module.controller('FormKaryawansController', function($stateParams, KaryawansService, $location) {
    let ctrl = this;
    ctrl.formType = 'add';
    let idKaryawan;
    if ($stateParams.id) {
        ctrl.formType = 'edit';
        getKaryawanBy($stateParams.id);
        idKaryawan = $stateParams.id;
    }

    ctrl.form = {}
    ctrl.submit = function () {
        ctrl.form.jenis_kelamin = "pria";
        ctrl.form.jenis_karyawan = "magang";
        ctrl.form.jabatan = "1";
        ctrl.form.divisi = "1";
        
        var data = {
            nama: ctrl.form.nama,
            alamat: ctrl.form.alamat,
            no_telepon: ctrl.form.no_telepon,
            no_rekening: ctrl.form.no_rekening,
            email: ctrl.form.email,
            pemilik_rekening: ctrl.form.pemilik_rekening,
            jenis_kelamin: ctrl.form.jenis_kelamin,
            jenis_karyawan: ctrl.form.jenis_karyawan,
            jabatan: ctrl.form.jabatan,
            divisi:ctrl.form.divisi
        };
    
        KaryawansService.insert(data).then(function (response) {
            console.log('response', response);
            $location.path("/home");
        }, (errorRequest) => {
            console.log('errorRequest', errorRequest);
            ons.notification.alert(errorRequest.data.detail);
        });
    }
    ctrl.delete = function () {
        KaryawansService.delete(idKaryawan)
        .then(function(response){
            console.log("response", response)
            $location.path("/home");
        },function(errorResponse){
            console.log("errorResponse", errorResponse);
            ons.notification.alert('Gagal');
        });
    }
    ctrl.save = function () {
        ctrl.form.jenis_kelamin = "pria";
        ctrl.form.jenis_karyawan = "magang";
        ctrl.form.jabatan = "1";
        ctrl.form.divisi = "1";
        
        var data = {
            nama: ctrl.form.nama,
            alamat: ctrl.form.alamat,
            no_telepon: ctrl.form.no_telepon,
            no_rekening: ctrl.form.no_rekening,
            email: ctrl.form.email,
            pemilik_rekening: ctrl.form.pemilik_rekening,
            jenis_kelamin: ctrl.form.jenis_kelamin,
            jenis_karyawan: ctrl.form.jenis_karyawan,
            jabatan: ctrl.form.jabatan,
            divisi:ctrl.form.divisi
        };
    
        KaryawansService.update(idKaryawan, data)
        .then(function(response){
            console.log("response", response)
            $location.path("/home");
        },function(errorResponse){
            console.log("errorResponse", errorResponse);
            ons.notification.alert('Gagal');
        });
    }

    function getKaryawanBy(id) {
        KaryawansService.find_id(id).then(function (response) {
            console.log('response', response);
            ctrl.form = response.data;
        }, (errorRequest) => {
            console.log('errorRequest', errorRequest);
            ons.notification.alert(errorRequest.data.detail);
        });
    }
});
module.controller('KaryawansController', function(KaryawansService) {
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

    KaryawansService.get().then(function (response) {
        ctrl.karyawans = response.data.results;
    }, (errorRequest) => {
        ons.notification.alert(errorRequest.data.detail);
        ctrl.karyawans = [];
    });    
});
module.controller('LoginController', function($rootScope, LoginService) {
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