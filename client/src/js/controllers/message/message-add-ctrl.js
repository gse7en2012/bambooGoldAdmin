/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('MessageAddCtrl', ['$scope', '$cookieStore', 'messageApiService', MessageAddCtrl]);

function MessageAddCtrl($scope, $cookieStore, messageApiService) {
    $scope.sourceLink = 'http://www.placehold.it/180X180/DDDDDD/AAAAAA';


    $scope.allowSeeLvList = [
        {allow_see_lv: 1, name: '全体'},
        {allow_see_lv: 2, name: '会员'},
        {allow_see_lv: 4, name: 'VIP'},
        {allow_see_lv: 8, name: 'SVIP'}
    ];

    $scope.cate = 1;

    $scope.allowSeeLv = $scope.allowSeeLvList[0].allow_see_lv;

    //$scope.$watch('cate', function () {
    //    if ($scope.uids) {
    //        $scope.type = $scope.uids.split(',').map((item)=> {
    //            if (item && !isNaN(parseInt(item, 10)))
    //                return parseInt(item, 10)
    //        });
    //        console.log($scope.type);
    //    }
    //
    //});
    //$scope.$watch('uids', function () {
    //    if ($scope.uids) {
    //        $scope.type = $scope.uids.split(',').map((item)=> {
    //            if (item && !isNaN(parseInt(item, 10)))
    //                return parseInt(item, 10)
    //        });
    //        console.log($scope.type);
    //    }
    //});

    $scope.$watch('search',function(){
        if($scope.search==0){
            if($scope.uids&&$scope.uids.length>0){
                $scope.uids=$scope.uids.map((item)=>{
                    return item.uid
                })
            }
        }
        if($scope.search==1){
            $scope.uids=null;
        }
    });

    $scope.searchUser = function (query) {
        return messageApiService.searchUsers(query).then((data)=> {
            if (data.result.length > 0) {
                const re = [];
                data.result.forEach((item)=> {
                    re.push({
                        uid: item.uid,
                        name: item.nickname,
                        v: item.uid + '-' + item.nickname
                    })
                });
                return re;
            } else {
                return {v: query};
            }
        })
    };


    $scope.push = ()=> {
        if($scope.cate == 1) {
            $scope.type = [];
            $scope.uids.forEach(function (item) {
                if (typeof item == 'object') {
                    $scope.type.push(item.uid)
                } else {
                    $scope.type.push(item)
                }
            });
        }
        messageApiService.pushMessage({
            title: $scope.title,
            message: $scope.message,
            type: $scope.cate == 1 ? $scope.type : null,
            vipLevel: $scope.cate == 2 ? $scope.allowSeeLv : null
        }).then(()=> {
            alert('发布成功!');
            //location.reload();
        })
    }


}