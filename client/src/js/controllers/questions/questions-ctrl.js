/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';


angular.module('RDash').controller('QuestionsCtrl', ['$scope', '$cookieStore', 'questionsApiService', QuestionsCtrl]);

function QuestionsCtrl($scope, $cookieStore, questionsApiService) {

    $scope.replyStatusList = [
        {value: 1, name: '已回复'},
        {value: 0, name: '未回复'},
        {value: -1, name: '全部'}
    ];

    $scope.channelList = [
        {value: 1, name: '直播'},
        {value: 2, name: '交流'},
        {value: 3, name: '问答'}
    ];

    $scope.vipLevelObj={
        1:'普通',2:'会员',4:'VIP',8:'VVIP'
    };

    $scope.changeChannel = function () {
        questionsApiService.getQuestionsOpinionList($scope.currentPage, $scope.quality.value).then(bindData2Scope);
    };


    $scope.jump = (page)=> {
        questionsApiService.getQuestionsOpinionList(page,$scope.quality.value).then(bindData2Scope);
    };
    $scope.jumpNext=()=>{
        const p=++$scope.currentPage;
        questionsApiService.getQuestionsOpinionList(p,$scope.quality.value).then(bindData2Scope);
    };
    $scope.jumpPrev=()=>{
        const p=--$scope.currentPage;
        if(p<1) return alert('已是第一页!');
        questionsApiService.getQuestionsOpinionList(p,$scope.quality.value).then(bindData2Scope);
    };

    function bindData2Scope(data) {
        $scope.dataList    = data.result.dataList;
        $scope.totalCount  = data.result.totalCount;
        $scope.currentPage = data.result.curPage;
        $scope.dataList.forEach((item)=> {
            item.channel_name = $scope.channelList[item.bid - 1].name
        })
    }

    $scope.quality=$scope.replyStatusList[2];
    questionsApiService.getQuestionsOpinionList(1).then(bindData2Scope);

    //
    //$scope.delete = (timelineId)=> {
    //    if (!confirm('确定删除该条直播!')) return;
    //    liveApiService.deleteOpinion(timelineId).then(()=> {
    //        $scope.dataList.forEach((item, index)=> {
    //            if (item.timeline_id == timelineId) {
    //                item.status = 0;
    //            }
    //        })
    //    })
    //};
    //
    //$scope.recovery = (timelineId)=> {
    //    if (!confirm('确定恢复该条直播!')) return;
    //    liveApiService.recoveryOpinion(timelineId).then(()=> {
    //        $scope.dataList.forEach((item, index)=> {
    //            if (item.timeline_id == timelineId) {
    //                item.status = 1;
    //            }
    //        })
    //    })
    //}
}