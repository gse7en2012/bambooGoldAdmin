/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';

module.exports = (seq, DataType)=> {
    return seq.define('stock', {
        symbol: {type: DataType.TEXT, allowNull: false, primaryKey: true},
        name: {type: DataType.TEXT}
    }, {
        timestamps: false,
        comment: '股票列表'
    });
};
