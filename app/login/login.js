'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl' , [ '$scope','$http', function($scope,$http) {
    var  postData = {
        "Mobile": "02839813",
        "Password": "dsoaid",
        "ServiceKey": "asjdoai"
    };
    $scope.Login = function () {
        $http.post( "http://khanabooks.com/KQ/api/Login" ,postData , {"content-type" : "application/json"})
            .then(function(response) {
               $scope.userName = response.data[0];
            });
    };
    $scope.register = function () {
    };
}]);