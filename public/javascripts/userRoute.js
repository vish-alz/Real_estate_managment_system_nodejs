var myApp = angular.module("myModule", ["ngRoute"])
	.config(function ($routeProvider, _$locationProvider) {
		$routeProvider
			.when("/",
				{
					templateUrl: "home.html",
					controller: "homeCTRL"
				})
			.when("/propertys",
				{
					templateUrl: "showpropertys.html",
					controller: "propertysCTRL"
				})
			.when("/showproperty",
				{
					templateUrl: "showproperty.html",
					controller: "showpropertyCTRL"
				})
			.when("/signup",
				{
					templateUrl: "signup.html",
					controller: "signupCTRL"
				})
			.when("/login",
				{
					templateUrl: "login.html",
					controller: "loginCTRL"
				})
			.when("/logout",
				{
					templateUrl: "home.html",
					controller: "logoutCTRL"
				})
			
			.when("/buyproperty",
				{
					templateUrl: "buy.html",
					controller: "buypropertyCTRL"
				})
		
	}).controller("homeCTRL", function ($scope, $http, _$window) {


		var successCallBack = function (response) {
			$scope.category = response.data;
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
	.controller("propertysCTRL", function ($scope, $http, $routeParams) {
		var id = $routeParams.id;

		var successCallBack = function (response) {
			$scope.propertys = response.data;
		};

		var errorCallBack = function (reason) {
			$scope.error = reason.data;
		};

		var idData = { "id": id };

		$http({
			method: 'POST',
			url: 'http://localhost:3000/getproperty',
			data: idData
		})
			.then(successCallBack, errorCallBack);
	})
	.controller("showpropertyCTRL", function ($scope, $http, $routeParams, $window, $location) {
		var id = $routeParams.id;
		var successCallBack = function (response) {
			$scope.singleproperty = response.data;
			console.log(response.data);
			$window.localStorage["property_title"] = response.data[0].property_title;
			$window.localStorage["property_price"] = response.data[0].price;

		};

		var errorCallBack = function (reason) {
			$scope.error = reason.data;
		};

		var idData = { "id": id };
		$http({
			method: 'POST',
			url: 'http://localhost:3000/getSingleproperty',
			data: idData
		})
			.then(successCallBack, errorCallBack);

		$scope.buy = function () {

			if ($window.localStorage["user_email"] != "") {
				$location.url("/buyproperty?id=" + $routeParams.id);
			}
			else {
				alert("Login to continue");
				$location.url("/login");
			}

		}
	})
	.controller("signupCTRL", function ($scope, $http, _$routeParams, $location, _$window) {
		$scope.user = {};
		$scope.signup = function () {

			var successCallBack = function (_response) {

				$location.url("/login");
			};

			var errorCallBack = function (reason) {
				$scope.error = reason.data;
			};

			$http({
				method: 'POST',
				url: 'http://localhost:3000/user',
				data: $scope.user
			})
				.then(successCallBack, errorCallBack);

		}

	})
	.controller("loginCTRL", function ($scope, $http, _$routeParams, $location, $window) {
		$scope.user = {};
		$scope.login = function () {
			console.log($scope.user);
			var successCallBack = function (response) {
				var loginResult = response.data.result;


				if (loginResult == "success") {
					$window.localStorage["user_email"] = $scope.user.user_email;
					$window.location.href = 'http://localhost:3000/';
				}
				else {
					alert("Username-Password Mismatch");
					$scope.user = {};
					$location.url("/login");
				}
			};

			var errorCallBack = function (reason) {
				$scope.error = reason.data;
			};

			$http({
				method: 'POST',
				url: 'http://localhost:3000/userLogin',
				data: $scope.user
			})
				.then(successCallBack, errorCallBack);

		}

	})
	
	
	.controller("logoutCTRL", function (_$scope, _$http, _$routeParams, _$location, $window) {

		if ($window.localStorage["user_email"] != null) {
			$window.localStorage["user_email"] = "";
		}
		$window.location.href = 'http://localhost:3000/';
	})
	.controller("buypropertyCTRL", function ($scope, _$http, $routeParams, _$location, $window) {

		var id = $routeParams.id;
		$scope.user_email = $window.localStorage["user_email"];
		$scope.property_title = $window.localStorage["property_title"];
		$scope.property_price = $window.localStorage["property_price"];
		payment_data = { "email": $window.localStorage["user_email"], "title": $window.localStorage["property_title"], "price": $window.localStorage["property_price"] };

	});
	
		


myApp.controller('indexController', function ($scope, _$http, $window) {
	if ($window.localStorage["user_email"] != null) {
		$scope.token = $window.localStorage["user_email"];
	}
});

