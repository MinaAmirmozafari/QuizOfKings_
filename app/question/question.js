'use strict';

angular.module('myApp.question', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/question', {
    templateUrl: 'question/question.html',
    controller: 'questionCtrl'
  });
}])

.controller('questionCtrl' , [ '$scope','$http' , 'toaster' , '$location', function($scope ,$http, toaster,$location ) {
    function init() {
        $scope.counter=0;
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
                    $location.path('/winner');
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
        let  postData = {
            "GameID": JSON.parse(sessionStorage["gameId"]),
            "UserID": JSON.parse(sessionStorage["user"]).ID,
            "ServiceKey": "kq"
        };
        $http.post( "http://khanabooks.com/KQ/api/SaveGameUserAnswer" ,answerData )
            .then(function(response) {
                if(response.status==200 && response.data.ResponseCode==0){
                    $scope.counter++;
                    if($scope.counter<4){
                        getAnswersList();
                    }
                    else{
                        $http.post( "http://khanabooks.com/KQ/api/FinishGame" ,postData )
                            .then(function(response) {
                                if(response.status==200 && response.data.ResponseCode==1){
                                    toaster.pop('error', "خطا", response.data.Message.toString());
                                }
                            });
                        $location.path('/winner');
                    }

                }
                else if(response.status==200 && response.data.ResponseCode==1){
                    toaster.pop('error', "خطا", response.data.Message.toString());
                    $http.post( "http://khanabooks.com/KQ/api/FinishGame" ,postData )
                        .then(function(response) {
                            if(response.status==200 && response.data.ResponseCode==1){
                                toaster.pop('error', "خطا", response.data.Message.toString());
                            }
                        });
                    $location.path('/winner');
                }
            });
    };

}]);