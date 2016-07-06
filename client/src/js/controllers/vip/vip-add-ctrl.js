/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('VipAddCtrl', ['$scope', '$cookieStore', 'vipApiService', VipAddCtrl]);

function VipAddCtrl($scope, $cookieStore, vipApiService) {
    $scope.sourceLink = 'http://www.placehold.it/180X180/DDDDDD/AAAAAA';



    $scope.allowSeeLvList={
        4:'VIP',
        8:'SVIP'
    }

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

    $scope.$watch('search', function () {
        if ($scope.search == 1) {
            $scope.uids = [];
        }
        if ($scope.search == 0) {
            if ($scope.uids) {
                var tmp = [];
                $scope.uids.forEach(function (item) {
                    if (typeof item == 'object') {
                        tmp.push(item.uid)
                    } else {
                        tmp.push(item)
                    }
                });
                $scope.uids = tmp;
            } else {
                $scope.uids = [];
            }
        }
    });

    $scope.searchUser = function (query) {
        return vipApiService.searchUsers(query).then((data)=> {
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


    $scope.upgrade = ()=> {
        $scope.type = [];
        if(!Array.isArray($scope.uids)){
            $scope.uids=$scope.uids.split(',');
        }
        $scope.uids.forEach(function (item) {
            if (typeof item == 'object') {
                $scope.type.push(item.uid)
            } else {
                $scope.type.push(item)
            }
        });

        vipApiService.addVip({
            uids: $scope.type,
            level: $scope.vipLevel,
            last: $scope.last,
            last_day: $scope.lastDay
        }).then((data)=> {
            alert('升级成功!');
            $scope.isSuccess=true;
            $scope.re=data.result;
            $scope.re.forEach(function(item){
                item.vip_level=$scope.allowSeeLvList[item.vip_level]
            });
            $scope.uids=[];
            //location.reload();
        })
    }


}