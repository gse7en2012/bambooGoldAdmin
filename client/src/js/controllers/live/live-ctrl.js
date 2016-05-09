/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';


angular.module('RDash').controller('LiveCtrl', ['$scope', '$cookieStore', 'liveApiService', LiveCtrl]);

function LiveCtrl($scope, $cookieStore, liveApiService) {

    $scope.channelList=[
        {value:1,name:'直播'},
        {value:2,name:'交流'},
        {value:3,name:'问答'}
    ];

    $scope.changeChannel=function(){
        liveApiService.getLiveOpinionList($scope.currentPage,$scope.bid.value).then(bindData2Scope);
    };

    function bindData2Scope(data){
        $scope.dataList    = data.result.dataList;
        $scope.totalCount=data.result.totalCount;
        $scope.currentPage=data.result.curPage;
        $scope.dataList.forEach((item)=>{
            item.channel_name=$scope.channelList[item.bid-1].name
        })
    }

    liveApiService.getLiveOpinionList(1).then(bindData2Scope);


    $scope.delete=(opinionId)=>{
        if(!confirm('确定删除该条直播!')) return;
        liveApiService.deleteOpinion(opinionId).then(()=>{
            $scope.dataList.forEach((item,index)=>{
                if(item.opinion_id==opinionId){
                    $scope.dataList.splice(index,1)
                }
            })
        })
    };

    $scope.recovery=(opinionId)=>{
        if(!confirm('确定恢复该条直播!')) return;
        liveApiService.recoveryOpinion(opinionId).then(()=>{
            location.reload();
        })
    }
}