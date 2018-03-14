var multer = require('multer');
/*这部分是FTP初始化配置*/
var Client = require('ftp');
var fs = require('fs');
var c = new Client();
var connectionProperties = {
    host: "192.168.100.111",
    port:21,
    user: "lh",
    password: "123"
};
/*FTP初始化部分*/

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

exports.upload = multer({storage: storage});