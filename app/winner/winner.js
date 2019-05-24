'use strict';

angular.module('myApp.winner', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/winner', {
    templateUrl: 'winner/winner.html',
    controller: 'winnerCtrl'
  });
}])

.controller('winnerCtrl' , [ '$scope','$location','$http', function($scope ,$location ,$http) {
    function init() {
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
                       $scope.winner = response.data.Game.WinnerUser.Name;
                    }
                }
            });
    };
    init();
    $scope.backToGame = function () {
        $location.path('/selectCategory');
    }
}]);