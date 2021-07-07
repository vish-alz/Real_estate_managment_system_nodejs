var myApp = angular.module("myModule", ["ngRoute"])
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider
			.when("/addCat",
				{
					templateUrl: "addCategory.html",
					controller: "addCategoryCTRL"
				})
			.when("/viewCat",
				{
					templateUrl: "viewCategory.html",
					controller: "viewCategoryCTRL"
				})
			.when("/editCat",
				{
					templateUrl: "editCategory.html",
					controller: "editCategoryCTRL"
				})
			.when("/deleteCat",
				{
					templateUrl: "viewCategory.html",
					controller: "deleteCategoryCTRL"
				})
			.when("/viewProperty",
				{
					templateUrl: "viewProperty.html",
					controller: "viewPropertyCTRL"
				})
			.when("/deleteProperty",
				{
					templateUrl: "viewProperty.html",
					controller: "deletePropertyCTRL"
				})
			.when("/viewAgent",
				{
					templateUrl: "viewAgent.html",
					controller: "viewAgentCTRL"
				})
			.when("/deleteAgent",
				{
					templateUrl: "viewAgent.html",
					controller: "deleteAgentCTRL"
				})
			
			.when("/logout",
				{
					templateUrl: "homescreen.html",
					controller: "logoutCTRL"
				})

			.otherwise({
				templateUrl: "homescreen.html"
			});


	})
	.controller("addCategoryCTRL", function ($scope, $http) {
		$scope.category = {};
		console.log($scope.category);
		$scope.Submit = function () {
			var uploadUrl = '/upload';
			var data = $scope.category;
			var fd = new FormData();
			for (var key in data)
				fd.append(key, data[key]);

			var successCallBack = function (response) {
				alert(response.data.result);
				$scope.category = "";
			};
			var errorCallBack = function (reason) {
				$scope.login = reason.data;
			};
			$http.post(uploadUrl, fd, {
				transformRequest: angular.indentity,
				headers: { 'Content-Type': undefined }
			})
				.then(successCallBack, errorCallBack);
		}
	})

	.controller("viewCategoryCTRL", function ($scope, $http, $log) {
		var successCallBack = function (response) {
			$scope.categories = response.data;

		};

		var errorCallBack = function (reason) {
			$scope.error = reason.data;
		};


		$http({
			method: 'GET',
			url: 'http://localhost:3000/category'
		})
			.then(successCallBack, errorCallBack);
	})

	.controller("deleteCategoryCTRL", function ($scope, $http, $log, $routeParams, $location) {
		var id = $routeParams.id;
		var successCallBack = function (response) {
			console.log(response.data.message);
			if (response.data.message == "Task successfully deleted") {
				$location.url("/viewCat");
			}
		};

		var errorCallBack = function (reason) {
			$scope.error = reason.data;
		};
		var idData = { "id": id };

		$http({
			method: 'POST',
			url: 'http://localhost:3000/delCategory',
			data: idData
		})
			.then(successCallBack, errorCallBack);



	})

	.controller("editCategoryCTRL", function ($scope, $http, $log, $routeParams, $location) {
		var id = $routeParams.id;
		var successCallBack = function (response) {
			$scope.category = response.data[0];
		};

		var errorCallBack = function (reason) {
			$scope.error = reason.data;
		};
		var idData = { "id": id };

		$http({
			method: 'POST',
			url: 'http://localhost:3000/editCategory',
			data: idData
		})
			.then(successCallBack, errorCallBack);


		$scope.Submit = function () {

			var successCallBack = function (response) {
				$location.url("/viewCat");
			};

			var errorCallBack = function (reason) {
				$scope.error = reason.data;
			};

			$http({
				method: 'POST',
				url: 'http://localhost:3000/updateCategory',
				data: $scope.category
			})
				.then(successCallBack, errorCallBack);

		}
	})

	.controller("viewPropertyCTRL", function ($scope, $http, $log) {
		var successCallBack = function (response) {
			$scope.Propertys = response.data;

		};

		var errorCallBack = function (reason) {
			$scope.error = reason.data;
		};


		$http({
			method: 'GET',
			url: 'http://localhost:3000/Property'
		})
			.then(successCallBack, errorCallBack);
	})

	.controller("deletePropertyCTRL", function ($scope, $http, $log, $routeParams, $location) {
		var id = $routeParams.id;
		var successCallBack = function (response) {
			console.log(response.data.message);
			if (response.data.message == "Task successfully deleted") {
				$location.url("/viewProperty");
			}
		};

		var errorCallBack = function (reason) {
			$scope.error = reason.data;
		};
		var idData = { "id": id };

		$http({
			method: 'POST',
			url: 'http://localhost:3000/delProperty',
			data: idData
		})
			.then(successCallBack, errorCallBack);



	})

	.controller("viewAgentCTRL", function ($scope, $http, $log) {
		var successCallBack = function (response) {
			$scope.Agents = response.data;

		};

		var errorCallBack = function (reason) {
			$scope.error = reason.data;
		};


		$http({
			method: 'GET',
			url: 'http://localhost:3000/AgentAdmin'
		})
			.then(successCallBack, errorCallBack);
	})

	.controller("deleteAgentCTRL", function ($scope, $http, $log, $routeParams, $location) {
		var id = $routeParams.id;
		var successCallBack = function (response) {
			console.log(response.data.message);
			if (response.data.message == "Task successfully deleted") {
				$location.url("/viewAgent");
			}
		};

		var errorCallBack = function (reason) {
			$scope.error = reason.data;
		};
		var idData = { "id": id };

		$http({
			method: 'POST',
			url: 'http://localhost:3000/delAgent',
			data: idData
		})
			.then(successCallBack, errorCallBack);
	})

	.controller("viewUserCTRL", function ($scope, $http, $log) {
		var successCallBack = function (response) {
			$scope.users = response.data;

		};

		var errorCallBack = function (reason) {
			$scope.error = reason.data;
		};


		$http({
			method: 'GET',
			url: 'http://localhost:3000/user'
		})
			.then(successCallBack, errorCallBack);
	
	}).controller("logoutCTRL", function ($window) {
		$window.location.href = 'http://localhost:3000/admin/';

	});


myApp.filter('Demofilter', function () {
	return function (input) {
		if (input == 1) {
			return "Active";
		}
		else {
			return "Disabled";
		}

	}
});