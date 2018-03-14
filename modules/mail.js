/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
 service: 'qq',
 auth: {
  user: '252806968@qq.com', //这里填自己的 qq号
  pass: 'bufdwghfqegqcaii' //授权码,通过QQ邮箱获取
 }
});

exports.sendMail = function(address,html){
	var mailOptions = {
	 from: '252806968@qq.com', // 发送者 asdfghj
	 to: address, // 接受者,可以同时发送多个,以逗号隔开
	 subject: 'BestLOG8wx验证码', // 标题
	 html: html,
	};
	transporter.sendMail(mailOptions, function(err, info) {
	 if (err) {
	  console.log(err);
	  return;
	 }
	 console.log('发送成功');
	});
}