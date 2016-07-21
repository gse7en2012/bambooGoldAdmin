/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const moment        = require('moment');
const DataBaseModel = require('../../model');
const _             = require('underscore');
const request       = require('request');

function requestPromise(opts) {
    return new Promise((resolve, reject)=> {
        request(opts, (err, res, body)=> {
            if (err) return reject(err);
            return resolve(body);
        });
    });
}


const MessageController = {
    getNotify(page) {
        page = page || 1;
        //搜索索引，type=1传,prev_index内容；type=2，传传next_index内容
        const pageSize = 30;
        const query    = {
            order: 'mid DESC',
            limit: pageSize,
            offset: (page - 1) * pageSize
        };
        return DataBaseModel.Notify.findAndCountAll(query).then((result)=> {
            const totalCount = result.count;
            const notifyList = result.rows;
            const data       = notifyList.map((item)=> {
                return {
                    message_details: item.details,
                    message_id: Number(2 + '' + item.mid),
                    message_title: item.title,
                    message_level: item.vip_level,
                    message_status: item.status,
                    createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                    updatedAt: moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss')
                };
            });
            return {
                totalCount: totalCount,
                dataList: data,
                curPage: page
            }
        });
    },
    pushMessage(title, message, type, extras, vipLevel){
        let audience    = 'all';
        let toClientMsg = message;
        if (vipLevel && vipLevel > 1) {
            audience = {
                tag_and: ['lvl' + vipLevel]
            };
        }

        if (Array.isArray(type) && type.length > 0) {
            audience = {
                alias: type
            };
        }
        if (message.length > 35) {
            toClientMsg = message.slice(0, 35) + '...';
        }
        const appKey       = 'dc1c940557df133124cd23b1';
        const masterSecret = '4ba2f61a879ffb363c23afc5';
        const token        = new Buffer(appKey + ':' + masterSecret).toString('base64'),
              jpushApi     = 'https://api.jpush.cn/v3/push',
              pushContent  = {
                  platform: "all",
                  audience: audience,
                  notification: {
                      "ios": {
                          "alert": toClientMsg,
                          "title": title,
                          "sound": "happy",
                          "badge": 1,
                          // "extras": {"type": "iGame"}
                      },
                      "android": {
                          "alert": toClientMsg,
                          "title": title,
                          "builder_id": 0,
                          //"extras": {"type": "iGame"}
                      }
                  },
                  options: {
                      "apns_production": false
                  }
              };
        if (extras) {
            pushContent.notification.ios.extras     = Object.assign(pushContent.notification.ios.extras, extras);
            pushContent.notification.android.extras = Object.assign(pushContent.notification.android.extras, extras);
        }
        console.log(JSON.stringify(pushContent));
        return requestPromise({
            url: jpushApi,
            method: 'POST',
            headers: {Authorization: 'Basic ' + token},
            body: JSON.stringify(pushContent)
        }).then(r=> {
            console.log(r);
            //console.log('push Success', r, JSON.stringify(pushContent));
            if (!(Array.isArray(type) && type.length > 0)) {
                DataBaseModel.Notify.create({
                    details: message,
                    title: title,
                    status: 1,
                    vip_level: vipLevel
                });
            } else {
                const dbData = type.map((item)=> {
                    return {
                        details: message,
                        title: title,
                        status: 1,
                        uid: item
                    }
                });
                DataBaseModel.Message.bulkCreate(dbData);
            }
            return r;
        }).catch(e=>e);
    }
};

//LiveOpinionController.addLiveOpinion({
//    uid:1,
//    content:'第二条!后台发送的直播内容$沈阳机床(SZ000410)$!',
//    title:'这是标题!',
//    channel_id:1
//});
//LiveOpinionController.banLiveOpinion(2);
//MessageController.pushMessage('劲爆消息', '哈哈啊哈哈哈', [1,2,3], null, null).then((r)=> {console.log(r);});
module.exports = MessageController;