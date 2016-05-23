/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const Controller = require('../controller');
const Helpers    = require('../helpers');


const UsersApi = {
    getUsersListIF(req,res){
        const page=req.query.page||1;
        const query=req.query.query;
        return Controller.Users.getUserList(page,query).then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    },
    getVerifyUserIF(req,res){
        return Controller.Users.getVerifyUser().then(
            r=>Helpers.resSuccess(res, r),
            e=>Helpers.resFailure(res, e)
        )
    }
};

module.exports = UsersApi;

