/**
 * Created by zhuzhipeng on 16/3/12.
 */
const express    = require('express');
const questionRouter = new express.Router();
const api        = require('../../api');

questionRouter.get('/list', api.QuestionsApi.getQuestionsListIF);

questionRouter.get('/view', api.QuestionsApi.getQuestionsViewIF);

questionRouter.get('/details', api.QuestionsApi.getQuestionsDetailsIF);

questionRouter.post('/reply', api.QuestionsApi.replyQuestionIF);



module.exports = questionRouter;