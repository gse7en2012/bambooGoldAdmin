/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';

const express = require('express');
const usersRouter  = new express.Router();
const api     = require('../../api');


usersRouter.get('/list',api.UsersApi.getUsersListIF);



module.exports=usersRouter;