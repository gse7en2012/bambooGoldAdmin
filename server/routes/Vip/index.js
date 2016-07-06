/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express    = require('express');
const vipRouter = new express.Router();
const api        = require('../../api');



vipRouter.post('/add', api.VipApi.addVipIF);


module.exports = vipRouter;