/**
 * Created by zhuzhipeng on 15/12/25.
 */

//zhangaobocorp@qq.com   zab0326
const qiniu = require('qiniu');

//http://developer.qiniu.com/docs/v6/sdk/nodejs-sdk.html
//3380466244@qq.com   gf687269
qiniu.conf.ACCESS_KEY = 'MdiqPZNlkCXwZP0DySHuNKFfTzCGf5Dr8Rrqp3sR';
qiniu.conf.SECRET_KEY = 'CFUWKSK-DV8wle8le1zXtj7Npd_Qn0p2CZ3rc6IH';


function createUpToken(bucketname, expires) {
    const putPolicy     = new qiniu.rs.PutPolicy(bucketname);
    putPolicy.expires   = expires;
    putPolicy.mimeLimit = 'image/jpeg;image/png';
    return putPolicy.token();
}
function createSocialToken() {
    return Promise.resolve(createUpToken('stock-live', 60 * 60 * 24 * 14));
}
//默认12个月。

exports.getSocialToken = createSocialToken;
