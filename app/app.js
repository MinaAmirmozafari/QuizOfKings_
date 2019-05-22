'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.login',
  'myApp.register',
  'myApp.selectCategory',
  'myApp.changepassword',
  'myApp.selectJoinType',
  'myApp.version',
  'myApp.user',
  'ui.bootstrap',
  'myApp.question'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/register'});
}]);
