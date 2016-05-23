/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').service('questionsApiService', ['$http', '$q', function ($http, $q) {

    function httpRequest(opts) {
        var d = $q.defer();
        $http(opts).success(d.resolve).error(d.reject);
        return d.promise;
    }


    this.getQuestionsOpinionList = (page, status)=> {
        var url = `/questions/list?page=${page}`;
        if (status && status != -1) url += '&quality=' + status;
        return httpRequest({
            method: 'GET',
            url: url
        });
    };

    this.getQuestionsOpinionDetails = (id)=> {
        var url = `/questions/details?id=${id}`;
        return httpRequest({method: 'GET', url: url});
    };

    this.getQuestionsOpinionDetailsView=(id)=>{
        var url = `/questions/view?id=${id}`;
        return httpRequest({method: 'GET', url: url});
    };

    this.deleteOpinion   = (newsId)=>httpRequest({
        method: 'POST',
        url: `/live/ban`,
        data: {opinion_id: newsId}
    });
    this.recoveryOpinion = (newsId)=>httpRequest({
        method: 'POST',
        url: `/live/recovery`,
        data: {opinion_id: newsId}
    });

    this.replyQuestion = (op)=>httpRequest({method: 'POST', url: `/questions/reply`, data: op});

    this.getVerifyUser = ()=>httpRequest({method: 'GET', url: `/users/verify`});

}]);