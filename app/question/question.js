'use strict';

angular.module('myApp.question', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/question', {
    templateUrl: 'question/question.html',
    controller: 'questionCtrl'
  });
}])

.controller('questionCtrl' , [ '$scope','$http' , 'toaster', function($scope ,$http, toaster ) {
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
                if(response.status==200 ){
                    $scope.question = response.data.Question;
                    $scope.answersList = response.data.Answer;
                }
                else if(response.status==200 && response.data.ResponseCode==1){
                    toaster.pop('error', "خطا", response.data.Message.toString());
                }
            });
    }
    $scope.sendAnswer= function (answer)  {
        let answerData ={
            "GameID": JSON.parse(sessionStorage["gameId"]),
            "UserID": JSON.parse(sessionStorage["user"]).ID,
            "ServiceKey": "kq",
            "AnswerID": answer.ID,
            "QuestionID": $scope.question.ID
        };
        $http.post( "http://khanabooks.com/KQ/api/SaveGameUserAnswer" ,answerData )
            .then(function(response) {
                if(response.status==200 && response.data.ResponseCode==0){
                    getAnswersList();
                }
                else if(response.status==200 && response.data.ResponseCode==1){
                    $http.post( "http://khanabooks.com/KQ/api/GameResult" ,answerData )
                        .then(function(response) {
                            if(response.status==200 && response.data.ResponseCode==0){

                            }


                        });
                }
            });
    };

}]);