/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const DataBaseModel = require('../../model');
const Config        = require('../../config');
const _             = require('underscore');
const cryptoUtils   = require('popularcrypto');
const globalHelpers = require('../../helpers');
const moment        = require('moment');

const UsersController = {

    getUserList(page, query){
        const pageSize = 50;
        const dPage    = page < 1 ? 1 : Number(page);
        const search   = {
            offset: (dPage - 1) * pageSize,
            limit: pageSize,
            order: 'uid DESC'
        };
        if (query) search.where = query;
        return DataBaseModel.Users.findAll(search).then((users)=> {
            users.forEach((item)=> {
                item.dataValues.login_time = moment(item.dataValues.login_time).format('YYYY-MM-DD HH:mm:ss');
                item.dataValues.createdAt  = moment(item.dataValues.createdAt).format('YYYY-MM-DD HH:mm:ss');
                item.dataValues.age        = (moment().diff(moment(item.dataValues.createdAt), 'hour') / 24 / 30).toFixed(2);
                delete item.dataValues.pass;
                delete item.dataValues.updatedAt;
            });
            return users;
        })
    },


    banUser(uid, type){
        return DataBaseModel.Users.find({
            where: {uid: uid}
        }).then((user)=> {
            if (user) {
                user.status = type || 1;
                //todo: 删除所有社区发言
                user.save();
            }
            return type;
        })
    }
};

module.exports = UsersController;
//UsersController.getUserList(1).then((r)=> {console.log(JSON.stringify(r));})
//AuthController.generateAdminUser('gseven2').then((r)=>{console.log(r);});
//AuthController.loginAdminUser('gseven2', 'O7I3CwuL').then((r)=> {console.log(r);});