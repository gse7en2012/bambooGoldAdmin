'use strict';

module.exports = function (sequelize, DataType) {
    return sequelize.define('live_opinion', {
            opinion_id: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true, comment: ''},
            uid: {type: DataType.INTEGER, allowNull: false},
            content: {type: DataType.STRING, charset: 'utf8mb4'},
            // create_time:{type:DataType.DATE},
            like_count: {type: DataType.INTEGER, defaultValue: 0},
            review_count: {type: DataType.INTEGER, defaultValue: 0},
            type: {type: DataType.INTEGER, defaultValue: 1, comment: '1观点2买入3卖出4自选'},
            symbols: {type: DataType.STRING, comment: '股票列表，逗号分割'},
            status: {type: DataType.INTEGER, defaultValue: 1, comment: '0-不可用1可用'},
            pictures: {type: DataType.STRING, comment: '图片列表，!#@#!分割'},
            retweeted: {type: DataType.INTEGER, comment: '转发的id'},
            title: {type: DataType.STRING, comment: '话题标题'},
            read_count: {type: DataType.INTEGER, comment: '阅读数', defaultValue: 0},
            retweeted_count: {type: DataType.INTEGER, comment: '转发数', defaultValue: 0},
            channel_id: {type: DataType.INTEGER, comment: '板块id 1直播，2交流，3问答'},
            quality: {type: DataType.INTEGER, defaultValue: 0, comment: '0默认1热门2精华'}
        }, {
            timestamps: true,
            comment: '观点表'
        }
    );
};