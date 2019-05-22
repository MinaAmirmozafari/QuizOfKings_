'use strict';

angular.module('myApp.selectCategory', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/selectCategory', {
    templateUrl: 'selectCategory/selectCategory.html',
    controller: 'selectCategoryCtrl'
  });
}])

.controller('selectCategoryCtrl' , [ '$scope','$http' ,'$uibModal', function($scope,$http,$uibModal) {
    function init() {
        $scope.items1 =[];
        $scope.items2 =[];
        getItems();


    };
    init();
     function getItems () {
       var obj =  JSON.parse(sessionStorage["user"]);
        var Id  =  obj.ID;
         var data ={
             "UserID": Id,
             "ServiceKey": "kq"
         };
         $http.post( "http://khanabooks.com/KQ/api/QuestionGroup" ,data )
             .then(function(response) {
                 var i;
                 if(response.status==200 ){
                     for (i = 0; i < response.data.length; i++) {
                         if((i%2) == 0){
                             $scope.items1.push(response.data[i]);
                         }
                         else{
                             $scope.items2.push(response.data[i]);
                         }
                     }
                 }
             });
    }
    $scope.openModal= function (item)  {
        $uibModal.open({
            templateUrl: 'selectCategory/selectGame.html',
            scope: $scope

        });
    }
}]);