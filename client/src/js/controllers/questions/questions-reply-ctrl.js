/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('QuestionsReplyCtrl', ['$scope', '$cookieStore', '$stateParams', 'questionsApiService', QuestionsReplyCtrl]);

function QuestionsReplyCtrl($scope, $cookieStore, $stateParams, questionsApiService) {

    const id   = $stateParams.id;
    const view = $stateParams.view;

    $scope.isView = view;

    console.log($stateParams);

    questionsApiService.getQuestionsOpinionDetails(id).then(function (data) {
        $scope.auid      = data.result.uid;
        $scope.author    = data.result.nickname + '- 创建于:' + data.result.time;
        $scope.q_content = data.result.content;
    });




    questionsApiService.getVerifyUser().then((data)=> {
        $scope.verifyUserList = data.result;
        if (!view) $scope.uid = $scope.verifyUserList[0].uid;

        if (view) {
            questionsApiService.getQuestionsOpinionDetailsView(id).then(function (data) {
                var ii=0;
                $scope.content = data.result.content;
                console.log($scope.verifyUserList);
                $scope.verifyUserList.forEach(function(item,index){
                    if(item.uid==data.result.uid){
                        ii=index;
                    }
                });
                $scope.uid=$scope.verifyUserList[ii].uid;
            })
        }

    });


    $scope.reply = ()=> {
        questionsApiService.replyQuestion({
            content: $scope.content,
            opinion_id: id,
            uid: $scope.uid,
            reply_to_uid: $scope.auid
        }).then(()=> {
            alert('回复成功!');
            location.reload();
        })
    }
}