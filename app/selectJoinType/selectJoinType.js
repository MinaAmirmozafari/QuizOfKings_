'use strict';

angular.module('myApp.selectJoinType', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/selectJoinType', {
    templateUrl: 'selectJoinType/selectJoinType.html',
    controller: 'selectJoinTypeCtrl'
  });
}])

.controller('selectJoinTypeCtrl' , [ '$scope','$location', function($scope ,$location ) {
    function init() {
    };
    init();
    $scope.joinToGame= function ()  {
        $location.path('/selectCategory');
    };
    $scope.createGame= function ()  {

    }
}]);