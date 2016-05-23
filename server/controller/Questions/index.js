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
            quality: item.quality,
            status: item.status,
            writer: {
                nickname: item.user.nickname,
                picture: item.user.picture,
                uid: item.user.uid,
                verify: item.user.verify
            }
        };
        return r;
    }
};


const QuestionsOpinionController = {
    getQuestionsList(page, quality){
        page           = page || 1;
        const pageSize = 30;
        let totalCount = 0;
        const query    = {
            include: [{
                model: DataBaseModel.Users,
                attributes: ['nickname', 'picture', 'uid', 'verify']
            }],
            order: 'opinion_id DESC',
            limit: pageSize,
            offset: (page - 1) * pageSize,
            where: {retweeted: null}
        };

        if (quality) query.where.quality = quality;
        return DataBaseModel.LiveQuestions.findAndCountAll(query).then((result)=> {
            const promiseArr = [];
            const list       = result.rows;
            totalCount       = result.count;
            list.forEach((item)=> {
                promiseArr.push($liveSelfHelpers.getLiveOpinionDetails(item));
            });
            return Promise.all(promiseArr);
        }).then((opinionList)=> {
            return {
                totalCount: totalCount,
                dataList: opinionList,
                curPage: page
            };
        });
    },

    getQuestionsDetails(id){
        return DataBaseModel.LiveQuestions.find({
            include: [{
                model: DataBaseModel.Users,
                attributes: ['nickname', 'uid']
            }],
            where: {opinion_id: id},
            attributes: ['content', 'createdAt']
        }).then((r)=> {
            return {
                nickname: r.user.nickname,
                uid: r.user.uid,
                content: r.content,
                time: moment(r.createdAt).format('YYYY-MM-DD HH:mm:ss')
            }
        })
    },

    getQuestionsDetailsView(id){
        return DataBaseModel.LiveQuestions.find({
            where: {retweeted: id},
            attributes: ['content', 'createdAt','uid']
        }).then((r)=> {
            return {
                content: r.content,
                uid:r.uid
            }
        })
    },

    replyQuestion(opts){
        const replyQuestion = DataBaseModel.LiveQuestions.build({
            uid: opts.uid,
            channel_id: 3,
            content: opts.content,
            retweeted: opts.opinion_id,
            reply_to_uid: opts.reply_to_uid
        });
        return replyQuestion.save().then(()=> {
            return DataBaseModel.LiveQuestions.update({quality: 1}, {where: {opinion_id: opts.opinion_id}});
        })
    }
};

//QuestionsOpinionController.getQuestionsDetails(3).then(r=>{
//    console.log(r);
//});

module.exports = QuestionsOpinionController;