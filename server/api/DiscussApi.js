/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');

const DiscussApi = {
    getLiveListIF(req, res){
        const page = req.query.page;
        const level=req.query.level;
        return Controller.Discuss.getLiveOpinionList(page,level).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },

    deleteLiveOpinionIF(req, res){
        const opId = req.body.opinion_id;
        return Controller.Discuss.banLiveOpinion(opId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },

    recoveryLiveOpinionIF(req, res){
        const opId = req.body.opinion_id;
        return Controller.Discuss.recoveryLiveOpinion(opId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },


    addLiveOpinionIF(req, res){
        const opinion = {
            uid: req.body.uid||req.adminUid,
            content: req.body.content,
            title: req.body.title,
            channel_id: req.body.channel_id,
            allow_see_lv:req.body.allow_see_lv
        };
        return Controller.Discuss.addLiveOpinion(opinion).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    }

};

module.exports = DiscussApi;