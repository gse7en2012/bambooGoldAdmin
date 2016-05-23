/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express    = require('express');
const discussRouter = new express.Router();
const api        = require('../../api');

discussRouter.get('/list', api.DiscussApi.getLiveListIF);

discussRouter.post('/ban', api.DiscussApi.deleteLiveOpinionIF);

discussRouter.post('/add', api.DiscussApi.addLiveOpinionIF);

discussRouter.post('/recovery', api.DiscussApi.recoveryLiveOpinionIF);

module.exports = discussRouter;