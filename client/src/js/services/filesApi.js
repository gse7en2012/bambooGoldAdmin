/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').service('filesApiService', ['$http', '$q', function ($http, $q) {

    function httpRequest(opts) {
        var d = $q.defer();
        $http(opts).success(d.resolve).error(d.reject);
        return d.promise;
    }


    this.getFilesList = (page)=> {
        var url = `/files/list?page=${page}`;
        return httpRequest({
            method: 'GET',
            url: url
        });
    };

    this.deleteOpinion      = (newsId)=>httpRequest({method: 'POST', url: `/live/ban`, data: {opinion_id: newsId}});
    this.recoveryOpinion    = (newsId)=>httpRequest({
        method: 'POST',
        url: `/live/recovery`,
        data: {opinion_id: newsId}
    });

    this.addLiveOpinion = (op)=>httpRequest({method: 'POST', url: `/live/add`, data: op});

    this.getVerifyUser = ()=>httpRequest({method: 'GET', url: `/users/verify`});

}]);