/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');

const LiveApi = {
    getFilesListIF(req, res){
        const page = req.query.page;
        return Controller.Files.getFilesList(page).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },

    getFilesQiniuTokenIF(req,res){
        return Controller.Qiniu.getSocialToken().then(
            r=>{
                res.json({uptoken:r})
            },
            e=>Helpers.resFailure(res, e)
        )
    },

    addFilesIF(req,res){
        const opts={
            uid: req.body.uid,
            intro: req.body.intro,
            title: req.body.title,
            doc_icon:req.body.doc_icon,
            url: req.body.url,
            allow_see_lv: req.body.allow_see_lv
        };
        return Controller.Files.addFiles(opts).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },

    deleteFilesIF(req, res){
        const opId = req.body.did;
        return Controller.Files.banFiles(opId).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },

    recoveryFilesIF(req, res){
        const opId = req.body.did;
        return Controller.Files.recoveryFiles(opId).then(
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
        return Controller.Live.addLiveOpinion(opinion).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    }

};

module.exports = LiveApi;