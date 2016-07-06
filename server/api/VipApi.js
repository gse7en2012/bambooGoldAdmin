/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');

const VipApi = {
    addVipIF(req, res){

        const uids = req.body.uids;
        const level = req.body.level;
        const last = req.body.last;
        const lastDay = req.body.last_day;
        return Controller.Vip.addVip(uids, level,last,lastDay).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    }



};

module.exports = VipApi;