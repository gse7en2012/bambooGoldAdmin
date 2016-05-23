/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('DiscussAddCtrl', ['$scope', '$cookieStore', 'liveApiService', DiscussAddCtrl]);

function DiscussAddCtrl($scope, $cookieStore, liveApiService) {


    $scope.channelList = [
        {channel_id: 1, name: '直播'},
        {channel_id: 2, name: '交流'},
        {channel_id: 3, name: '问答'}
    ];

    $scope.allowSeeLvList = [
        {allow_see_lv: 1, name: '普通'},
        {allow_see_lv: 2, name: '会员'},
        {allow_see_lv: 4, name: 'VIP'},
        {allow_see_lv: 8, name: 'VVIP'}
    ];

    $scope.channelId = $scope.channelList[0].channel_id;
    $scope.allowSeeLv = $scope.allowSeeLvList[0].allow_see_lv;

    liveApiService.getVerifyUser().then((data)=> {
        $scope.verifyUserList = data.result;
        $scope.uid= $scope.verifyUserList[0].uid;
    });


    $scope.add = ()=> {
        liveApiService.addLiveOpinion({
            content: $scope.content,
            title: $scope.title,
            channel_id: 2,
            uid: $scope.uid,
            allow_see_lv: $scope.allowSeeLv
        }).then(()=> {
            alert('发布成功!');
            location.reload();
        })
    }
}