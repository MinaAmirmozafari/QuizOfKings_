'use strict';

angular.module('myApp.selectCategory', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/selectCategory', {
    templateUrl: 'selectCategory/selectCategory.html',
    controller: 'selectCategoryCtrl'
  });
}])

.controller('selectCategoryCtrl' , [ '$scope','$http', function($scope,$http) {
    function init() {
        $scope.items = [
            {
                "ID": "1",
                "Description": "ورزش",
                "CountOfClosedGame": "0",
                "CountOfOpenGame": "0"
            },
            {
                "ID": "2",
                "Description": "موسيقي",
                "CountOfClosedGame": "1",
                "CountOfOpenGame": "0"
            },
            {
                "ID": "3",
                "Description": "سينما",
                "CountOfClosedGame": "0",
                "CountOfOpenGame": "0"
            },
            {
                "ID": "4",
                "Description": "كامپيوتر",
                "CountOfClosedGame": "0",
                "CountOfOpenGame": "0"
            },
            {
                "ID": "5",
                "Description": "مذهبی",
                "CountOfClosedGame": "0",
                "CountOfOpenGame": "0"
            },
            {
                "ID": "6",
                "Description": "اطلاعات عمومی",
                "CountOfClosedGame": "0",
                "CountOfOpenGame": "0"
            },
            {
                "ID": "7",
                "Description": "ادبیات",
                "CountOfClosedGame": "0",
                "CountOfOpenGame": "0"
            },
            {
                "ID": "8",
                "Description": "تاریخ",
                "CountOfClosedGame": "0",
                "CountOfOpenGame": "0"
            },
            {
                "ID": "9",
                "Description": "اماکن",
                "CountOfClosedGame": "0",
                "CountOfOpenGame": "0"
            },
            {
                "ID": "10",
                "Description": "علمی",
                "CountOfClosedGame": "0",
                "CountOfOpenGame": "0"
            }
        ];
    };
    init();

}]);