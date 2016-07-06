/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express    = require('express');
const liveRouter = new express.Router();
const api        = require('../../api');

liveRouter.get('/list', api.LiveApi.getLiveListIF);

liveRouter.get('/search/stock',api.LiveApi.searchStockIF);

liveRouter.post('/ban', api.LiveApi.deleteLiveOpinionIF);

liveRouter.post('/add', api.LiveApi.addLiveOpinionIF);

liveRouter.post('/recovery', api.LiveApi.recoveryLiveOpinionIF);

module.exports = liveRouter;