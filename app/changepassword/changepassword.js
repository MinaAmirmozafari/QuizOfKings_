'use strict';

angular.module('myApp.changepassword', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/changepassword', {
    templateUrl: 'changepassword/changepassword.html',
    controller: 'changepasswordCtrl'
  });
}])

.controller('changepasswordCtrl' , [ '$scope','$http','$location', function($scope,$http, $location) {
    function init() {
    };
    init();
    $scope.changepassword = function () {
        var changepasswordData={
            "Mobile": $scope.userName.toString(),
            "NewPassword": $scope.password.toString(),
            "SecurityQuestionAnswer": $scope.answer.toString(),
            "ServiceKey": "kq"
        };
        $http.post( "http://khanabooks.com/KQ/api/ResetUserPassword" ,changepasswordData )
            .then(function(response) {
                if(response.status==200 && response.data.ResponseCode==0){
                    $location.path("/login" );

                }
            });
    };
}]);