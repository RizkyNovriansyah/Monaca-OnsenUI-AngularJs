const baseController = "http://127.0.0.1:8000/"
const apiBaseController = baseController+"api/"
const login = baseController + "api-token-auth/";
const karyawans = apiBaseController + "karyawans";

function setupRequest(service, link, $http, LoginModel) {
	if (isDebug) {
		console.log(service, link);
	}
	if (useHeader) {
		$http.defaults.headers.common.Authorization = LoginModel.cekTokenUser();
	}
}
app.factory('LoginService', function ($http, LoginModel) {
	return {
		login: function (post) {
			var path = login;
			// logRequest('LoginService', path);
			return $http
				.post(path, post)
				.then(function (response) {
					return response.data;
				});
		},
	};
});
app.factory('KaryawansService', function ($http, LoginModel) {
	let log = karyawans;
	return {
        get: function () {
			var path = log;
			setupRequest(log, path, $http, LoginModel);
			return $http.get(path, function (response) {
				return response.data;
			});
        },
        
        insert: function (post) {
			var path = log;
			setupRequest(log, path, $http, LoginModel);
			return $http
				.post(path, post)
				.then(function (response) {
					return response.data;
				});
		},
		find_id: function (id) {
			var path = log + '/' + id;
			setupRequest(log, path, $http, LoginModel);
			return $http.get(path, function (response) {
				return response.data;
			});
		},
		update: function (id, post) {
			var path = log + '/' + id;
			setupRequest(log, path, $http, LoginModel);
			return $http
				.post(path, post)
				.then(function (response) {
					return response.data;
				});
		},
		delete: function (id) {
			var path = log + '/' + id;
			setupRequest(log, path, $http, LoginModel);
			return $http.get(path, function (response) {
				return response.data;
			});
		},
	};
});