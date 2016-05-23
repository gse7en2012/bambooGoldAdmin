/**
 * Created by zhuzhipeng on 16/3/12.
 */

'use strict';

const moment        = require('moment');
const DataBaseModel = require('../../model');
const _             = require('underscore');


const $liveSelfHelpers = {
    getLiveOpinionDetails(item){
        const r = {
            allow_see_lv: item.allow_see_lv,
            content: item.content,
            is_important: 0,
            pic_urls: [],
            time: moment(item.createdAt).utc().format('YYYY-MM-DD HH:mm:ss'),
            timeline_id: item.opinion_id,
            bid: item.channel_id,
            status: item.status,
            writer: {
                nickname: item.user.nickname,
                picture: item.user.picture,
                uid: item.user.uid,
                verify: item.user.verify
            }
        };
        if (r.retweeted) {
            return DataBaseModel.LiveOpinion.find({
                where: {opinion_id: item.retweeted},
                attributes: ['content', 'pic_urls', 'opinion_id'],
                include: [{
                    model: DataBaseModel.Users,
                    attributes: ['nickname', 'picture', 'uid', 'verify']
                    //required: true,
                    //where: {type: Number(type) - 3}
                }]
            }).then((opinion)=> {
                r.quote_viewpoint = {
                    content: opinion.content,
                    pic_urls: opinion.pic_urls,
                    timeline_id: opinion.opinion_id,
                    writer: {
                        nickname: opinion.user.nickname,
                        uid: opinion.user.uid
                    }
                };
                return r;
            });
        }
        return r;
    }
};


const FilesController = {
    getFilesList(page){
        page = page || 1;
        //搜索索引，type=1传,prev_index内容；type=2，传传next_index内容
        const pageSize = 30;
        let totalCount = 0;
        const vipList  = ['普通', '会员', 'VIP', 'VVIP']
        const query    = {
            include: [{
                model: DataBaseModel.Users,
                attributes: ['nickname', 'picture', 'uid', 'verify']
            }],
            order: 'did DESC',
            limit: pageSize,
            offset: (page - 1) * pageSize,
        };
        return DataBaseModel.LiveFiles.findAndCountAll(query).then((result)=> {
            const list = result.rows;
            totalCount = result.count;
            list.forEach((item)=> {
                item.dataValues.time = moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss');
                item.allow_see_lv    = vipList[item.allow_see_lv - 1];
            });
            return list;
        }).then((opinionList)=> {
            return {
                totalCount: totalCount,
                dataList: opinionList,
                curPage: page
            };
        });
    },
    addLiveOpinion(opts){
        let DbInstance = DataBaseModel.LiveOpinion;
        if (opts.channel_id == 2) {
            DbInstance = DataBaseModel.LiveDiscuss;
        }
        return DbInstance.create({
            uid: opts.uid,
            symbols: opts.symbols,
            content: opts.content,
            type: 1,
            status: 1,
            pictures: opts.picture,
            title: opts.title,
            channel_id: opts.channel_id,
            allow_see_lv: opts.allow_see_lv
        });
    },
    banLiveOpinion(opId){
        return DataBaseModel.LiveOpinion.find({
            where: {opinion_id: opId}
        }).then((op)=> {
            op.status = 0;
            return op.save();
        })
    },
    recoveryLiveOpinion(opId){
        return DataBaseModel.LiveOpinion.find({
            where: {opinion_id: opId}
        }).then((op)=> {
            op.status = 1;
            return op.save();
        })
    }
};

//LiveOpinionController.addLiveOpinion({
//    uid:1,
//    content:'第二条!后台发送的直播内容$沈阳机床(SZ000410)$!',
//    title:'这是标题!',
//    channel_id:1
//});
//LiveOpinionController.banLiveOpinion(2);

module.exports = FilesController;