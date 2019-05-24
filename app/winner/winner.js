'use strict';

angular.module('myApp.winner', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/winner', {
    templateUrl: 'winner/winner.html',
    controller: 'winnerCtrl'
  });
}])

.controller('winnerCtrl' , [ '$scope','$location','$http','$interval', function($scope ,$location ,$http ,$interval) {
    function init() {

        $interval(checkResult,2000);
    }
    function checkResult(){
        let obj =  JSON.parse(sessionStorage["user"]);
        let Id  =  obj.ID;
        let gameStatusData ={
            "UserID": Id,
            "GameID": JSON.parse(sessionStorage["gameId"]),
            "ServiceKey": "kq"
        };
        $http.post( "http://khanabooks.com/KQ/api/GameStatus" ,gameStatusData )
            .then(function(response) {
                if(response.data.ResponseCode==0 && response.status==200 ){
                    {
                        if(response.data.IsEnded == "True" && response.data.IsStarted == "True"){
                            $scope.winner = response.data.Game.WinnerUser.Name;
                        }

                    }
                }
            });
    };
    init();
    $scope.backToGame = function () {
        $location.path('/selectCategory');
    }
}]);