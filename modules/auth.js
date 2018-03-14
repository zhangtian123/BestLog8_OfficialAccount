var querystring = require("querystring");
var httpUtil = require('../util/http');
var env = require('./env');

module.exports = {
    
    getAccessToken: function(cb) {
      var path = '/gettoken?' + querystring.stringify({
        corpid: env.corpId,
        corpsecret: env.secret
      });
      httpUtil.get(path, cb);
    },
    
    getTicket: function(accessToken, cb) {
      var path = '/get_jsapi_ticket?' + querystring.stringify({
        type: 'jsapi',
        access_token: accessToken
      });
      httpUtil.get(path, cb);
    },
    getuserinfo:function(accessToken,code, cb) {
      var path = '/user/getuserinfo?' + querystring.stringify({
        type: 'jsapi',
        access_token: accessToken,
        code:code
      });
      httpUtil.get(path, cb);
    },
    get:function(accessToken,userid, cb) {
      var path = '/user/get?' + querystring.stringify({
        type: 'jsapi',
        access_token: accessToken,
        userid:userid
      });
      httpUtil.get(path, cb);
    }
};