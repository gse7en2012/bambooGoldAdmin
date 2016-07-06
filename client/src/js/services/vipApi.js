/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').service('vipApiService', ['$http', '$q', function ($http, $q) {

    function httpRequest(opts) {
        var d = $q.defer();
        $http(opts).success(d.resolve).error(d.reject);
        return d.promise;
    }





    this.addVip = (op)=>httpRequest({method: 'POST', url: `/vip/add`, data: op});

    this.searchUsers = (q)=>httpRequest({method: 'GET', url: `/users/search?query=${q}`});

}]);