'use strict';

angular.module('myApp.question', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/question', {
    templateUrl: 'question/question.html',
    controller: 'questionCtrl'
  });
}])

.controller('questionCtrl' , [ '$scope','$http', function($scope ,$http ) {
    function init() {
        $scope.questionList = [];
        getAnswersList();
    }
    init();
    function getAnswersList (){
        let  postData = {
            "GameID": JSON.parse(sessionStorage["gameId"]),
            "UserID": JSON.parse(sessionStorage["user"]).ID,
            "ServiceKey": "kq"
        };

        $http.post( "http://khanabooks.com/KQ/api/NextQuestion" ,postData )
            .then(function(response) {
                if(response.status==200){
                    $scope.question = response.data.Question;
                    $scope.answersList = response.data.Answer;
                }
            });
    }
    $scope.sendAnswer= function ()  {
    };

}]);