'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl' , [ '$scope','$http' ,'$location', function($scope,$http ,$location) {
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
                    sessionStorage.setItem("user", JSON.stringify( response.data));
                    $location.path("/selectCategory" );

                }
            });
    };
    $scope.changePassword = function () {
        $location.path("/changepassword" );

    };

}]);