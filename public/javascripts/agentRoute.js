var myApp = angular.module("myModule", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/viewAgentDetails",
                {
                    templateUrl: "viewAgent.html",
                    controller: "viewAgentCTRL"
                })
            .when("/editAgent",
                {
                    templateUrl: "editAgent.html",
                    controller: "editAgentCTRL"
                })
            .when("/logout",
                {
                    templateUrl: "homeScreen.html",
                    controller: "logoutCTRL"
                })
            .when("/addPropertyAgent",
                {
                    templateUrl: "addProperty.html",
                    controller: "addPropertyCTRL"
                })
            .when("/viewPropertyAgent",
                {
                    templateUrl: "viewProperty.html",
                    controller: "viewPropertyCTRL"
                })
            .when("/deleteProperty",
                {
                    templateUrl: "viewProperty.html",
                    controller: "deletePropertyCTRL"
                })

            // .when("/editCat",
            // 	{
            // 		templateUrl: "editCategory.html",
            // 		controller: "editCategoryCTRL"
            // 	})
            // .when("/deleteCat",
            // 	{
            // 		templateUrl: "viewCategory.html",
            // 		controller: "deleteCategoryCTRL"
            // 	})
            // .when("/viewProperty",
            // 	{
            // 		templateUrl: "viewProperty.html",
            // 		controller: "viewPropertyCTRL"
            // 	})

            // .when("/viewAgent",
            // 	{
            // 		templateUrl: "viewAgent.html",
            // 		controller: "viewAgentCTRL"
            // 	})
            // .when("/deleteAgent",
            // 	{
            // 		templateUrl: "viewAgent.html",
            // 		controller: "deleteAgentCTRL"
            // 	})
            // .when("/viewUser",
            // 	{
            // 		templateUrl: "viewUser.html",
            // 		controller: "viewUserCTRL"
            // 	})
            // .when("/logout",
            // 	{
            // 		templateUrl: "homescreen.html",
            // 		controller: "logoutCTRL"
            // 	})

            .otherwise({
                templateUrl: "homescreen.html"
            });


    })
    .controller("addPropertyCTRL", function ($scope, $http, $window) {
        $scope.Property = {};
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


        $scope.Property.Agent_id = $window.localStorage["Agentid"];

        $scope.Submit = function () {

            var uploadUrl = '/uploadProperty';
            var data = $scope.Property;
            console.log("formData", data);
            var fd = new FormData();
            for (var key in data)
                fd.append(key, data[key]);

            var successCallBack = function (response) {
                alert(response.data.result);
                $scope.Property = "";
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

    .controller("viewPropertyCTRL", function ($scope, $http, $log, $window) {
        var id = $window.localStorage["Agentid"];
        var successCallBack = function (response) {
            $scope.Propertys = response.data;

        };

        var errorCallBack = function (reason) {
            $scope.error = reason.data;
        };
        var idDATA = { "id": id };

        $http({
            method: 'POST',
            url: 'http://localhost:3000/getPropertyAgent',
            data: idDATA
        })
            .then(successCallBack, errorCallBack);
    })

    // .controller("deleteCategoryCTRL", function ($scope, $http, $log, $routeParams, $location) {
    // 	var id = $routeParams.id;
    // 	var successCallBack = function (response) {
    // 		console.log(response.data.message);
    // 		if (response.data.message == "Task successfully deleted") {
    // 			$location.url("/viewCat");
    // 		}
    // 	};

    // 	var errorCallBack = function (reason) {
    // 		$scope.error = reason.data;
    // 	};
    // 	var idData = { "id": id };

    // 	$http({
    // 		method: 'POST',
    // 		url: 'http://localhost:3000/delCategory',
    // 		data: idData
    // 	})
    // 		.then(successCallBack, errorCallBack);



    // })

    .controller("editAgentCTRL", function ($scope, $http, $log, $routeParams, $location) {
        var id = $routeParams.id;
        var successCallBack = function (response) {
            $scope.Agent = response.data[0];
        };

        var errorCallBack = function (reason) {
            $scope.error = reason.data;
        };
        var idData = { "id": id };

        $http({
            method: 'POST',
            url: 'http://localhost:3000/editAgentData',
            data: idData
        })
            .then(successCallBack, errorCallBack);


        $scope.Submit = function () {

            var successCallBack = function (response) {
                $location.url("/viewAgentDetails");
            };

            var errorCallBack = function (reason) {
                $scope.error = reason.data;
            };

            $http({
                method: 'POST',
                url: 'http://localhost:3000/updateAgentData',
                data: $scope.Agent
            })
                .then(successCallBack, errorCallBack);

        }
    })

    // .controller("viewPropertyCTRL", function ($scope, $http, $log) {
    // 	var successCallBack = function (response) {
    // 		$scope.Propertys = response.data;

    // 	};

    // 	var errorCallBack = function (reason) {
    // 		$scope.error = reason.data;
    // 	};


    // 	$http({
    // 		method: 'GET',
    // 		url: 'http://localhost:3000/Property'
    // 	})
    // 		.then(successCallBack, errorCallBack);
    // })

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

    .controller("viewAgentCTRL", function ($scope, $http, $log, $window) {
        var id = $window.localStorage["Agentid"];
        var successCallBack = function (response) {
            $scope.Agents = response.data;

        };

        var errorCallBack = function (reason) {
            $scope.error = reason.data;
        };
        var idData = { "id": id };


        $http({
            method: 'POST',
            url: 'http://localhost:3000/AgentData',
            data: idData
        })
            .then(successCallBack, errorCallBack);
    })

    // 	.controller("deleteAgentCTRL", function ($scope, $http, $log, $routeParams, $location) {
    // 		var id = $routeParams.id;
    // 		var successCallBack = function (response) {
    // 			console.log(response.data.message);
    // 			if (response.data.message == "Task successfully deleted") {
    // 				$location.url("/viewAgent");
    // 			}
    // 		};

    // 		var errorCallBack = function (reason) {
    // 			$scope.error = reason.data;
    // 		};
    // 		var idData = { "id": id };

    // 		$http({
    // 			method: 'POST',
    // 			url: 'http://localhost:3000/delAgent',
    // 			data: idData
    // 		})
    // 			.then(successCallBack, errorCallBack);
    // 	})

    // 	.controller("viewUserCTRL", function ($scope, $http, $log) {
    // 		var successCallBack = function (response) {
    // 			$scope.users = response.data;

    // 		};

    // 		var errorCallBack = function (reason) {
    // 			$scope.error = reason.data;
    // 		};


    // 		$http({
    // 			method: 'GET',
    // 			url: 'http://localhost:3000/user'
    // 		})
    // 			.then(successCallBack, errorCallBack);
    // 	})

    

    .controller("logoutCTRL", function ($scope, $http, $routeParams, $location, $window) {

        if ($window.localStorage["Agentid"] != null) {
            $window.localStorage["Agentid"] = "";
        }
        $window.location.href = 'http://localhost:3000/Agent/';
    });


// myApp.filter('Demofilter', function () {
// 	return function (input) {
// 		if (input == 1) {
// 			return "Active";
// 		}
// 		else {
// 			return "Disabled";
// 		}

// 	}
// });