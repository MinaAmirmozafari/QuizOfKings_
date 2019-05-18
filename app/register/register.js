'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'registerCtrl'
  });
}])

.controller('registerCtrl' , [ '$scope','$http','$location', function($scope,$http,$location) {
    function init() {
        $scope.securityquestionitems = [];
        getQuestionList();
    };
    init();
     function getQuestionList () {
        var data ={
            "UserID": "",
            "ServiceKey": "kq"
        }
        $http.post( "http://khanabooks.com/KQ/api/SecurityQuestionList" ,data )
            .then(function(response) {
                if(response.status==200 ){
                    $scope.securityquestionitems = response.data ;
                }
            });
    };
     $scope.signin = function(){
         $location.path("/login" );
     }
    $scope.register = function () {
        var registerData={
            "Name": $scope.Name.toString(),
            "Mobile":  $scope.userName.toString(),
            "Password":  $scope.password.toString(),
            "SecurityQuestionID":  $scope.questionBox.toString(),
            "SecurityQuestionAnswer":  $scope.answer.toString(),
            "ServiceKey": "kq"
        };
        $http.post( "http://khanabooks.com/KQ/api/Register" ,registerData )
            .then(function(response) {
                if(response.status==200 && response.data.ResponseCode==0){

                }
            });
    };
}]);