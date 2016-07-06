/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').service('messageApiService', ['$http', '$q', function ($http, $q) {

    function httpRequest(opts) {
        var d = $q.defer();
        $http(opts).success(d.resolve).error(d.reject);
        return d.promise;
    }


    this.getLiveOpinionList = (page, bid)=> {
        var url = `/live/list?page=${page}`;
        if (bid) url += '&bid=' + bid;
        return httpRequest({
            method: 'GET',
            url: url
        });
    };




    this.pushMessage = (op)=>httpRequest({method: 'POST', url: `/message/push`, data: op});

    this.searchUsers = (q)=>httpRequest({method: 'GET', url: `/users/search?query=${q}`});

}]);