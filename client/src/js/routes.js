'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/live');

        // Application routes
        $stateProvider
            .state('admin', {
                url: '/',
                templateUrl: 'templates/live/liveOpinionList.html'
            })
            .state('news', {
                url: '/news',
                templateUrl: 'templates/news/newsList.html'
            })
            .state('newsAdd', {
                url: '/news/add',
                templateUrl: 'templates/news/newsAdd.html'
            })
            .state('newsEdit', {
                url: '/news/edit/:news_id',
                templateUrl: 'templates/news/newsEdit.html'
            })
            .state('newsact', {
                url: '/news_act',
                templateUrl: 'templates/news_act/newsList.html'
            })
            .state('newsactAdd', {
                url: '/news_act/add',
                templateUrl: 'templates/news_act/newsAdd.html'
            })
            .state('newsactEdit', {
                url: '/news_act/edit/:news_id',
                templateUrl: 'templates/news_act/newsEdit.html'
            })
            .state('strategy', {
                url: '/strategy',
                templateUrl: 'templates/strategy/strategyList.html'
            })
            .state('strategyAdd', {
                url: '/strategy/add',
                templateUrl: 'templates/strategy/strategyAdd.html'
            })
            .state('strategyEdit', {
                url: '/strategy/edit/:strategy_id',
                templateUrl: 'templates/strategy/strategyEdit.html'
            })
            .state('activity', {
                url: '/activity',
                templateUrl: 'templates/activity/activityList.html'
            })
            .state('activityAdd', {
                url: '/activity/add',
                templateUrl: 'templates/activity/activityAdd.html'
            })
            .state('activityEdit', {
                url: '/activity/edit/:act_id',
                templateUrl: 'templates/activity/activityEdit.html'
            })
            .state('link', {
                url: '/links',
                templateUrl: 'templates/links/linkList.html'
            })
            .state('linkEdit', {
                url: '/links/edit/:link_id',
                templateUrl: 'templates/links/linkEdit.html'
            })
            .state('linkAdd', {
                url: '/links/add',
                templateUrl: 'templates/links/linkAdd.html'
            })

            .state('user', {
                url: '/user',
                templateUrl: 'templates/user/usersList.html'
            })
            .state('userEdit', {
                url: '/user/edit/:uid',
                templateUrl: 'templates/user/usersEdit.html'
            })
            .state('userAdd', {
                url: '/user/add',
                templateUrl: 'templates/user/usersAdd.html'
            })
            .state('live', {
                url: '/live',
                templateUrl: 'templates/live/liveOpinionList.html'
            })
            .state('liveAdd', {
                url: '/live/add',
                templateUrl: 'templates/live/liveOpinionAdd.html'
            })
            .state('discuss', {
                url: '/discuss',
                templateUrl: 'templates/discuss/discussOpinionList.html'
            })
            .state('discussAdd', {
                url: '/discuss/add',
                templateUrl: 'templates/discuss/discussOpinionAdd.html'
            })
            .state('files', {
                url: '/files',
                templateUrl: 'templates/files/filesList.html'
            })
            .state('filesAdd', {
                url: '/files/add',
                templateUrl: 'templates/files/filesAdd.html'
            })
            .state('questions', {
                url: '/questions',
                templateUrl: 'templates/questions/questionsOpinionList.html'
            })
            .state('questionsDetails', {
                url: '/questions/:id?view',
                templateUrl: 'templates/questions/questionsOpinionReply.html'
            })
            .state('messagePush', {
                url: '/message',
                templateUrl: 'templates/message/messageAdd.html'
            })
            .state('vipAdd', {
                url: '/vip',
                templateUrl: 'templates/vips/vipAdd.html'
            });
    }
]);