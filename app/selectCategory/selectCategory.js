'use strict';

angular.module('myApp.selectCategory', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/selectCategory', {
    templateUrl: 'selectCategory/selectCategory.html',
    controller: 'selectCategoryCtrl'
  });
}])

.controller('selectCategoryCtrl' , [ '$scope','$http' ,'$uibModal' ,'$location','$interval' ,'toaster'
    , function($scope,$http,$uibModal,$location,$interval,toaster ) {
    init();
    $scope.joinGame = function(game){
        $scope.joinGameData ={
            "GameID": game.ID,
            "UserID":  JSON.parse(sessionStorage["user"]).ID,
            "ServiceKey": "kq"
        };
        $http.post( "http://khanabooks.com/KQ/api/JoinGame" ,$scope.joinGameData )
            .then(function(response) {
                if(response.data.ResponseCode==0 && response.status==200){
                    $scope.item.CountOfOpenGame = (parseInt($scope.item.CountOfOpenGame.toString())-1).toString();
                    $scope.gameId = game.ID;
                    toaster.pop('note', "اطلاع", response.data.Message.toString());
                    sessionStorage.setItem('gameId', JSON.stringify( game.ID));
                    $http.post( "http://khanabooks.com/KQ/api/UserReadiness" ,$scope.joinGameData )
                        .then(function(response) {
                            if(response.data.ResponseCode==0 && response.status==200){
                                $scope.timer = $interval(gameStatus , 2000 );
                                /*   if (angular.isDefined($scope.timer)){
                                      $interval.cancel($scope.timer);
                               }*/
                                /*if ($scope.gameStatus) {
                                    $location.path("/question");
                                }*/
                            }
                            else if(response.data.ResponseCode==1 && response.status==200){
                                toaster.pop('error', "خطا", response.data.Message.toString());
                            }
                        });
                }
                else if(response.data.ResponseCode==1 && response.status==200){
                    toaster.pop('error', "خطا", response.data.Message.toString());
                }
            });
        $scope.modalInstance.close();
    };

    function init() {
        $scope.items1 =[];
        $scope.items2 =[];
        getItems();
        $interval(updateOpenGames,2000);
    }
    function getItems () {
        $scope.items1 = [];
       $scope.items2 = [];
       let obj =  JSON.parse(sessionStorage["user"]);
        let Id  =  obj.ID;
         let data ={
             "UserID": Id,
             "ServiceKey": "kq"
         };
         $http.post( "http://khanabooks.com/KQ/api/QuestionGroup" ,data )
             .then(function(response) {
                 let i;
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
                 else if(response.status==200 &&response.data.ResponseCode==1){
                     toaster.pop('error', "خطا", response.data.Message.toString());
                 }
             });
    }
    function check2players(){
        let obj =  JSON.parse(sessionStorage["user"]);
        let Id  =  obj.ID;
        let gameStatusData ={
            "UserID": Id,
            "GameID": $scope.gameId,
            "ServiceKey": "kq"
        };
        $http.post( "http://khanabooks.com/KQ/api/GameStatus" ,gameStatusData )
            .then(function(response) {
                if(response.data.ResponseCode==0 && response.status==200 && response.data.Game.PlayerCount== 2 && response.data.Game.JoinedPlayerCount== 2){
                    {
                        $http.post( "http://khanabooks.com/KQ/api/UserReadiness" ,gameStatusData )
                            .then(function(response) {
                                if(response.data.ResponseCode==0 && response.status==200){
                                    startGame(gameStatusData);
                                }
                                else if(response.data.ResponseCode==1 && response.status==200){
                                    toaster.pop('warning', "هشدار", response.data.Message.toString());
                                }
                            });
                    }
                }
            });
    }
    function startGame(data) {
        $http.post( "http://khanabooks.com/KQ/api/StartGame" ,data )
            .then(function(response) {
                if(response.data.ResponseCode==0 && response.status==200){
                    $interval.cancel($scope.timer2);
                    $location.path("/question");
                }
                else if(response.data.ResponseCode==1 && response.status==200){
                    toaster.pop('warning', "هشدار", response.data.Message.toString());
                }

            });
    }
    function gameStatus() {
        let obj = JSON.parse(sessionStorage["user"]);
        let Id = obj.ID;
        let createGameData = {
            "UserID": Id,
            "GameID": $scope.gameId,
            "ServiceKey": "kq"
        };
        $http.post("http://khanabooks.com/KQ/api/GameStatus", createGameData)
            .then(function (response) {
                if (response.data.ResponseCode == 0 && response.status == 200 && response.data.Game.IsStarted) {
                    $interval.cancel($scope.timer);
                    $location.path("/question");

                }
            });
    }
    function updateOpenGames() {
        let obj =  JSON.parse(sessionStorage["user"]);
        let Id  =  obj.ID;
        let data ={
            "UserID": Id,
            "ServiceKey": "kq"
        };
        $http.post( "http://khanabooks.com/KQ/api/QuestionGroup" ,data )
            .then(function(response) {
                let i,j,k;
                if(response.status==200 ){
                    for (i = 0; i < response.data.length; i++) {
                        for(j = 0; j < $scope.items1.length; j++){
                            if(response.data[i].ID == $scope.items1[j].ID){
                                $scope.items1[j].CountOfOpenGame = response.data[i].CountOfOpenGame;
                            }
                        }

                        for(k = 0; k < $scope.items2.length; k++){
                            if(response.data[i].ID == $scope.items2[k].ID){
                                $scope.items2[k].CountOfOpenGame = response.data[i].CountOfOpenGame;
                            }
                        }
                    }
                }
            });
    }
    $scope.createGame = function () {
        let obj =  JSON.parse(sessionStorage["user"]);
        let Id  =  obj.ID;
        let createGameData ={
            "UserID": Id,
            "QuestionGroupID" : $scope.item.ID,
            "PlayerCount": "2",
            "ServiceKey": "kq"
        };
        $http.post( "http://khanabooks.com/KQ/api/CreateGame" ,createGameData )
            .then(function(response) {
                if(response.data.ResponseCode==0 && response.status==200){
                    $scope.gameId = response.data.GameID;
                    sessionStorage.setItem('gameId', JSON.stringify(response.data.GameID));
                    $scope.item.CountOfOpenGame = (parseInt($scope.item.CountOfOpenGame.toString())+1).toString();
                    $scope.modalInstance.close();
                    $scope.timer2 = $interval(check2players, 2000);
                }
                else if(response.data.ResponseCode==1 && response.status==200){
                    toaster.pop('warning', "هشدار", response.data.Message.toString());
                }
            });
    };
    $scope.cancel = function(){
         $scope.modalInstance.dismiss();
     };
    $scope.openModal= function (item)  {
        let i;
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