/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');

const MessageApi = {
    pushMessageIF(req, res){
        //title, message, type, extras, vipLevel
        const title = req.body.title;
        const message = req.body.message;
        const type = req.body.type;
        const extras = req.body.extras;
        const vipLevel  = req.body.vipLevel;
        return Controller.Message.pushMessage(title, message,type,extras,vipLevel).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    }



};

module.exports = MessageApi;