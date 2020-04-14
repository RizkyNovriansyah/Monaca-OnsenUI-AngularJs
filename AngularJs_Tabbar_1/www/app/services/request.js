const baseController = "http://127.0.0.1:8000/"
const apiBaseController = baseController+"api/"
const login = baseController + "api-token-auth/";
const karyawans = apiBaseController + "karyawans/";
var TokenUser = "";
module.factory('LoginService', function ($http) {
	return {
		login: function (post) {
			var path = login;
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
					}
				},
				function (response) {
				return response.data;
			});
        },
        insert: function (post) {
			var path = karyawans;
			let config = {
				headers : {
					'Authorization': 'Token '+TokenUser,
				}
			}
			return $http.post(path, post, config).then(function(response){
				return response.data;
			});
		},
		find_id: function (id) {
			var path = log + id+'/';
			return $http.get(path, {
					headers: {
						'Authorization': 'Token '+TokenUser,
					}
				},function (response) {
				return response.data;
			});
		},
		update: function (id, post) {
			var path = log + id+'/';
			let config = {
				headers : {
					'Authorization': 'Token '+TokenUser,
				}
			}
			return $http.put(path, post, config)
				.then(function (response) {
					return response.data;
				});
		},
		delete: function (id) {
			var path = log + id+'/';
			let config = {
				headers : {
					'Authorization': 'Token '+TokenUser,
				}
			}
			return $http.delete(path, config).then(function (response) {
				return response.data;
			});
		},
	};
});