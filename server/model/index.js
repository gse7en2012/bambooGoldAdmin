/**
 * Created by zhuzhipeng on 16/3/12.
 */
/**
 * Created by zhuzhipeng on 15/7/23.
 */
'use strict';

const Seq      = require('sequelize');
const DBConfig = require('../comm/config').DBConfig;

const mysqlAppConn = new Seq(DBConfig.appTableName, DBConfig.user, DBConfig.password, {
    host: DBConfig.host,
    port: DBConfig.port,
    dialect: 'mysql',
    logging: console.log,
    omitNull: true,
    maxConcurrentQueries: 150,
    dialectOptions: {
        charset: 'utf8mb4'
    },
    define: {
        timestamps: false,
        freezeTableName: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_bin'
    },
    pool: {maxConnections: 150, maxIdleTime: 300}
});

//const mysqlAdminConn = new Seq(DBConfig.adminTableName, DBConfig.user, DBConfig.adminPassword, {
//    host: DBConfig.adminHost,
//    port: DBConfig.port,
//    dialect: 'mysql',
//    logging: console.log,
//    omitNull: true,
//    maxConcurrentQueries: 150,
//    define: {
//        timestamps: false,
//        freezeTableName: true,
//        charset: 'utf8mb4',
//        collate: 'utf8mb4_bin'
//    },
//    pool: {maxConnections: 150, maxIdleTime: 300}
//});


const Activity   = mysqlAppConn.import(__dirname + '/Activity');
const Links      = mysqlAppConn.import(__dirname + '/Links');
const Logs       = mysqlAppConn.import(__dirname + '/Logs');
const LoginLogs  = mysqlAppConn.import(__dirname + '/LoginLogs');
const News       = mysqlAppConn.import(__dirname + '/News');
const NewsAct    = mysqlAppConn.import(__dirname + '/NewsAct');
const Strategy   = mysqlAppConn.import(__dirname + '/Strategy');
const Channel    = mysqlAppConn.import(__dirname + '/Channel');
const ChannelArt = mysqlAppConn.import(__dirname + '/ChannelArt');

const Users             = mysqlAppConn.import(__dirname + '/Users');
const LiveUsers         = mysqlAppConn.import(__dirname + '/LiveUsers');
const LiveOpinion       = mysqlAppConn.import(__dirname + '/LiveOpinion');
const LiveOpinionLike   = mysqlAppConn.import(__dirname + '/LiveOpinionLike');
const LiveOpinionReview = mysqlAppConn.import(__dirname + '/LiveOpinionReview');
const LiveDiscuss       = mysqlAppConn.import(__dirname + '/LiveDiscuss');
const LiveQuestions     = mysqlAppConn.import(__dirname + '/LiveQuestions');
const LiveFiles         = mysqlAppConn.import(__dirname + '/LiveFiles');
const Stock             = mysqlAppConn.import(__dirname + '/Stock');
const Message           = mysqlAppConn.import(__dirname + '/Message');
const Notify            = mysqlAppConn.import(__dirname + '/Notify');
//mysqlAdmin
const AdminUsers = mysqlAppConn.import(__dirname + '/AdminUsers');


ChannelArt.belongsTo(Channel, {foreignKey: 'channel_id', targetKey: 'channel_id'});
//Comments.belongsTo(Users, {foreignKey: 'uid', targetKey: 'uid'});
//UserMessage.belongsTo(Users, {foreignKey: 'uid', targetKey: 'uid'});
//ShareLog.belongsTo(Users, {foreignKey: 'uid', targetKey: 'uid'});
//ShareLog.belongsTo(WxArt, {foreignKey: 'art_id', targetKey: 'art_id'});


LiveOpinion.belongsTo(Users, {foreignKey: 'uid', targetKey: 'uid'});
LiveDiscuss.belongsTo(Users, {foreignKey: 'uid', targetKey: 'uid'});
LiveQuestions.belongsTo(Users, {foreignKey: 'uid', targetKey: 'uid'});
LiveFiles.belongsTo(Users, {foreignKey: 'uid', targetKey: 'uid'});

exports.LiveOpinion   = LiveOpinion;
exports.LiveDiscuss   = LiveDiscuss;
exports.LiveQuestions = LiveQuestions;
exports.LiveFiles     = LiveFiles;

exports.LiveOpinionLike   = LiveOpinionLike;
exports.LiveOpinionReview = LiveOpinionReview;
exports.LiveUsers         = LiveUsers;
exports.Users             = Users;
exports.AdminUsers        = AdminUsers;
exports.MysqlApp          = mysqlAppConn;
exports.Stock             = Stock;
exports.Notify            = Notify;
exports.Message           = Message;
//exports.MysqlAdmin        = mysqlAdminConn;