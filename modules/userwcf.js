/**
 * 2017/7/13
 * nodejs访问wcf
 * 用户登录相关
 * */

var Basic = require('./common');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true});
//用户登录时检查用户名密码是否正确
exports.Usercheck1 = function(OpenID,userCode, password, systemCode, statusCode, callback){
	console.log(userCode);
	var addstring = '<ContactCompanyBll_UserLogin xmlns="http://tempuri.org/">' +
						   '<OpenID>'+OpenID+'</OpenID>' +
	                       '<UserCode>'+userCode+'</UserCode>' +
	                       '<Password>'+password+'</Password>' +
//	                       '<SystemCode>'+systemCode+'</SystemCode>' +
	                       '<StatusCode>'+statusCode+'</StatusCode>' +
	                     '</ContactCompanyBll_UserLogin>';
	var messagestring = "http://tempuri.org/IWebAPIService/ContactCompanyBll_UserLogin";
	Basic.BasicConnect(addstring, messagestring,function(response){
		xmlParser.parseString(response, function (err, result) {
			console.log(response);
			var str1=result["s:Envelope"]["s:Body"];
			console.log(str1);
			var status = str1.ContactCompanyBll_UserLoginResponse.StatusCode;
			if(status==-1 || status==1 || status==2 || status==3)
			{
				response = status;
			}
			else
			{
				var str2 = str1.ContactCompanyBll_UserLoginResponse.ContactCompanyBll_UserLoginResult;
				str1 = JSON.parse(str2);
				console.log(str1);
				response = {
					USERID:str1.UserID,
					USERCODE:str1.UserCode,
					USERFLAG:str1.UserFlag,
					PASSWORD:"",
					OPENID:OpenID,
					SHOWNAME:str1.Customer=="" ? str1.UserName : str1.Customer
				}
			}
			callback(response);
		});
	})
}
exports.Usercheck2 = function(userCode, password, systemCode, statusCode, callback){
	console.log(userCode);
	var addstring = '<ContactCompanyBll_UserLogin xmlns="http://tempuri.org/">' +
	                       '<UserCode>'+userCode+'</UserCode>' +
	                       '<Password>'+password+'</Password>' +
//	                       '<SystemCode>'+systemCode+'</SystemCode>' +
	                       '<StatusCode>'+statusCode+'</StatusCode>' +
	                     '</ContactCompanyBll_UserLogin>';
	var messagestring = "http://tempuri.org/IWebAPIService/ContactCompanyBll_UserLogin";
	Basic.BasicConnect(addstring, messagestring,function(response){
		xmlParser.parseString(response, function (err, result) {
			//console.log(response);
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.ContactCompanyBll_UserLoginResponse.StatusCode;
			if(status==-1 || status==1 || status==2 || status==3)
			{
				response = status;
			}
			else
			{
				var str2 = str1.ContactCompanyBll_UserLoginResponse.ContactCompanyBll_UserLoginResult;
				str1 = JSON.parse(str2);
				response = {
					USERID:str1.UserID,
					USERCODE:str1.UserCode,
					USERFLAG:str1.UserFlag,
					PASSWORD:"",
					OPENID:str1.OPENID,
					SHOWNAME:str1.Customer=="" ? str1.UserName : str1.Customer
				}
			}
			callback(response);
		});
	})
}

//忘记密码时匹配用户名，邮箱
exports.IsValidUser = function(UserCode, Email, callback){
	var addstring = '<ContactCompanyBll_IsValidUser xmlns="http://tempuri.org/">' +
	                       '<UserCode>'+UserCode+'</UserCode>' +
	                       '<Email>'+Email+'</Email>' +
	                     '</ContactCompanyBll_IsValidUser>';
    var messagestring = "http://tempuri.org/IWebAPIService/ContactCompanyBll_IsValidUser";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.ContactCompanyBll_IsValidUserResponse.ContactCompanyBll_IsValidUserResult;
			if(status=='true')
			{
				response = 1;
			}
			else
			{
				response=0;
			}
			callback(response);
		});
    })
}

//用户修改密码，传入用户ID，原密码，新密码做参数，返回0：修改成功，1：原始密码错误，3：其他错误
exports.ChangePwd = function(UserCode, Email,NewPwd, callback){
	var addstring = '<ContactCompanyBll_SaveNewPwd xmlns="http://tempuri.org/">' +
	                       '<UserCode>'+UserCode+'</UserCode>' +
	                       '<Email>'+Email+'</Email>' +
	                       '<NewPwd>'+NewPwd+'</NewPwd>' +
	                     '</ContactCompanyBll_SaveNewPwd>';
    var messagestring = "http://tempuri.org/IWebAPIService/ContactCompanyBll_SaveNewPwd";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.ContactCompanyBll_SaveNewPwdResponse.ContactCompanyBll_SaveNewPwdResult;
			if(status=='true')
			{
				response = 1;
			}
			else
			{
				response=0;
			}
			callback(response);
		});
    })
}
