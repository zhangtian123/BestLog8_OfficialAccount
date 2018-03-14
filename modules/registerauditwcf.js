/**
 * nodejs访问wcf
 * 用户注册审核相关
 * */

var Basic = require('./common');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true});

exports.Registerlist = function(predicate, values, pageNum, pageSize, orderByProperty,userCode, rowsCount, callback){
	var addstring = '<ContactCompanyBll_GetRegisterList xmlns="http://tempuri.org/">' +
	                       '<predicate>'+predicate+'</predicate>' +
	                       '<values>'+values+'</values>' +
	                       '<pageNum>'+pageNum+'</pageNum>' +
	                       '<pageSize>'+pageSize+'</pageSize>' +
	                       '<orderByProperty>'+orderByProperty+'</orderByProperty>' +
	                       '<userCode>'+userCode+'</userCode>' +
	                       '<rowsCount>'+rowsCount+'</rowsCount>' +
	                     '</ContactCompanyBll_GetRegisterList>';
    var messagestring = "http://tempuri.org/IWebAPIService/ContactCompanyBll_GetRegisterList";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	//console.log(response);
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.ContactCompanyBll_GetRegisterListResponse.rowsCount;
			var array=[];
			var count = {COUNT:status};
			array.push(count);
			if(status!=0)
			{
				var str2 = str1.ContactCompanyBll_GetRegisterListResponse.ContactCompanyBll_GetRegisterListResult;
				str1 = JSON.parse(str2);
				//console.log(str1[0].OriginalValues);
				for(var i=0;i<str1.length;i++)
				{
					var str3 = str1[i];//.OriginalValues;
					//获取账单ID，账单号，接单时间，申报时间，放行时间
					var str4 = {BILLID:str3.BILLID,BILLCODE:str3.BILLCODE,RegisterUser:str1[i].RegisterUser,RegisterDate:str1[i].RegisterDate,COMNAME:str3.COMNAME,COMNAMECN:str3.COMNAMECN,TAXNUMBER:str3.TAXNUMBER,CREATEDATE:str3.CREATEDATE,REGADDRESS:str3.REGADDRESS,REGADDRESSEN:str3.REGADDRESSEN,EMAIL:str3.EMAIL};
					//console.log(str4);
					array.push(str4);
				}
			}
			callback(array);
		});
    })
}

/* 获取图片地址*/
exports.getphoto = function(BillID, predicate, values, callback){
	var addstring = '<ContactCompanyBll_GetDocumentsList xmlns="http://tempuri.org/">' +
	                       '<BillID>'+BillID+'</BillID>' +
	                       '<predicate>'+predicate+'</predicate>' +
	                       '<values>'+values+'</values>' +
	                     '</ContactCompanyBll_GetDocumentsList>';
    var messagestring = "http://tempuri.org/IWebAPIService/ContactCompanyBll_GetDocumentsList";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	//callback(response);
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.ContactCompanyBll_GetDocumentsListResponse.ContactCompanyBll_GetDocumentsListResult;
			str1 = JSON.parse(status);
			var str4 = 0;
			if(str1.length!=0)
			{
				var str3 = str1[i];//.OriginalValues;
				str4 = {STORAGEPATH:str3.STORAGEPATH};
			}
			//console.log(str4);
			callback(str4);
		});
    })
}

/* 通过注册*/
exports.agreeRegister = function(BillID, NodeCode, UserCode, callback){
	var addstring = '<ContactCompanyBll_ContactorNodeFinish xmlns="http://tempuri.org/">' +
	                       '<BillID>'+BillID+'</BillID>' +
	                       '<NodeCode>'+NodeCode+'</NodeCode>' +
	                       '<UserCode>'+UserCode+'</UserCode>' +
	                     '</ContactCompanyBll_ContactorNodeFinish>';
    var messagestring = "http://tempuri.org/IWebAPIService/ContactCompanyBll_ContactorNodeFinish";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
			console.log(response);
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.ContactCompanyBll_ContactorNodeFinishResponse.ContactCompanyBll_ContactorNodeFinishResult;
			str1 = JSON.parse(status);
			callback(str1.Status);
		});
    })
}

/* 驳回注册*/
exports.rejectRegister = function(BillID, NodeCode, UserCode,Remark, callback){
	var addstring = '<ContactCompanyBll_CancelContactorNode xmlns="http://tempuri.org/">' +
	                       '<BillID>'+BillID+'</BillID>' +
	                       '<NodeCode>'+NodeCode+'</NodeCode>' +
	                       '<UserCode>'+UserCode+'</UserCode>' +
	                       '<Remark>'+Remark+'</Remark>' +
	                     '</ContactCompanyBll_CancelContactorNode>';
    var messagestring = "http://tempuri.org/IWebAPIService/ContactCompanyBll_CancelContactorNode";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
			//console.log(response);
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.ContactCompanyBll_CancelContactorNodeResponse.ContactCompanyBll_CancelContactorNodeResult;
			str1 = JSON.parse(status);
			callback(str1.Status);
		});
    })
}