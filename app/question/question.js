'use strict';

angular.module('myApp.question', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/question', {
    templateUrl: 'question/question.html',
    controller: 'questionCtrl'
  });
}])

.controller('questionCtrl' , [ '$scope','$location', function($scope ,$location ) {
    function init() {
    };
    init();
    $scope.joinToGame= function ()  {
        $location.path('/selectCategory');
    };
    $scope.createGame= function ()  {

    }
}]);