const baseController = "http://127.0.0.1:8000/"
const apiBaseController = baseController+"api/"
const login = baseController + "api-token-auth/";
const karyawans = apiBaseController + "karyawans/";
var TokenUser = "";
let isDebug = true;
let useHeader = true;
function setupRequest(service, link, $http) {
	if (isDebug) {
		console.log(service, link);
	}
	if (useHeader) {
		console.log("user header "+'Token '+TokenUser);
		// $http.defaults.headers.common.Authorization = 'Token '+TokenUser;
	}
}
module.factory('LoginService', function ($http) {
	return {
		login: function (post) {
			var path = login;
			console.log("login service ", path)
			return $http
				.post(path, post)
				.then(function (response) {
					return response.data;
				});
		},
	};
});
module.factory('KaryawansService', function ($http) {
	let log = karyawans;
	return {
        get: function () {
			var path = log;
			return $http.get(path, 
				{
					headers: {
						'Authorization': 'Token '+TokenUser,
						// 'Content-Type': 'application/json; charset=utf-8'
					}
				},
				function (response) {
				return response.data;
			});
        },
        
        insert: function (post) {
			var path = log;
			// setupRequest(log, path, $http, LoginModel);
			return $http
				.post(path, post)
				.then(function (response) {
					return response.data;
				});
		},
		find_id: function (id) {
			var path = log + '/' + id;
			// setupRequest(log, path, $http, LoginModel);
			return $http.get(path, function (response) {
				return response.data;
			});
		},
		update: function (id, post) {
			var path = log + '/' + id;
			// setupRequest(log, path, $http, LoginModel);
			return $http
				.post(path, post)
				.then(function (response) {
					return response.data;
				});
		},
		delete: function (id) {
			var path = log + '/' + id;
			// setupRequest(log, path, $http, LoginModel);
			return $http.get(path, function (response) {
				return response.data;
			});
		},
	};
});