var express = require('express');
var router = express.Router();
const multer = require('multer');
var path = require('path');
var Userwcf = require('../modules/userwcf');
var Userreg = require('../modules/userregister');
var Remittance = require('../modules/Remittancewcf');
var Broker = require('../modules/brokerwcf');
var Trailer = require('../modules/trailerwcf');
var Order = require('../modules/orderwcf');
var Booking = require('../modules/bookingStatisticswcf');
var Register = require('../modules/registerauditwcf');
var Leave = require('../modules/leavewcf');
var Freight = require('../modules/freightwcf');
var Time = require('../modules/getNowDate');
//var upload = require('../modules/ftp.js');
var Mail = require('../modules/mail');
var request = require('request');
var auth = require('../modules/auth');
var sign = require('../util/sign');
var env = require('../modules/env');

/* GET home page. */
router.get('/', function(req, res, next) {
	var accessToken;
	var jsapiTicket;
	var signature;
	var agentId = ''; //127434023
	var nonceStr = 'besthint';
	var timeStamp = new Date().getTime();
	auth.getAccessToken({
		success: function(data) {
			if(data && data.access_token) {
				accessToken = data.access_token;
				req.session.accessToken = accessToken;
				auth.getTicket(accessToken, {
					success: function(data) {
						if(data && data.ticket) {
							jsapiTicket = data.ticket;
							signature = sign.getJsapiSign({
								ticket: jsapiTicket,
								nonceStr: nonceStr,
								timeStamp: timeStamp,
								url: "http://app.best-hint.com"
							});
							//					  res.render('index', {jsticket:jsapiTicket,signature:signature,nonceStr:nonceStr,timeStamp:timeStamp,corpId:env.corpId,agentId:agentId});
							res.render("loginMain")
						} else {
							error('cannot get jsapi_ticket');
						}
					},
					error: function(err) {
						res.send(err);
					}
				});
			} else {
				error('cannot get access_token');
			}
		},
		error: function(err) {
			res.send(err);
		}
	});
});
router.get('/userinfo', function(req, res, next) {
	var code = req.query.code;
	var userId;
	var userInfo;
	auth.getuserinfo(req.session.accessToken, code, {
		success: function(data) {
			if(data && data.userid) {
				userId = data.userid;
				auth.get(req.session.accessToken, userId, {
					success: function(data) {
						if(data) {
							userInfo = data;
							Userwcf.Usercheck1(userInfo.userid, null, null, "BestFMS8", 0, function(result) {
								req.session.openid = userInfo.userid;
								if(result == -1 || result == 1 || result == 2 || result == 3) {
									res.render('loginMain', {
										title: 'BestLOG8'
									});
								} else {
									req.session.user = result;
									req.session.user.FLAG = 1;
									if(result.USERFLAG == "USER") {
										res.render('personalProfileForManager', {
											title: 'BestLOG8',
											username: req.session.user.USERCODE,
											showname: req.session.user.SHOWNAME,
											flag: req.session.user.FLAG,
											openid: req.session.user.OPENID
										});
									} else if(result.USERFLAG == "SUPPLIER") {
										res.render('personalProfileForThird', {
											title: 'BestLOG8',
											username: req.session.user.USERCODE,
											showname: req.session.user.SHOWNAME,
											flag: req.session.user.FLAG,
											openid: req.session.user.OPENID
										});
									} else if(result.USERFLAG == "DECLARATION") {
										res.render('personalProfileForDeclaration', {
											title: 'BestLOG8',
											username: req.session.user.USERCODE,
											showname: req.session.user.SHOWNAME,
											flag: req.session.user.FLAG,
											openid: req.session.user.OPENID
										});
									} else if(result.USERFLAG == "TRAILER") {
										res.render('personalProfileForTrailer', {
											title: 'BestLOG8',
											username: req.session.user.USERCODE,
											showname: req.session.user.SHOWNAME,
											flag: req.session.user.FLAG,
											openid: req.session.user.OPENID
										});
									} else {
										res.render('personalProfileForClient', {
											title: 'BestLOG8',
											username: req.session.user.USERCODE,
											showname: req.session.user.SHOWNAME,
											flag: req.session.user.FLAG,
											openid: req.session.user.OPENID
										});
									}
								}
							})
						} else {
							error('cannot get userInfo');
						}
					},
					error: function(err) {
						res.send(err);
					}
				});
			} else {
				error('cannot get userid');
			}
		},
		error: function(err) {
			res.send(err);
		}
	});
});

/* GET . */
router.get('/service', function(req, res, next) {
	//var openid = req.query.openid;
	if(req.session.user) {
		if(req.session.user.USERFLAG == "USER") {
			res.render('personalProfileForManager', {
				title: 'BestLOG8',
				username: req.session.user.USERCODE,
				showname: req.session.user.SHOWNAME,
				flag: req.session.user.FLAG,
				openid: req.session.user.OPENID
			});
		} else if(req.session.user.USERFLAG == "SUPPLIER") {
			res.render('personalProfileForThird', {
				title: 'BestLOG8',
				username: req.session.user.USERCODE,
				showname: req.session.user.SHOWNAME,
				flag: req.session.user.FLAG,
				openid: req.session.user.OPENID
			});
		} else if(req.session.user.USERFLAG == "DECLARATION") {
			res.render('personalProfileForDeclaration', {
				title: 'BestLOG8',
				username: req.session.user.USERCODE,
				showname: req.session.user.SHOWNAME,
				flag: req.session.user.FLAG,
				openid: req.session.user.OPENID
			});
		} else if(req.session.user.USERFLAG == "TRAILER") {
			res.render('personalProfileForTrailer', {
				title: 'BestLOG8',
				username: req.session.user.USERCODE,
				showname: req.session.user.SHOWNAME,
				flag: req.session.user.FLAG,
				openid: req.session.user.OPENID
			});
		} else {
			res.render('personalProfileForClient', {
				title: 'BestLOG8',
				username: req.session.user.USERCODE,
				showname: req.session.user.SHOWNAME,
				flag: req.session.user.FLAG,
				openid: req.session.user.OPENID
			});
		}
	} else {
		if(req.query.code) {
			request.get({
				url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxf45ab4faa6dbb5fe&secret=22708990c65541dca36376fb9ed13ec6&code=' + req.query.code + '&grant_type=authorization_code',
				form: {}
			}, function(error, response, body) {
				if(!error && response.statusCode == 200) {
					if(body.indexOf('errcode') != -1) {
						res.render('loginMain', {
							title: 'BestLOG8'
						});
					} else {
						var jsondata = JSON.parse(body);
						Userwcf.Usercheck1(jsondata.openid, null, null, "BestFMS8", 0, function(result) {
							req.session.openid = jsondata.openid;
							if(result == -1 || result == 1 || result == 2 || result == 3) {
								res.render('loginMain', {
									title: 'BestLOG8'
								});
							} else {
								req.session.user = result;
								req.session.user.FLAG = 1;
								if(result.USERFLAG == "USER") {
									res.render('personalProfileForManager', {
										title: 'BestLOG8',
										username: req.session.user.USERCODE,
										showname: req.session.user.SHOWNAME,
										flag: req.session.user.FLAG,
										openid: req.session.user.OPENID
									});
								} else if(result.USERFLAG == "SUPPLIER") {
									res.render('personalProfileForThird', {
										title: 'BestLOG8',
										username: req.session.user.USERCODE,
										showname: req.session.user.SHOWNAME,
										flag: req.session.user.FLAG,
										openid: req.session.user.OPENID
									});
								} else if(result.USERFLAG == "DECLARATION") {
									res.render('personalProfileForDeclaration', {
										title: 'BestLOG8',
										username: req.session.user.USERCODE,
										showname: req.session.user.SHOWNAME,
										flag: req.session.user.FLAG,
										openid: req.session.user.OPENID
									});
								} else if(result.USERFLAG == "TRAILER") {
									res.render('personalProfileForTrailer', {
										title: 'BestLOG8',
										username: req.session.user.USERCODE,
										showname: req.session.user.SHOWNAME,
										flag: req.session.user.FLAG,
										openid: req.session.user.OPENID
									});
								} else {
									res.render('personalProfileForClient', {
										title: 'BestLOG8',
										username: req.session.user.USERCODE,
										showname: req.session.user.SHOWNAME,
										flag: req.session.user.FLAG,
										openid: req.session.user.OPENID
									});
								}
							}
						})
					}
				}
			});
		} else {
			res.render('loginMain', {
				title: 'BestLOG8'
			});
		}
	}
});

/* GET 管理员. */
router.get('/manager', function(req, res, next) {
	if(req.session.user) {
		res.render('personalProfileForManager', {
			title: 'BestLOG8',
			username: req.session.user.USERCODE,
			showname: req.session.user.SHOWNAME,
			flag: req.session.user.FLAG,
			openid: req.session.user.OPENID
		});
	} else {
		res.render('loginMain', {
			title: 'BestLOG8'
		});
	}
});

/* GET 第三方. */
router.get('/third', function(req, res, next) {
	if(req.session.user) {
		res.render('personalProfileForThird', {
			title: 'BestLOG8',
			username: req.session.user.USERCODE,
			showname: req.session.user.SHOWNAME,
			flag: req.session.user.FLAG,
			openid: req.session.user.OPENID
		});
	} else {
		res.render('loginMain', {
			title: 'BestLOG8'
		});
	}
});

/* GET 客户. */
router.get('/client', function(req, res, next) {
	if(req.session.user) {
		res.render('personalProfileForClient', {
			title: 'BestLOG8',
			username: req.session.user.USERCODE,
			showname: req.session.user.SHOWNAME,
			flag: req.session.user.FLAG,
			openid: req.session.user.OPENID
		});
	} else {
		res.render('loginMain', {
			title: 'BestLOG8'
		});
	}
});

/* GET 第三方报关行. */
router.get('/declaration', function(req, res, next) {
	if(req.session.user) {
		res.render('personalProfileForDeclaration', {
			title: 'BestLOG8',
			username: req.session.user.USERCODE,
			showname: req.session.user.SHOWNAME,
			flag: req.session.user.FLAG,
			openid: req.session.user.OPENID
		});
	} else {
		res.render('loginMain', {
			title: 'BestLOG8'
		});
	}
});

/* GET 第三方拖车公司. */
router.get('/trailer', function(req, res, next) {
	if(req.session.user) {
		res.render('personalProfileForTrailer', {
			title: 'BestLOG8',
			username: req.session.user.USERCODE,
			showname: req.session.user.SHOWNAME,
			flag: req.session.user.FLAG,
			openid: req.session.user.OPENID
		});
	} else {
		res.render('loginMain', {
			title: 'BestLOG8'
		});
	}
});

/* GET 统一登录入口. */
/*router.get('/mainpage', function(req, res, next) {
	res.render('mainpage', { title: 'BestLOG8' });
});*/

/* GET 请款审核. */
router.get('/remittance', function(req, res, next) {
	if(req.session.user) {
		res.render('remittance', {
			title: 'BestLOG8'
		});
	} else {
		res.render('loginMain', {
			title: 'BestLOG8'
		});
	}
});

/* GET 账单审核. */
router.get('/billaudit', function(req, res, next) {
	if(req.session.user) {
		res.render('billaudit', {
			title: 'BestLOG8'
		});
	} else {
		res.render('loginMain', {
			title: 'BestLOG8'
		});
	}
});

/* GET 账单确认. */
router.get('/billconfirm', function(req, res, next) {
	if(req.session.user) {
		res.render('billconfirm', {
			title: 'BestLOG8'
		});
	} else {
		res.render('loginMain', {
			title: 'BestLOG8'
		});
	}
});

/* GET 注册首页. */
router.get('/registerMain', function(req, res, next) {
	res.render('registerMain', {
		title: 'BestLOG8'
	});
});

/* GET 注册设置密码页. */
router.get('/registerSetPw', function(req, res, next) {
	res.render('registerSetPw', {
		title: 'BestLOG8'
	});
});

/* GET 注册填写公司信息页. */
router.get('/registerCominfo', function(req, res, next) {
	res.render('registerCominfo', {
		title: 'BestLOG8'
	});
});

/* GET 注册填写公司信息页. */
router.get('/takephoto', function(req, res, next) {
	res.render('takephoto', {
		title: 'BestLOG8'
	});
});

/* GET 注册填写完成. */
router.get('/registerWait', function(req, res, next) {
	res.render('registerWait', {
		title: 'BestLOG8'
	});
});

/* GET 注册审核. */
router.get('/registerAudit', function(req, res, next) {
	if(req.session.user) {
		res.render('registerAuditing', {
			title: 'BestLOG8'
		});
	} else {
		res.render('loginMain', {
			title: 'BestLOG8'
		});
	}
});

router.get('/registerDetail', function(req, res, next) {
	res.render('registerDetail', {
		title: 'BestLOG8',
		registeruser: req.session.register.registeruser,
		taxnumber: req.session.register.taxnumber,
		COMPANY: req.session.register.COMPANY,
		COMPANYCN: req.session.register.COMPANYCN,
		REGADDRESS: req.session.register.REGADDRESS,
		REGADDRESSEN: req.session.register.REGADDRESSEN,
		EMAIL: req.session.register.EMAIL,
		BILLID: req.session.register.BILLID,
		STORAGEPATH: req.session.register.STORAGEPATH
	});
});

/* GET 注册审核. */
router.post('/saveregisterDetail', function(req, res, next) {
	var parameter = req.body;
	Register.getphoto(parameter.id, "", "", function(result) {
		var register = {
			registeruser: parameter.user,
			taxnumber: parameter.taxnumber,
			COMPANY: parameter.comname,
			COMPANYCN: parameter.comnamecn,
			REGADDRESS: parameter.address,
			REGADDRESSEN: parameter.addressen,
			EMAIL: parameter.email,
			BILLID: parameter.id,
		}
		if(result != 0) {
			register.STORAGEPATH = result.STORAGEPATH;
			result = 1;
		}
		req.session.register = register;
		res.send({
			result: result
		});
	})
});

/* GET 请假审核. */
router.get('/leaveAudit', function(req, res, next) {
	if(req.session.user) {
		res.render('leaveAudit', {
			title: 'BestLOG8'
		});
	} else {
		res.render('loginMain', {
			title: 'BestLOG8'
		});
	}
});

/* GET 登录首页. */
router.get('/loginMain', function(req, res, next) {
	res.render('loginMain', {
		title: 'BestLOG8'
	});
});

/* GET 登录忘记密码. */
router.get('/loginForgetPw', function(req, res, next) {
	res.render('loginForgetPw', {
		title: 'BestLOG8'
	});
});

/* GET 重设密码. */
router.get('/loginSetPw', function(req, res, next) {
	res.render('loginSetPw', {
		title: 'BestLOG8'
	});
});

/* GET 运价查询. */
router.get('/freightQuery', function(req, res, next) {
	//	if(req.session.user){
	Freight.getPackage("1==1", "", 5, function(result) {
		res.render('freightQuery', {
			title: 'BestLOG8',
			packagedata: JSON.stringify(result),
			isuser: (req.session.user.USERFLAG == "USER" ? true : false)
		});
	})
	//	}
	//else
	//{
	//	res.render('loginMain', { title: 'BestLOG8' });
	//}
	//	res.render('freightQuery', {title:'BestLOG8'});
});
router.get('/renderQuote', function(req, res, next) {
	if(req.session.user.USERFLAG == 'USER') {
		res.render('renderQuote', {
			title: 'BestLOG8',
			id: req.query.id
		});
	}
})
router.post('/saveQuote', function(req, res, next) {
	var parameter = req.body;
	var quote = {
		CUSTOMER: parameter.requester,
		BEGINDATE: parameter.startDate,
		ENDDATE: parameter.endDate,
		REMARK: parameter.remark,
		CREATEBY: req.session.user.USERCODE
	};
	var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var curDate = new Date();
	curDate = new Date((curDate / 1000 + 86400) * 1000);
	while(weekday[curDate.getDay()] != parameter.saillineDate) {
		curDate = new Date((curDate / 1000 + 86400) * 1000);
	}
	var detail = {
		CARRIER: parameter.carrier,
		PORTLOADING: parameter.portLoading,
		PORTDISCHARGE: parameter.portDischarge,
		PRICE20GP: parameter.price20GP,
		PRICE40GP: parameter.price40GP,
		PRICE40HQ: parameter.price40HQ,
		QUANTITY20GP: parameter.conTeu1,
		QUANTITY40GP: parameter.conTeu2,
		QUANTITY40HQ: parameter.conTeu3,
		DAYNUM: parameter.dayNum,
		ISDIRECT: parameter.isDirect,
		ETD: curDate
	}
	Freight.SetCrQuoteReportSea(JSON.stringify(quote), JSON.stringify(detail), function(result) {
		res.send({
			result: result
		});
	})
});

/* GET 状态反馈. */
router.get('/stateback1', function(req, res, next) {
	if(req.session.user) {
		res.render('statusBrokerMain', {
			title: 'BestLOG8'
		});
	} else {
		res.render('loginMain', {
			title: 'BestLOG8'
		});
	}
});

/* GET 状态反馈之接单. */
router.get('/statusBrokerOrdertaking', function(req, res, next) {
	res.render('statusBrokerOrdertaking', {
		title: 'BestLOG8'
	});
});

/* GET 状态反馈之申报. */
router.get('/statusBrokerDoing', function(req, res, next) {
	res.render('statusBrokerDoing', {
		title: 'BestLOG8'
	});
});

/* GET 状态反馈之放行. */
router.get('/statusBrokerClearance', function(req, res, next) {
	res.render('statusBrokerClearance', {
		title: 'BestLOG8'
	});
});

/* GET 状态反馈. */
router.get('/stateback2', function(req, res, next) {
	if(req.session.user) {
		res.render('statusTrailerMain', {
			title: 'BestLOG8'
		});
	} else {
		res.render('loginMain', {
			title: 'BestLOG8'
		});
	}
});

/* GET 状态反馈之接单. */
router.get('/statusTrailerOrdertaking', function(req, res, next) {
	res.render('statusTrailerOrdertaking', {
		title: 'BestLOG8'
	});
});

/* GET 状态反馈之sent. */
router.get('/statusTrailerSent', function(req, res, next) {
	res.render('statusTrailerSent', {
		title: 'BestLOG8'
	});
});

/* GET 状态反馈之接单. */
router.get('/statusTrailerPickup', function(req, res, next) {
	res.render('statusTrailerPickup', {
		title: 'BestLOG8'
	});
});

/* GET 状态反馈之接单. */
router.get('/statusTrailerArrive', function(req, res, next) {
	res.render('statusTrailerArrive', {
		title: 'BestLOG8'
	});
});

/* GET 状态反馈之接单. */
router.get('/statusTrailerPacking', function(req, res, next) {
	res.render('statusTrailerPacking', {
		title: 'BestLOG8'
	});
});

/* GET 状态反馈之接单. */
router.get('/statusTrailerPacked', function(req, res, next) {
	res.render('statusTrailerPacked', {
		title: 'BestLOG8'
	});
});

/* GET 状态反馈之接单. */
router.get('/statusTrailerPortArrive', function(req, res, next) {
	res.render('statusTrailerPortArrival', {
		title: 'BestLOG8'
	});
});

/* GET 订单跟踪. */
router.get('/shipmenttracking', function(req, res, next) {
	if(req.session.user) {
		res.render('orderTracing', {
			title: 'BestLOG8'
		});
	} else {
		res.render('loginMain', {
			title: 'BestLOG8'
		});
	}
});

/* Get 向客户的邮箱发送验证码. */
router.post('/identifyCode', function(req, res, next) {
	var parameter = req.body;
	var emailaddress = parameter.emailaddress;
	var num = "";
	for(var i = 0; i < 6; i++)
		num += Math.floor(Math.random() * 10);
	//console.log(num);
	Mail.sendMail(emailaddress, num);
	res.send({
		result: num
	});
})

/* GET 客户注册，分三步，一步用户名和联系方式，第二步密码，第三步公司信息. */
router.post('/saveusername', function(req, res, next) {
	var parameter = req.body;
	var username = parameter.username;
	var telephone = parameter.telephone;
	//console.log(username+telephone);
	Userreg.CheckisExist(username, null, function(result) {
		res.send({
			result: result
		});
	})
});

router.post('/validateMobileNo', function(req, res, next) {
	var parameter = req.body;
	var mobileNo = parameter.mobileNo;
	Userreg.ValidateMobileNo(mobileNo, function(result) {
		res.send({
			result: result
		});
	})
});

router.post('/getVarificationCode', function(req, res, next) {
	var parameter = req.body;
	var mobileNo = parameter.mobileNo;
	Userreg.GetVarificationCode(mobileNo, function(result) {
		res.send({
			result: result
		});
	})
});

router.post('/varifyCode', function(req, res, next) {
	var parameter = req.body;
	var username = parameter.username;
	var mobileNo = parameter.mobileNo;
	var code = parameter.Code;
	Userreg.IsValidCode(mobileNo, code, function(result) {
		if(result == 1) {
			var user = {
				USERCODE: username,
				MOBILENO: mobileNo,
			};
			req.session.user = user;
		}
		res.send({
			result: result
		});
	})
});

router.post('/saveuserpassword', function(req, res, next) {
	var parameter = req.body;
	var password = parameter.password;
	if(req.session.user) {
		req.session.user.PASSWORD = password;
	}
	res.send({
		result: 0
	});
});

/* GET 报错照片 */
/*这部分是FTP初始化配置*/
var Client = require('ftp');
var fs = require('fs');

var connectionProperties = {
	host: "117.29.183.38",
	port: 21,
	user: "lh",
	password: "123"
};
/*FTP初始化部分*/
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, path.resolve('./public/uploads'));
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({
	storage: storage
});

router.post('/profile', upload.single('avatar'), function(req, res, next) {
	/* 注册信息传递给wcf */
	var guid1 = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
	var guid2 = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
	var guid3 = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
	var userstr = {
		COMCONTACTID: guid1,
		CONTACTCOMGUID: guid2,
		ONLINEID: req.session.user.USERCODE,
		IDPASSWORD: req.session.user.PASSWORD,
		MOBILEPHONE: req.session.user.MOBILENO,
		REGDATE: Time.getNowDate(0, 0, 0),
		RowState: "4"
	}
	var user = JSON.stringify(userstr);
	req.session.company.BILLID = guid2;
	req.session.company.RowState = "4";
	var company = JSON.stringify(req.session.company);
	var filename = req.session.company.COMNAME + req.session.user.USERCODE;
	var filepath = 'uploads/' + path.basename(req.file.path);
	var arrayphoto = [];
	var DocumentList = {
		DOCUMENTID: guid3,
		FILENAME: filename,
		STORAGEPATH: filepath,
		RowState: "4"
	};
	arrayphoto.push(DocumentList);
	var documentlist = JSON.stringify(arrayphoto);
	Userreg.setUser(user, company, documentlist, function(result) {
		req.session.user = null;
		req.session.company = null;
		req.session.destroy();
		res.send({
			result: result
		});
	});
	/*同时还要上传FTP*/
	//var c = new Client();
	// console.log('uploads/' + path.basename(req.file.path));
	//c.on('ready', function() {
	//c.put('../uploads/'+path.basename(req.file.path),'BestFMSDoc/'+path.basename(req.file.path), function(err) {
	//   if (err) throw err;
	//    c.end();
	//  });
	//});
	//c.connect(connectionProperties);
});

router.post('/saveuserCom', function(req, res, next) {
	var parameter = req.body;
	var company = {
		COMNAMECN: parameter.COMNAMECN,
		COMNAME: parameter.COMNAME,
		TAXNUMBER: parameter.TAXNUMBER,
		REGADDRESS: parameter.COMADDRESS,
		REGADDRESSEN: parameter.COMADDRESSEN,
		EMAIL: parameter.COMEMAIL,
	}
	req.session.company = company;
	console.log(req.session.company);
	res.send({
		result: 1
	})
});

/* 注册审核 */
router.get('/registerlist', function(req, res, next) {
	//Register.Registerlist("WINODES==@0","CR_CUST03",1,100,"CREATEDATE",1,function(result){
	Register.Registerlist("", "", 1, 3, "CREATEDATE", req.session.user.USERCODE, 1, function(result) {
		//console.log(result);
		res.send({
			result: result
		});
	})
})

/* 通过注册*/
router.post('/agreeregister', function(req, res, next) {
	var parameter = req.body;
	//Register.agreeRegister(parameter.BILLID,"CR_CUST03",req.session.user.USERCODE,function(result){
	console.log(parameter.BILLID);
	Register.agreeRegister(parameter.BILLID, "CR_CUST03", "VIRTUAL_USER", function(result) {
		res.send({
			result: result
		});
	})
})

/* 驳回注册*/
router.post('/rejectregister', function(req, res, next) {
	var parameter = req.body;
	//	Register.rejectRegister(parameter.BILLID,"CR_CUST03",req.session.user.USERCODE,parameter.reason,function(result){
	Register.rejectRegister(parameter.BILLID, "CR_CUST03", "VIRTUAL_USER", parameter.reason, function(result) {
		res.send({
			result: result
		});
	})
})

/* 请假审核 暂无数据测试*/
router.get('/leavelist', function(req, res, next) {
	Leave.getQingjia("", "", 1, 1, "BILLID", 1, function(result) {
		res.send({
			result: result
		});
	})
})

/* 通过请假 暂无数据测试*/
router.post('/agreeleave', function(req, res, next) {
	var parameter = req.body;
	var predicate = "BILLID:" + parameter.BILLID;
	Register.agreeQingjia(predicate, "CR_CUST03", req.session.user.USERCODE, function(result) {
		res.send({
			result: result
		});
	})
})

/* 驳回请假 暂无数据测试*/
router.post('/rejectleave', function(req, res, next) {
	var parameter = req.body;
	Register.rejectQingjia(parameter.BILLID, "CR_CUST03", req.session.user.USERCODE, parameter.reason, function(result) {
		res.send({
			result: result
		});
	})
})

/* 用户登录，用户名和密码验证.  */
router.post('/userlogin', function(req, res, next) {
	var parameter = req.body;
	var username = parameter.username;
	var password = parameter.password;
	Userwcf.Usercheck2(username, password, "BestFMS8", 0, function(result) {
		if(!(result == -1 || result == 1 || result == 2 || result == 3)) {
			result.FLAG = 0;
			req.session.user = result;
		}
		res.send({
			result: result
		});
	})
});

/* 忘记密码用手机号和验证码找回.  */
router.get('/userForget', function(req, res, next) {
	var parameter = req.query;
	var username = parameter.username;
	var telephone = parameter.telephone;
	Userwcf.IsValidUser(username, telephone, function(result) {
		if(result == 1) {
			var user = {
				USERCODE: username,
				EMAIL: telephone,
			};
			req.session.user = user;
		}
		res.send({
			result: result
		});
	})
});

/* 重设密码.  */
router.post('/reSetpassword', function(req, res, next) {
	var parameter = req.body;
	var password = parameter.password;
	var username = parameter.username;
	var mobileNo = parameter.mobileNo;
	if(req.session.user) {
		Userwcf.ChangeNewPwd(username, mobileNo, password, function(result) {
			res.send({
				result: result
			});
		})
	}
});

/* GET 请款审核列表. */
router.get('/getRemittanceList', function(req, res, next) {
	var parameter = req.query;
	var begin = parameter.begin;
	var end = parameter.end;
	var type = parameter.type;
	var predicate = "";
	var year = 0;
	var month = 0;
	var week = 0;
	var time = "";
	predicate = "NODECODE==@0";
	time = "Fee_CQK05";
	var timeCol = "FINISHEDDATE"; //CHECKDATE
	if(req.session.user.USERFLAG != "USER") {
		if(begin == "needconfirm") {
			time = "Fee_CQK14";
		} else {
			time = "Fee_CQK15";
		}
		timeCol = "FINISHEDDATE";
	}
	predicate += " && DUNNINGORREQUESTS==@1";
	if(type == "remittance") {
		time += ",Request";
	} else {
		time += ",Dunning";
	}
	var index = 2;
	switch(begin) {
		case 'needconfirm':
			break;
		case 'needpay':
			break;
		case 'now':
			break;
		case 'lastweek':
		case 'history':
			predicate += " && " + timeCol + ">=MDFunctions.ParseDateTime(@2) && NODESTATE==@3";
			week = 1;
			time += "," + Time.getNowDate(year, month, week) + ",finished";
			index = 4;
			break;
		case 'lastmonth':
			predicate += " && " + timeCol + ">=MDFunctions.ParseDateTime(@2) && NODESTATE==@3";
			month = 1;
			time += "," + Time.getNowDate(year, month, week) + ",finished";
			index = 4;
			break;
		case 'lastthreeweek':
			predicate += " && " + timeCol + ">=MDFunctions.ParseDateTime(@2) && NODESTATE==@3";
			month = 3;
			time += "," + Time.getNowDate(year, month, week) + ",finished";
			index = 4;
			break;
		case 'lasthalfyear':
			predicate += " && " + timeCol + ">=MDFunctions.ParseDateTime(@2) && NODESTATE==@3";
			month = 6;
			time += "," + Time.getNowDate(year, month, week) + ",finished";
			index = 4;
			break;
		default:
			predicate += " && " + timeCol + ">=MDFunctions.ParseDateTime(@2) && " + timeCol + "|=MDFunctions.ParseDateTime(@3) && NODESTATE==@4";
			time += "," + begin + "," + end + ",finished";
			index = 5;
			break;
	}
	if(req.session.user.USERFLAG != "USER") {
		predicate += " && CUSTOMER==@" + index;
		time += "," + req.session.user.SHOWNAME;
	}
	console.log(predicate);
	console.log(time);
	Remittance.Accountbill(predicate, time, 1, 100, "BILLCODE", req.session.user.USERFLAG == "USER" ? req.session.user.USERCODE : "", 0, function(result) {
		//console.log(result);
		res.send({
			result: result
		});
	});
});
router.get('/getRemittanceList2', function(req, res, next) {
	var predicate = "NODECODE==@0 && DUNNINGORREQUESTS==@1 && (";
	var values = "Fee_CQK14,Dunning";
	var predicate2 = "";
	if(req.query.ids) {
		var strArray = req.query.ids.split(',');
		for(j = 0; j < strArray.length; j++) {
			if(predicate2 == "") {
				predicate2 = "BILLID==@" + (j + 2);
				values += ',' + strArray[j];
			} else {
				predicate2 += " || BILLID==@" + (j + 2);
				values += ',' + strArray[j];
			}
		}
		predicate = predicate + predicate2 + ')';
		Remittance.Accountbill(predicate, values, 1, 100, "BILLCODE", "", 0, function(result) {
			//console.log(result);
			res.send({
				result: result
			});
		});
	}
});
/* GET 请款详细条目*/
router.get('/getRemittanceDetail', function(req, res, next) {
	var parameter = req.query;
	var BILLID = parameter.BILLid;
	Remittance.Accountbilldetail(BILLID, function(result) {
		res.send({
			result: result
		});
	})
})

/* GET 状态反馈列表. */
router.get('/getTrailerList', function(req, res, next) {
	//console.log("ok");
	var predicate = "",
		values = "";
	if(req.query.ids == null) {
		if(req.session.user.USERFLAG != "USER") {
			predicate = "TRAILERCOMPANY==@0";
			values = req.session.user.SHOWNAME;
		}
	} else {
		predicate = "BILLID==@0";
		values = req.query.ids;
	}
	Trailer.carOrderList(predicate, values, 1, 100, "CREATEDATE", 0, function(result) {
		//console.log(result);
		res.send({
			result: result
		});
	})
});

/* GET 状态反馈列表broker. */
router.get('/getBrokerList', function(req, res, next) {
	var predicate = "",
		values = "";
	if(req.session.user.USERFLAG != "USER") {
		predicate = "CUSTOMSCOMPANY==@0";
		values = req.session.user.SHOWNAME;
	}
	Broker.brokerOrderList(predicate, values, 1, 100, "BILLNO", 0, function(result) {
		//console.log(result);
		res.send({
			result: result
		});
	})
});

router.post('/agreeRemittance', function(req, res, next) {
	var parameter = req.body;
	var BILLID = parameter.BILLid;
	var nodeCode = parameter.NODECODE;
	if(nodeCode == null || nodeCode == "") {
		nodeCode = "Fee_CQK05";
	}
	var UserCode = req.session.user.USERCODE;
	Remittance.AccountbillFinish(BILLID, nodeCode, "VIRTUAL_USER", function(result) {
		res.send({
			result: result
		})
	})
});

router.post('/rejectRemittance', function(req, res, next) {
	var parameter = req.body;
	var remittanceid = parameter.remittanceid;
	var reason = parameter.reason;
	var UserCode = req.session.user.USERCODE;
	var nodeCode = parameter.NODECODE;
	if(nodeCode == null || nodeCode == "") {
		nodeCode = "Fee_CQK05";
	}
	Remittance.AccountbillReject(remittanceid, nodeCode, "VIRTUAL_USER", reason, function(result) {
		res.send({
			result: result
		})
	})
});

router.post('/statusBroker', function(req, res, next) {
	var form = new formidable.IncomingForm();
	var uploadDir = path.normalize("public/uploads");
	form.uploadDir = uploadDir;
	form.keepExtensions = true;
	form.multiples = true;
	form.parse(req, function(err, fields, files) {
		var state = fields.state;
		//var description=fields.REMARK;
		var billNo = fields.BILLNO;
		var billCode = fields.BILLCODE;
		//delete fields["REMARK"];
		delete fields["state"];
		delete fields["BILLNO"];
		var arrayphoto = [];
		if(JSON.stringify(files) != '{}') {
			for(item in files) {
				fs.rename(files[item].path, "public\\uploads\\" + files[item].name);
				var guid3 = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = Math.random() * 16 | 0,
						v = c == 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
				});

				var DocumentList = {
					DOCUMENTID: guid3,
					FILENAME: files[item].name,
					STORAGEPATH: "/" + billCode + "/" + billNo + "/" + files[item].name,
					RowState: "4"
				};
				arrayphoto.push(DocumentList);
			}
			/*同时还要上传FTP*/
			var cc = new Client();
			cc.on('ready', function() { //
				cc.get("./BestFMSDoc/" + billCode + "/" + billNo + "/", function(err) {
					if(err) {
						cc.mkdir("./BestFMSDoc/" + billCode + "/" + billNo + "/", true, function(err) {
							for(item in files) {
								cc.put("public/uploads/" + files[item].name, 'BestFMSDoc/' + billCode + "/" + billNo + "/" + files[item].name, function(err) {
									//if (err) throw err;
									cc.end();
								});
							}
						});
					} else {
						for(item in files) {
							cc.put("public/uploads/" + files[item].name, 'BestFMSDoc/' + billCode + "/" + billNo + "/" + files[item].name, function(err) {
								//if (err) throw err;
								cc.end();
							});
						}
					}
				});
			});
			cc.connect(connectionProperties);
		}
		var str1 = JSON.stringify(fields);
		var documentlist = JSON.stringify(arrayphoto);
		Broker.brokerFinish(str1, state, "VIRTUAL_USER", documentlist, function(result) {
			//console.log(result);
			res.send({
				result: result
			})
		})
	});
});

router.post('/statusTrailer', function(req, res, next) {
	var form = new formidable.IncomingForm();
	var uploadDir = path.normalize("public/uploads");
	form.uploadDir = uploadDir;
	form.keepExtensions = true;
	form.multiples = true;
	form.parse(req, function(err, fields, files) {
		var state = fields.state;
		//var description=fields.REMARK;
		var billNo = fields.BILLNO;
		var billCode = fields.BILLCODE;
		//delete fields["REMARK"];
		delete fields["state"];
		delete fields["BILLNO"];
		var arrayphoto = [];
		if(JSON.stringify(files) != '{}') {
			for(item in files) {
				fs.rename(files[item].path, "public\\uploads\\" + files[item].name);
				var guid3 = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = Math.random() * 16 | 0,
						v = c == 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
				});

				var DocumentList = {
					DOCUMENTID: guid3,
					FILENAME: files[item].name,
					STORAGEPATH: "/" + billCode + "/" + billNo + "/" + files[item].name,
					RowState: "4"
				};
				arrayphoto.push(DocumentList);
			}
			/*同时还要上传FTP*/
			var cc = new Client();
			cc.on('ready', function() { //
				cc.get("./BestFMSDoc/" + billCode + "/" + billNo + "/", function(err) {
					if(err) {
						cc.mkdir("./BestFMSDoc/" + billCode + "/" + billNo + "/", true, function(err) {
							for(item in files) {
								cc.put("public/uploads/" + files[item].name, 'BestFMSDoc/' + billCode + "/" + billNo + "/" + files[item].name, function(err) {
									//if (err) throw err;
									cc.end();
								});
							}
						});
					} else {
						for(item in files) {
							cc.put("public/uploads/" + files[item].name, 'BestFMSDoc/' + billCode + "/" + billNo + "/" + files[item].name, function(err) {
								//if (err) throw err;
								cc.end();
							});
						}
					}
				});
			});
			cc.connect(connectionProperties);
		}
		var str1 = JSON.stringify(fields);
		var documentlist = JSON.stringify(arrayphoto);
		Trailer.trailerFinish(str1, state, "VIRTUAL_USER", documentlist, function(result) {
			//console.log(result);
			res.send({
				result: result
			})
		})
	});
});

/* 获取港口列表*/
router.get('/getPorts', function(req, res, next) {
	var parameter = req.query;
	var predicate = "";
	var values = "";
	if(parameter.search_name != null && parameter.search_name != "") {
		predicate = " AND NAMEEN.CONTAINS(@1) ";
		values = "," + parameter.search_name;
	}
	Freight.getPorts("PORTTYPE==@0" + predicate, "shipping" + values, 5, function(result) {
		//		console.log(result);
		res.send({
			result: result
		});
	})
})

/* 获取列表*/
router.get('/getFreightQuery', function(req, res, next) {
	var parameter = req.query;
	var predicate = "PORTLOADING==@0 && PORTDISCHARGE==@1";
	var values = parameter.loadingportresult + "|" + parameter.desportresult;
	var icounts = parameter.test + "," + parameter.test1 + "," + parameter.test2;
	//	var array = [parameter.test,parameter.test1,parameter.test2];
	Freight.getFCLList(predicate, values, icounts, function(result) {
		res.send({
			result: result
		});
	})
})
router.get('/getFreightQuery2', function(req, res, next) {
	var predicate = "";
	var values = "";
	if(req.query.ids) {
		var strArray = req.query.ids.split(',');
		for(j = 0; j < strArray.length; j++) {
			if(predicate == "") {
				predicate = "BILLID==@" + j;
				values = strArray[j];
			} else {
				predicate += " || BILLID==@" + j;
				values += '|' + strArray[j];
			}
		}
		Freight.getFCLList(predicate, values, "0,0,0", function(result) {
			res.send({
				result: result
			});
		})
	}
})
router.get('/getQuoteList', function(req, res, next) {
	var predicate = "";
	var values = "";
	if(req.query.ids) {
		var strArray = req.query.ids.split(',');
		for(j = 0; j < strArray.length; j++) {
			if(predicate == "") {
				predicate = "QUOTEREPORTSEAID==@" + j;
				values = strArray[j];
			} else {
				predicate += " || QUOTEREPORTSEAID==@" + j;
				values += '|' + strArray[j];
			}
		}
		Freight.getQuoteList(predicate, values, function(result) {
			res.send({
				result: result
			});
		})
	}
})

/* 订单跟踪GET订单列表*/
router.get('/getOrderList', function(req, res, next) {
	var predicate = "";
	var values = "";
	var flag = 0;
	if(req.query.orderno || req.query.customsop || req.query.sono || req.query.hblno) {

		if(req.query.orderno != "" && typeof(req.query.orderno) != "undefined") {
			flag++;
			predicate += "ORDERNO==@0";
			values += req.query.orderno;
		}
		if(req.query.customsop != "" && typeof(req.query.customsop) != "undefined") {
			if(flag == 0) {
				predicate += "REFNO==@0";
				values += req.query.customsop;
			} else {
				predicate += "&&REFNO==@" + flag;
				values += "," + req.query.customsop;
			}
			flag++;
		}
		if(req.query.sono != "" && typeof(req.query.sono) != "undefined") {
			if(flag == 0) {
				predicate += "BOOKINGNO==@0";
				values += req.query.sono;
			} else {
				predicate += "&&BOOKINGNO==@" + flag;
				values += "," + req.query.sono;
			}
			flag++;
		}
		if(req.query.hblno != "" && typeof(req.query.hblno) != "undefined") {
			if(flag == 0) {
				predicate += "HBLNO==@0";
				values += req.query.hblno;
			} else {
				predicate += "&&HBLNO==@" + flag;
				values += "," + req.query.hblno;
			}
			flag++;
		}
	}
	//	console.log(predicate);
	//	console.log(values);
	if(req.session.user.USERFLAG != "USER") {
		if(predicate == "") {
			predicate = "REQUESTER==@0";
			values = req.session.user.SHOWNAME;
		} else {
			predicate += "&&REQUESTER==@" + flag;
			values += "," + req.session.user.SHOWNAME;
		}
	}
	Order.OrderList(predicate, values, 0, 100, "BILLNO", req.session.user.USERFLAG == "USER" ? req.session.user.USERCODE : "", 0, function(result) {
		//console.log(result);
		res.send({
			result: result
		});
	})
})
router.get('/getOrderList2', function(req, res, next) {
	var predicate = "";
	var values = "";
	if(req.query.ids) {
		var strArray = req.query.ids.split(',');
		for(j = 0; j < strArray.length; j++) {
			if(predicate == "") {
				predicate = "BILLID==@" + j;
				values = strArray[j];
			} else {
				predicate += " || BILLID==@" + j;
				values += ',' + strArray[j];
			}
		}
		Order.OrderList(predicate, values, 0, 100, "BILLNO", "", 0, function(result) {
			//console.log(result);
			res.send({
				result: result
			});
		})
	}
})

/* GET订单跟踪订单流程节点*/
router.get('/getOrderDetail', function(req, res, next) {
	var parameter = req.query;
	var ORDERID = parameter.BILLid;
	Order.OrderDetail(ORDERID, function(result) {
		//console.log(result);
		res.send({
			result: result
		});
	})
})

router.post('/bindingwx', function(req, res, next) {
	var parameter = req.body;
	if(req.session.user) {
		var userId = req.session.user.USERID;
		var userFlag = req.session.user.USERFLAG;
		var openId = req.session.user.OPENID == null || req.session.user.OPENID == '' ? req.session.openid : '';
		Userwcf.ChangeOpenId(userId, openId, userFlag, function(result) {
			if(result == 1) {
				req.session.user.OPENID = openId;
			}
			res.send({
				result: result,
				USERID: userId,
				USERFLAG: userFlag,
				OPENID: openId
			});
		})
	}
});

router.get('/downloadapp', function(req, res, next) {
	res.render('downloadapp', {
		title: 'BestLOG8'
	});
});

router.get('/logout', function(req, res, next) {
	req.session.user = null;
	req.session.destroy();
	res.render('loginMain', {
		title: 'BestLOG8'
	});
});
router.get('/getWXCode', function(req, res, next) {
	res.render('getWXCode', {
		title: 'BestLOG8'
	});
});

router.get('/orderStatistics', function(req, res, next) {
	res.render('orderStatistics', {
		title: 'BestLOG8'
	});
});

router.get('/getBookingStatistics', function(req, res, next) {
	var parameter = req.query;
	var predicate = ""; // parameter.predicate;
	var groupBy = parameter.groupBy;
	var beginDate = parameter.beginDate;
	var endDate = parameter.endDate;
	predicate = " and OrderDate>='" + beginDate + "' and '" + endDate + "'>=OrderDate";
	Booking.BookingStatisticsList(predicate, groupBy, function(result) {
		res.send({
			result: result
		});
	})
});

router.get('/customerStatistics', function(req, res, next) {
	res.render('customerStatistics', {
		title: 'BestLOG8'
	});
});

router.get('/getCustomerStatistics', function(req, res, next) {
	var parameter = req.query;
	var predicate = ""; // parameter.predicate;
	var groupBy = parameter.groupBy;
	var beginDate = parameter.beginDate;
	var endDate = parameter.endDate;
	predicate = " and JudgeDate>='" + beginDate + "' and '" + endDate + "'>=JudgeDate";
	Booking.CustomerStatisticsList(predicate, groupBy, function(result) {
		res.send({
			result: result
		});
	})
});
router.get('/shareStatusBack', function(req, res, next) {
	var parameter = req.query;
	var type = parameter.type;
	Order.ValidOcShareLog(parameter.sid, 48, function(result) {
		if(result == 1) {
			var imgShow = true;
			if(req.session.user) {
				imgShow = false;
			} else {
				if(req.headers["referer"]) {
					if(req.headers["referer"].indexOf('setShareLogBySystem') >= 0) {
						imgShow = false;
					}
				}
			}
			if(type == "bg") {
				res.render('shareStatusBackByBG', {
					ids: parameter.ids
				});
			} else if(type == "tc") {
				res.render('shareStatusBackByTC', {
					ids: parameter.ids
				});
			} else if(type == "bill") {
				res.render('shareStatusBackByBill', {
					ids: parameter.ids,
					display: imgShow ? 'display' : 'none',
					tooltips: (imgShow ? '账单确认结果有效期为48小时，更多服务请关注公众号' : '分享内容已经生成，有效期为48小时，请点右上角...分享')
				});
			} else if(type == "freight") {
				res.render('shareStatusBackByFreight', {
					ids: parameter.ids,
					display: imgShow ? 'display' : 'none',
					tooltips: (imgShow ? '报价结果有效期为48小时，更多服务请关注公众号' : '分享内容已经生成，有效期为48小时，请点右上角...分享')
				});
			} else if(type == "quote") {
				res.render('shareStatusBackByQuote', {
					ids: parameter.ids,
					display: imgShow ? 'display' : 'none',
					tooltips: (imgShow ? '报价结果有效期为48小时，更多服务请关注公众号' : '分享内容已经生成，有效期为48小时，请点右上角...分享')
				});
			} else { //order
				res.render('shareStatusBackByOrder', {
					ids: parameter.ids,
					display: imgShow ? 'display' : 'none',
					tooltips: (imgShow ? '状态返馈结果有效期为48小时，更多服务请关注公众号' : '分享内容已经生成，有效期为48小时，请点右上角...分享')
				});
			}
		} else {
			res.render('shareStatusBackInvalid');
		}
	})
});
router.get('/setShareLog', function(req, res, next) {
	Order.SetOcShareLog(function(result) {
		//console.log(result);
		res.send({
			result: result
		});
	})
})
router.get('/setShareLogBySystem', function(req, res, next) {
	Order.SetOcShareLog(function(result) {
		var parameter = req.query;
		var type = parameter.type;
		res.render('setShareLogBySystem', {
			type: type,
			ids: parameter.ids,
			sid: result
		});
		//res.redirect('http://192.168.100.243:3000/shareStatusBack?type='+type+'&ids='+parameter.ids+'&sid='+result);
	})
})
//var qr_image = require('qr-image');
//router.get('/renderqrCode',function(req,res,next){
//	var parameter = req.query;
//	var type=parameter.type;
//	var temp_qrcode = qr_image.image('http://app.best-hint.com/setShareLogBySystem?type='+type+'&ids='+parameter.ids);  
//  res.type('png');  
//  temp_qrcode.pipe(res); 
//})

router.get('/placeShippingOrder', function(req, res, next) {
	res.render('placeOrder', {
		title: 'BestLOG8',
		showname: req.session.user == null ? "" : req.session.user.SHOWNAME
	});
});

router.get('/getPackage', function(req, res, next) {
	Freight.getPackage("1==1", "", 100, function(result) {
		res.send({
			result: result
		});
	})
})

router.get('/getBaseCodes', function(req, res, next) {
	var parameter = req.query;
	var predicate = "CODETYPE==@0";
	var values = parameter.codeType;
	Order.getBaseCodes(predicate, values, 100, function(result) {
		res.send({
			result: result
		});
	})
})

router.get('/getCustomers', function(req, res, next) {
	var parameter = req.query;
	var predicate = "TYPECODE==@0";
	var values = parameter.typeCode;
	Order.getCustomers(predicate, values, 100, function(result) {
		res.send({
			result: result
		});
	})
})
router.get('/getCustomers2', function(req, res, next) {
	var parameter = req.query;
	var predicate = "TYPECODE==@0 && (COMNAMECN.Contains(@1) || SHORTNAME.Contains(@1))";
	var values = parameter.typeCode + "," + parameter.q;
	Order.getCustomers(predicate, values, 100, function(result) {
		res.send(result);
	})
})

router.get('/getRoleUsers', function(req, res, next) {
	var parameter = req.query;
	var billCode = parameter.billCode;
	var roleCode = parameter.roleCode;
	Order.getRoleUsers(billCode, roleCode, function(result) {
		res.send({
			result: result
		});
	})
})

router.get('/getShips', function(req, res, next) {
	Order.getShips("1==1", "", 100, function(result) {
		res.send({
			result: result
		});
	})
})

router.get('/getSailLines', function(req, res, next) {
	var parameter = req.query;
	var predicate = "SHIPOWNER==@0";
	var values = parameter.shipOwner;
	Order.getSailLines(predicate, values, 100, function(result) {
		res.send({
			result: result
		});
	})
})

router.post('/submitShippingOrder', function(req, res, next) {
	var form = new formidable.IncomingForm();
	//  var uploadDir = path.normalize("public/uploads");
	//  form.uploadDir = uploadDir;
	//  form.keepExtensions = true;  
	//  form.multiples = true;
	form.parse(req, function(err, fields) {
		var str1 = JSON.stringify(fields);
		Order.placeShippingOrder(str1, function(result) {
			res.send({
				result: result
			})
		})
	});
});

router.get('/shippingOrder', function(req, res, next) {
	if(req.session.user) {
		res.render('orderList', {
			title: 'BestLOG8'
		});
	} else {
		res.render('loginMain', {
			title: 'BestLOG8'
		});
	}
});

router.get('/getShippingOrderList', function(req, res, next) {
	var predicate = "";
	var values = "";
	var flag = 0;
	if(req.query.orderno || req.query.customsop) {
		if(req.query.orderno != "" && typeof(req.query.orderno) != "undefined") {
			flag++;
			predicate += "BILLNO==@0";
			values += req.query.orderno;
		}
		if(req.query.customsop != "" && typeof(req.query.customsop) != "undefined") {
			if(flag == 0) {
				predicate += "REFNO==@0";
				values += req.query.customsop;
			} else {
				predicate += "&&REFNO==@" + flag;
				values += "," + req.query.customsop;
			}
			flag++;
		}
	}
	if(req.session.user.USERFLAG != "USER") {
		if(predicate == "") {
			predicate = "REQUESTER==@0";
			values = req.session.user.SHOWNAME;
		} else {
			predicate += "&&REQUESTER==@" + flag;
			values += "," + req.session.user.SHOWNAME;
		}
	}
	if(req.query.isCheck != "" && typeof(req.query.isCheck) != "undefined") {
		if(req.query.isCheck == "true")
			predicate += (predicate == "" ? "" : "&&") + "ISCHECK==true";
		else
			predicate += (predicate == "" ? "" : "&&") + "ISCHECK!=true";
	}
	Order.ShippingOrderList(predicate, values, 0, 100, "BILLDATE", req.session.user.USERFLAG == "USER" ? req.session.user.USERCODE : "", 0, function(result) {
		res.send({
			result: result
		});
	})
})

router.get('/getShippingOrderDetail', function(req, res, next) {
	var parameter = req.query;
	var ORDERID = parameter.BILLid;
	Order.ShippingOrderDetail(ORDERID, function(result) {
		res.send({
			result: result
		});
	})
})

module.exports = router;