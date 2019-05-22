'use strict';

angular.module('myApp.selectCategory', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/selectCategory', {
    templateUrl: 'selectCategory/selectCategory.html',
    controller: 'selectCategoryCtrl'
  });
}])

.controller('selectCategoryCtrl' , [ '$scope','$http' ,'$uibModal' ,'$location', function($scope,$http,$uibModal,$location ) {
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
    $scope.joinGame = function(game){
         var joinGameData ={
             "GameID": game.ID,
             "UserID":  JSON.parse(sessionStorage["user"]).ID,
             "ServiceKey": "kq"
         };
        $http.post( "http://khanabooks.com/KQ/api/JoinGame" ,joinGameData )
            .then(function(response) {
                if(response.data.ResponseCode==0 && response.status==200){
                    $scope.item.CountOfOpenGame = (parseInt($scope.item.CountOfOpenGame.toString())-1).toString();
                    $location.path("/question" );
                }
            });
        $scope.modalInstance.close();
    };
    $scope.createGame = function () {
        var obj =  JSON.parse(sessionStorage["user"]);
        var Id  =  obj.ID;
        var createGameData ={
            "UserID": Id,
            "QuestionGroupID" : $scope.item.ID,
            "PlayerCount": "2",
            "ServiceKey": "kq"
        };
        $http.post( "http://khanabooks.com/KQ/api/CreateGame" ,createGameData )
            .then(function(response) {
                if(response.data.ResponseCode==0 && response.status==200){
                    $scope.item.CountOfOpenGame = (parseInt($scope.item.CountOfOpenGame.toString())+1).toString();
                    $scope.modalInstance.close();
                }
            });
    };
    $scope.cancel = function(){
         $scope.modalInstance.dismiss();
     };
    $scope.openModal= function (item)  {
        var i;
        $http.post( "http://khanabooks.com/KQ/api/OnLineGameList" ,{
            "UserID": JSON.parse(sessionStorage["user"]).ID,
            "QuestionGroupID": item.ID,
            "ServiceKey": "kq"} )
            .then(function(response) {
                if( response.status==200){
                    $scope.onlineGames=response.data;

                  /*  for (i=0;i<response.data.length;i++) {
                        if (parseInt(response.data[i].JoinedPlayerCount) != 2)
                            $scope.onlineGames.push(response.data[i]);
                    }*/
                }
            });
        $scope.item = item;
        $scope.modalInstance = $uibModal.open({
            templateUrl: 'selectCategory/selectGame.html',
            controller : 'selectCategoryCtrl' ,
            scope: $scope

        });
        modalInstance.result.then(function () {

        }, function () {
        });
    }
}]);