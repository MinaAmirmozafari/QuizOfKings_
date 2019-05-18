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
                    localStorage.setItem('initData', JSON.stringify(response.data));

// Retrieve the object from localStorage
                    var retrievedObject = localStorage.getItem('initData');

// console.log retrieved item
                    console.log('retrieved data Object: ', JSON.parse(retrievedObject));
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