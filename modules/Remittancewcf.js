/**
 * nodejs访问wcf
 * 请款审核相关
 * */

var Basic = require('./common');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true});
//获取请款列表
exports.Accountbilldetail = function(BillID, callback){
	var addstring = '<FeAccountingBll_GetAccountingDetails xmlns="http://tempuri.org/">' +
	                       '<BillID>'+BillID+'</BillID>' +
	                     '</FeAccountingBll_GetAccountingDetails>';
    var messagestring = "http://tempuri.org/IWebAPIService/FeAccountingBll_GetAccountingDetails";
    Basic.BasicConnect(addstring, messagestring,function(response){
        //console.log(response);
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.FeAccountingBll_GetAccountingDetailsResponse.FeAccountingBll_GetAccountingDetailsResult;
			str1 = JSON.parse(status);
			//console.log(status);
			console.log(str1.length);
			var array=[];
			var count = {COUNTDetails:str1.length};
			array.push(count);
			for(var i=0;i<str1.length;i++)
			{
				var FeeName = str1[i].FeeName;
				var Currency = str1[i].Currency;
				var Price = str1[i].Price;
				//获取账单ID，账单号，总金额币别，总金额，提交日期，最迟处理日期，往来单位，支付方式，银行，银行账号
				var str4 = {FeeName:FeeName,Currency:Currency,Price:Price};
				//console.log(str4);
				array.push(str4);
			}
			callback(array);
		});
    })
}

exports.Accountbill = function(predicate, values, pageNum, pageSize, orderByProperty,userCode,rowsCount,callback){
	var addstring = '<FeAccountingBll_GetAccountingList xmlns="http://tempuri.org/">' +
	                       '<predicate>'+predicate+'</predicate>' +
	                       '<values>'+values+'</values>' +
	                       '<pageNum>'+pageNum+'</pageNum>' +
	                       '<pageSize>'+pageSize+'</pageSize>' +
	                       '<orderByProperty>'+orderByProperty+'</orderByProperty>' +
	                       '<userCode>'+userCode+'</userCode>' +
	                       '<rowsCount>'+rowsCount+'</rowsCount>' +
	                     '</FeAccountingBll_GetAccountingList>';
    var messagestring = "http://tempuri.org/IWebAPIService/FeAccountingBll_GetAccountingList";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	//console.log(response);
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.FeAccountingBll_GetAccountingListResponse.rowsCount;
			var array=[];
			console.log(predicate);
			var count = {COUNT:status};
			array.push(count);
			if(status!=0)
			{
				var str2 = str1.FeAccountingBll_GetAccountingListResponse.FeAccountingBll_GetAccountingListResult;
				str1 = JSON.parse(str2);
				//console.log(str1);
				//console.log(str1[0].OriginalValues);
				for(var i=0;i<str1.length;i++)
				{
					var str3 = str1[i];//.OriginalValues;
					//获取账单ID，账单号，总金额币别，总金额，提交日期，最迟处理日期，往来单位，支付方式，银行，银行账号
					var str4 = {BILLID:str3.BILLID,BILLNO:str3.BILLNO,CURRENCY:str3.CURRENCY,TOTALAMOUNT:str3.TOTALAMOUNT,CUSTOMER:str3.CUSTOMER,BILLDATE:str3.BILLDATE,LASTDATE:str3.LASTDATE,PAYTYPE:str3.PAYTYPE,BANKNAME:str3.BANKNAME,ACCOUNTNO:str3.ACCOUNTNO}
					//console.log(str4);
					array.push(str4);
				}
			}
			callback(array);
		});
    })
}

exports.AccountbillFinish = function(BillID,NodeCode,UserCode,callback){
	var addstring = '<FeAccountingBll_AccountingNodeFinish xmlns="http://tempuri.org/">' +
	                       '<BillID>'+BillID+'</BillID>' +
	                       '<NodeCode>'+NodeCode+'</NodeCode>' +
	                       '<UserCode>'+UserCode+'</UserCode>' +
	                     '</FeAccountingBll_AccountingNodeFinish>';
    var messagestring = "http://tempuri.org/IWebAPIService/FeAccountingBll_AccountingNodeFinish";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
    		console.log(response);
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.FeAccountingBll_AccountingNodeFinishResponse.FeAccountingBll_AccountingNodeFinishResult;
			str1 = JSON.parse(status);
			callback(str1.Status);
		});
    })
}

exports.AccountbillReject = function(BillID,NodeCode,UserCode,Remark,callback){
	var addstring = '<FeAccountingBll_CancelAccountingNode xmlns="http://tempuri.org/">' +
	                       '<BillID>'+BillID+'</BillID>' +
	                       '<NodeCode>'+NodeCode+'</NodeCode>' +
	                       '<UserCode>'+UserCode+'</UserCode>' +
	                       '<Remark>'+Remark+'</Remark>' +
	                     '</FeAccountingBll_CancelAccountingNode>';
    var messagestring = "http://tempuri.org/IWebAPIService/FeAccountingBll_CancelAccountingNode";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.FeAccountingBll_CancelAccountingNodeResponse.FeAccountingBll_CancelAccountingNodeResult;
			str1 = JSON.parse(status);
			callback(str1.Status);
		});
    })
}
