'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl' , [ '$scope','$http', function($scope,$http) {
    function init() {

    };
    init();

    $scope.Login = function () {
        var  postData = {
            "Mobile": $scope.userName,
            "Password": $scope.password,
            "ServiceKey": "kq"
        };
        $http.post( "http://khanabooks.com/KQ/api/Login" ,postData )
            .then(function(response) {
                if(response.data.ResponseCode== 0 && response.status==200){
                    sessionStorage.setItem("user", JSON.stringify( response.data));
                   /* var me = JSON.parse( window.sessionStorage.getItem("me"))*/
                    alert('right');
                }
            });
    };

    $scope.changePassword = function () {
        $http.post( "http://khanabooks.com/KQ/api/Login" ,postData )
            .then(function(response) {
                if(response.data.ResponseCode== 0 && response.status==200){
                    alert('right');
                }
            });
    };

}]);