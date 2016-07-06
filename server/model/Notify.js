/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';

module.exports = (seq, DataType)=> {
    return seq.define('notify', {
        mid: {type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
        details: {type: DataType.TEXT},
        title: {type: DataType.TEXT},
        status: {type: DataType.INTEGER},
        vip_level:{type:DataType.INTEGER}
    }, {
        timestamps: true,
        comment: '公告表'
    });
};
