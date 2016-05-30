/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';


angular.module('RDash').controller('DiscussCtrl', ['$scope', '$cookieStore', 'discussApiService', DiscussCtrl]);

function DiscussCtrl($scope, $cookieStore, discussApiService) {

    $scope.channelList = [
        {value: 1, name: '直播'},
        {value: 2, name: '交流'},
        {value: 3, name: '问答'}
    ];

    $scope.vipLevelOpList = [
        {value: 0, name: '全部'},
        {value: 1, name: '普通'},
        {value: 2, name: '会员'},
        {value: 4, name: 'VIP'},
        {value: 8, name: 'VVIP'}
    ];

    $scope.vipLevelObj={
        1:'普通',2:'会员',4:'VIP',8:'VVIP'
    };

    $scope.vipLevelOp    = $scope.vipLevelOpList[0];

    $scope.changeVipLevel = function () {
        discussApiService.getLiveOpinionList($scope.currentPage, $scope.vipLevelOp.value).then(bindData2Scope);
    };




    function bindData2Scope(data) {
        $scope.dataList    = data.result.dataList;
        $scope.totalCount  = data.result.totalCount;
        $scope.currentPage = data.result.curPage;
        $scope.dataList.forEach((item)=> {
            item.channel_name = $scope.channelList[item.bid - 1].name
        })
    }

    discussApiService.getLiveOpinionList(1).then(bindData2Scope);


    $scope.delete = (timelineId)=> {
        if (!confirm('确定删除该条交流!')) return;
        discussApiService.deleteOpinion(timelineId).then(()=> {
            $scope.dataList.forEach((item, index)=> {
                if (item.timeline_id == timelineId) {
                    item.status = 0;
                }
            })
        })
    };

    $scope.recovery = (timelineId)=> {
        if (!confirm('确定恢复该条交流!')) return;
        discussApiService.recoveryOpinion(timelineId).then(()=> {
            $scope.dataList.forEach((item, index)=> {
                if (item.timeline_id == timelineId) {
                    item.status = 1;
                }
            })
        })
    }
}