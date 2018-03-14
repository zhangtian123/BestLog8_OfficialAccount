/**
 * nodejs访问wcf
 * 用户注册相关
 * */

var Basic = require('./common');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true});
//用户注册时检查用户名是否已经注册，ownerID为空
exports.CheckisExist = function(username, ownerID, callback){
	//console.log(username);
	var addstring = '<ContactCompanyBll_IsExistContactor xmlns="http://tempuri.org/">' +
	                       '<UserCode>'+username+'</UserCode>' +
	                       '<OwnerID>'+ownerID+'</OwnerID>' +
	                     '</ContactCompanyBll_IsExistContactor>';
    var messagestring = "http://tempuri.org/IWebAPIService/ContactCompanyBll_IsExistContactor";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.ContactCompanyBll_IsExistContactorResponse.ContactCompanyBll_IsExistContactorResult;
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

//用户注册时传入用户信息
exports.setUser = function(userstr,company,documentlist, callback){
	var addstring = '<ContactCompanyBll_WeChatRegister xmlns="http://tempuri.org/">' +
	                       '<Contactor>'+userstr+'</Contactor>' +
	                       '<Company>'+company+'</Company>' +
	                       '<DocumentList>'+documentlist+'</DocumentList>' +
	                     '</ContactCompanyBll_WeChatRegister>';
    var messagestring = "http://tempuri.org/IWebAPIService/ContactCompanyBll_WeChatRegister";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	//console.log(response);
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.ContactCompanyBll_WeChatRegisterResponse.ContactCompanyBll_WeChatRegisterResult;
			str1 = JSON.parse(status);
			callback(str1.Status);
		});
    })
}

exports.ValidateMobileNo = function(mobileNo, callback) {
	var addstring = '<ContactCompanyBll_IsMobileRegistered xmlns="http://tempuri.org/">' +
		'<MobileNo>' + mobileNo + '</MobileNo>' +
		'</ContactCompanyBll_IsMobileRegistered>';
	var messagestring = "http://tempuri.org/IWebAPIService/ContactCompanyBll_IsMobileRegistered";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		xmlParser.parseString(response, function(err, result) {
			var str1 = result["s:Envelope"]["s:Body"];
			var status = str1.ContactCompanyBll_IsMobileRegisteredResponse.ContactCompanyBll_IsMobileRegisteredResult;
			if(status == 'true') {
				response = 1;
			} else {
				response = 0;
			}
			callback(response);
		});
	})
}

exports.GetVarificationCode = function(mobileNo, callback) {
	var addstring = '<ContactCompanyBll_GetVarificationCode xmlns="http://tempuri.org/">' +
		'<MobileNo>' + mobileNo + '</MobileNo>' +
		'</ContactCompanyBll_GetVarificationCode>';
	var messagestring = "http://tempuri.org/IWebAPIService/ContactCompanyBll_GetVarificationCode";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		xmlParser.parseString(response, function(err, result) {
			var str1 = result["s:Envelope"]["s:Body"];
			var status = str1.ContactCompanyBll_GetVarificationCodeResponse.ContactCompanyBll_GetVarificationCodeResult;
			if(status == 'true') {
				response = 1;
			} else {
				response = 0;
			}
			callback(response);
		});
	})
}

exports.IsValidCode = function(mobileNo, code, callback) {
	var addstring = '<ContactCompanyBll_IsValidCode xmlns="http://tempuri.org/">' +
		'<MobileNo>' + mobileNo + '</MobileNo>' +
		'<Code>' + code + '</Code>' +
		'</ContactCompanyBll_IsValidCode>';
	var messagestring = "http://tempuri.org/IWebAPIService/ContactCompanyBll_IsValidCode";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		xmlParser.parseString(response, function(err, result) {
			var str1 = result["s:Envelope"]["s:Body"];
			var status = str1.ContactCompanyBll_IsValidCodeResponse.ContactCompanyBll_IsValidCodeResult;
			if(status == 'true') {
				response = 1;
			} else {
				response = 0;
			}
			callback(response);
		});
	})
}