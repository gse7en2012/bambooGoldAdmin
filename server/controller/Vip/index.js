/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const moment        = require('moment');
const DataBaseModel = require('../../model');



const VipController = {
    addVip(uids, level, last, lastMonth){
        if (!Array.isArray(uids)) {
            return Promise.reject('uid错误')
        }

        function getNewVipExpires(type, day) {
            const initDate    = day ? moment(day) : moment();
            const lastDayHash = {
                m: initDate.add(1, 'month').format('YYYY-MM-DD'),
                s: initDate.add(3, 'month').format('YYYY-MM-DD'),
                y: initDate.add(1, 'year').format('YYYY-MM-DD'),
                d: initDate.add(15, 'day').format('YYYY-MM-DD'),
                c: initDate.add(lastMonth, 'month').format('YYYY-MM-DD')
            };
            return lastDayHash[type];
        }

        function upgradeVip(user) {
            user.vip_expires = getNewVipExpires(last, user.vip_expires);
            user.vip_level   = level;
            return user.save().then((u)=>{
                return {
                    name:u.nickname,
                    vip_expires:u.vip_expires,
                    vip_level:u.vip_level
                }
            });
        }

        return DataBaseModel.Users.findAll({
            where: {uid: {$in: uids}}
        }).then((r)=> {
            return Promise.all(r.map((item)=>upgradeVip(item)));
        })

    }
};


module.exports = VipController;