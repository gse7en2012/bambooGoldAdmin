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

    this.addFiles = (op)=>httpRequest({method: 'POST', url: `/files/add`, data: op});

    this.deleteFiles      = (did)=>httpRequest({method: 'POST', url: `/files/ban`, data: {did: did}});
    this.recoveryFiles    = (did)=>httpRequest({
        method: 'POST',
        url: `/files/recovery`,
        data: {did: did}
    });



    this.getVerifyUser = ()=>httpRequest({method: 'GET', url: `/users/verify`});

}]);