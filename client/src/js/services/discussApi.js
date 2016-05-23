/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').service('discussApiService', ['$http', '$q', function ($http, $q) {

    function httpRequest(opts) {
        var d = $q.defer();
        $http(opts).success(d.resolve).error(d.reject);
        return d.promise;
    }


    this.getLiveOpinionList = (page, bid)=> {
        var url = `/discuss/list?page=${page}`;
        if (bid) url += '&bid=' + bid;
        return httpRequest({
            method: 'GET',
            url: url
        });
    };
    this.deleteOpinion      = (newsId)=>httpRequest({method: 'POST', url: `/discuss/ban`, data: {opinion_id: newsId}});
    this.recoveryOpinion    = (newsId)=>httpRequest({
        method: 'POST',
        url: `/discuss/recovery`,
        data: {opinion_id: newsId}
    });



}]);