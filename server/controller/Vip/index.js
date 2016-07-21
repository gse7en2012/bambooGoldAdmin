/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const moment            = require('moment');
const DataBaseModel     = require('../../model');
const MessageController = require('../Message');


const VipController = {
    addVip(uids, level, last, lastMonth){
        if (!Array.isArray(uids)) {
            return Promise.reject('uid错误')
        }

        const pushHash = {
            m: '1个月',
            s: '1个季度',
            y: '1年',
            d: '15天试用VIP',
            c: lastMonth + '个月'
        };
        const vipHash  = {
            4: 'VIP',
            8: 'SVIP'
        };


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
            return user.save().then((u)=> {
                return {
                    name: u.nickname,
                    vip_expires: u.vip_expires,
                    vip_level: u.vip_level
                }
            });
        }

        return DataBaseModel.Users.findAll({
            where: {uid: {$in: uids}}
        }).then((r)=> {
            return Promise.all(r.map((item)=>upgradeVip(item))).then((list)=> {
                MessageController.pushMessage('VIP服务升级通知', '恭喜，你' + pushHash[last] + '的' + vipHash[level] + '服务已经开通。', uids);
                return list;
            });
        })

    }
};

module.exports = VipController;