'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl' , [ '$scope','$http' ,'$location', 'toaster', function($scope,$http ,$location ,toaster) {
    function init() {
    }
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
                    toaster.pop('note', "ورود موفق", response.data.Message.toString());
                    sessionStorage.setItem("user", JSON.stringify( response.data));
                    $location.path("/selectCategory" );
                }
                else if(response.data.ResponseCode== 1 && response.status==200){
                    toaster.pop('error', "خطا", response.data.Message.toString());
                }
            });
    };
    $scope.changePassword = function () {
        $location.path("/changepassword" );

    };

}]);