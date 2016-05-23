/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');

const QuestionsApi = {
    getQuestionsListIF(req, res){
        const page = req.query.page;
        const quality  = req.query.quality;
        return Controller.Questions.getQuestionsList(page, quality).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },

    getQuestionsDetailsIF(req, res){
        const id = req.query.id;
        return Controller.Questions.getQuestionsDetails(id).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },

    getQuestionsViewIF(req, res){
        const id = req.query.id;
        return Controller.Questions.getQuestionsDetailsView(id).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },



    replyQuestionIF(req,res){
        const opts = {
            uid: req.body.uid,
            content: req.body.content,
            opinion_id: req.body.opinion_id,
            reply_to_uid:req.body.reply_to_uid
        };
        return Controller.Questions.replyQuestion(opts).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },


};

module.exports = QuestionsApi;