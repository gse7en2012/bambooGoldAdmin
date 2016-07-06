/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express    = require('express');
const messageRouter = new express.Router();
const api        = require('../../api');

messageRouter.get('/list', api.LiveApi.getLiveListIF);

messageRouter.get('/search/stock',api.LiveApi.searchStockIF);

messageRouter.post('/ban', api.LiveApi.deleteLiveOpinionIF);

messageRouter.post('/push', api.MessageApi.pushMessageIF);

messageRouter.post('/recovery', api.LiveApi.recoveryLiveOpinionIF);

module.exports = messageRouter;