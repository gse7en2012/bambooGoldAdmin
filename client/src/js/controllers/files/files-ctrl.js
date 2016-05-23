/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';


angular.module('RDash').controller('FilesCtrl', ['$scope', '$cookieStore', 'filesApiService', FilesCtrl]);

function FilesCtrl($scope, $cookieStore, filesApiService) {



    function bindData2Scope(data) {
        $scope.dataList    = data.result.dataList;
        $scope.totalCount  = data.result.totalCount;
        $scope.currentPage = data.result.curPage;
    }

    filesApiService.getFilesList(1).then(bindData2Scope);


    $scope.delete = (timelineId)=> {
        if (!confirm('确定删除该条直播!')) return;
        liveApiService.deleteOpinion(timelineId).then(()=> {
            $scope.dataList.forEach((item, index)=> {
                if (item.timeline_id == timelineId) {
                    item.status = 0;
                }
            })
        })
    };

    $scope.recovery = (timelineId)=> {
        if (!confirm('确定恢复该条直播!')) return;
        liveApiService.recoveryOpinion(timelineId).then(()=> {
            $scope.dataList.forEach((item, index)=> {
                if (item.timeline_id == timelineId) {
                    item.status = 1;
                }
            })
        })
    }
}