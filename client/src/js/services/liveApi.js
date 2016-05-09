/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').service('liveApiService', ['$http', '$q', function ($http, $q) {

    function httpRequest(opts) {
        var d = $q.defer();
        $http(opts).success(d.resolve).error(d.reject);
        return d.promise;
    }


    this.getLiveOpinionList = (page,bid)=> {
        var url=`/live/list?page=${page}`;
        if(bid) url+='&bid='+bid;
        return httpRequest({
            method: 'GET',
            url: url
        });
    };
    this.deleteOpinion= (newsId)=>httpRequest({method: 'POST', url: `/live/delete`, data: {opinion_id:newsId}});
    this.recoveryOpinion= (newsId)=>httpRequest({method: 'POST', url: `/live/recovery`, data: {opinion_id:newsId}});

    this.addLiveOpinion = (op)=>httpRequest({method: 'POST', url: `/live/add`, data: op});

}]);