var app = angular.module('agentApp', []);

app.controller('loginController', function ($scope, $http, $window) {
    $scope.sup = {};
    $scope.login = function () {

        var successCallBack = function (response) {
            var loginResult = response.data.result;
            
            console.log(loginResult);
            if (loginResult == "success") {
                $window.localStorage["agentid"]=response.data.agentId;    
                $window.location.href = 'http://localhost:3000/agent/home.html';
            }
            else {
                $window.location.href = 'http://localhost:3000/agent/';
                alert("Username-Password Mismatch");
            }
        };
        var errorCallBack = function (reason) {
            $scope.login = reason.data;
        };

        $http({
            method: 'POST',
            url: 'http://localhost:3000/agentLogin',
            data: $scope.sup
        })
            .then(successCallBack, errorCallBack);
    }
});

app.controller("registerController", function ($scope, $http, $window) {
    $scope.agent = {};
    $scope.register = function () {

        var successCallBack = function (response) {
            var loginResult = response.data.result;
            console.log(loginResult);
            if (loginResult == "success") {
                alert("Successfully Registered");
                $scope.agent={};
            }
            else {
                alert("Registration Failed");
            }
        };
        var errorCallBack = function (reason) {
            $scope.login = reason.data;
        };

        $http({
            method: 'POST',
            url: 'http://localhost:3000/agentRegister',
            data: $scope.agent
        })
            .then(successCallBack, errorCallBack);
    }
});

