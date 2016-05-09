/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('LiveAddCtrl', ['$scope', '$cookieStore', 'liveApiService', LiveAddCtrl]);

function LiveAddCtrl($scope, $cookieStore, liveApiService) {

    $scope.channelList=[
        {channel_id:1,name:'直播'},
        {channel_id:2,name:'交流'},
        {channel_id:3,name:'问答'}
    ];

    $scope.add = ()=> {
        if(!$scope.channelId) return alert('请选择栏目');
        liveApiService.addLiveOpinion({
            content: $scope.content,
            title: $scope.title,
            channel_id: $scope.channelId
        }).then(()=> {
            alert('发布成功!');
            location.reload();
        })
    }
}