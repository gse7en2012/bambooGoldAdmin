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


    $scope.delete = (did)=> {
        if (!confirm('确定删除该文件!')) return;
        filesApiService.deleteFiles(did).then(()=> {
            $scope.dataList.forEach((item, index)=> {
                if (item.did == did) {
                    item.status = 0;
                }
            })
        })
    };

    $scope.recovery = (did)=> {
        if (!confirm('确定删除该文件!')) return;
        filesApiService.recoveryFiles(did).then(()=> {
            $scope.dataList.forEach((item, index)=> {
                if (item.did == did) {
                    item.status = 1;
                }
            })
        })
    }
}