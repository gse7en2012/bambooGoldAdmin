/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');

const LiveApi = {
    getLiveListIF(req, res){
        const page = req.query.page;
        const bid  = req.query.bid;
        return Controller.Live.getLiveOpinionList(page, bid).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },

    deleteLiveOpinionIF(req, res){
        const opId = req.body.opinion_id;
        return Controller.Live.banLiveOpinion(opId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },

    recoveryLiveOpinionIF(req, res){
        const opId = req.body.opinion_id;
        return Controller.Live.recoveryLiveOpinion(opId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },


    addLiveOpinionIF(req, res){
        const opinion = {
            uid: req.adminUid,
            content: req.body.content,
            title: req.body.title,
            channel_id: req.body.channel_id
        };
        return Controller.Live.addLiveOpinion(opinion).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    }

};

module.exports = LiveApi;