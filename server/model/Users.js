/**
 * Created by zhuzhipeng on 16/3/12.
 */
'use strict';

module.exports = (sequelize, DataType)=> {
    return sequelize.define('users', {
        uid: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true},
        nickname: {type: DataType.STRING /* validate : checkNotEmpty*/},
        phone: {type: DataType.INTEGER, comment: '注册手机号'},
        pass: {type: DataType.STRING /* validate : checkNotEmpty */},
        login_time: {type: DataType.DATE},
        picture: {type: DataType.INTEGER, defaultValue: 1},
        status: {type: DataType.INTEGER, defaultValue: 1, comment: '1就是可以发言，0就是block'},
        signature: {type: DataType.STRING, comment: '签名'},
        openid: {type: DataType.STRING, comment: '登录的openId'},
        platform: {type: DataType.STRING, comment: '开放平台来源', defaultValue: 'phone'},
        device_id: {type: DataType.STRING, comment: '设备Id'},
        country_code: {type: DataType.STRING, comment: '手机国家代码'},
        union_id: {type: DataType.STRING, comment: '微信Id'},
        vip_level: {type: DataType.INTEGER, comment: 'vip等级', defaultValue: 0},
        vip_expires: {type: DataType.STRING, comment: 'vip期限'},
        verify:{type:DataType.INTEGER,defaultValue:0}
    }, {
        timestamps: true
    });
};
