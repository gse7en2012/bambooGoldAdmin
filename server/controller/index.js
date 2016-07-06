/**
 * Created by zhuzhipeng on 16/3/11.
 */


'use strict';

const News      = require('./News');
const NewsAct   = require('./NewsAct');
const Activity  = require('./Activity');
const Strategy  = require('./Strategy');
const Links     = require('./Links');
const Logs      = require('./Logs');
const Auth      = require('./Auth');
const Channel   = require('./Info');
const Live      = require('./Live');
const Users     = require('./Users');
const Discuss   = require('./Discuss');
const Questions = require('./Questions');
const Files     = require('./Files');
const Qiniu     = require('./Qiniu');
const Message   = require('./Message');
const Vip       = require('./Vip');

const controller = {
    News: News,
    NewsAct: NewsAct,
    Activity: Activity,
    Auth: Auth,
    Strategy: Strategy,
    Links: Links,
    Logs: Logs,
    Channel: Channel,
    Users: Users,
    Live: Live,
    Discuss: Discuss,
    Questions: Questions,
    Files: Files,
    Qiniu: Qiniu,
    Message: Message,
    Vip: Vip
};


module.exports = controller;