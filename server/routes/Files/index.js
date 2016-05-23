/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express    = require('express');
const filesRouter = new express.Router();
const api        = require('../../api');

filesRouter.get('/list', api.FilesApi.getFilesListIF);


filesRouter.post('/ban', api.LiveApi.deleteLiveOpinionIF);

filesRouter.post('/add', api.LiveApi.addLiveOpinionIF);

filesRouter.post('/recovery', api.LiveApi.recoveryLiveOpinionIF);

module.exports = filesRouter;