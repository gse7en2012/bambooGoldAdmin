/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express    = require('express');
const filesRouter = new express.Router();
const api        = require('../../api');

filesRouter.get('/list', api.FilesApi.getFilesListIF);

filesRouter.get('/token',api.FilesApi.getFilesQiniuTokenIF);

filesRouter.post('/ban', api.FilesApi.deleteFilesIF);

filesRouter.post('/add', api.FilesApi.addFilesIF);

filesRouter.post('/recovery', api.FilesApi.recoveryFilesIF);

module.exports = filesRouter;