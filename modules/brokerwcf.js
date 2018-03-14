/**
 * nodejs访问wcf
 * 状态反馈报关相关
 * */

var Basic = require('./common');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true});
var flag=0;
var aflag=0;

//获取节点流
var brokerDetail = function(BillID,num, callback){
	console.log(i);
	var addstring = '<CommonBll_GetNodeViewInfos xmlns="http://tempuri.org/">' +
	                       '<BillID>'+BillID+'</BillID>' +
	                     '</CommonBll_GetNodeViewInfos>';
    var messagestring = "http://tempuri.org/IWebAPIService/CommonBll_GetNodeViewInfos";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	//console.log(i);
    	flag=num;
    	//console.log(response);
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.CommonBll_GetNodeViewInfosResponse.CommonBll_GetNodeViewInfosResult;
			str1 = JSON.parse(status);
			var array=[];
			for(var i=0;i<str1.length;i++)
			{
				var nodecode = str1[i].NODECODE;
				//节点的值需请教小林大佬
				if(str1[i].IsFinished && (nodecode == 'FMS_BG03' || nodecode== 'FMS_BG04' || nodecode== 'FMS_BG05'))
				{
					var str4 = {NODECODE:str1[i].NODECODE,FINISHEDDATE:str1[i].FINISHEDDATE};
					array.push(str4);
				}
			}
			//console.log(flag);
			callback(array);
		});
    })
}

//获取派车单列表
exports.brokerOrderList = function(predicate, values, pageNum, pageSize, orderByProperty, rowsCount, callback){
	flag=0;
	aflag=0;
	var addstring = '<FwDeclarationBll_GetFWDeclarationList xmlns="http://tempuri.org/">' +
	                       '<predicate>'+predicate+'</predicate>' +
	                       '<values>'+values+'</values>' +
	                       '<pageNum>'+pageNum+'</pageNum>' +
	                       '<pageSize>'+pageSize+'</pageSize>' +
	                       '<orderByProperty>'+orderByProperty+'</orderByProperty>' +
	                       '<rowsCount>'+rowsCount+'</rowsCount>' +
	                     '</FwDeclarationBll_GetFWDeclarationList>';
    var messagestring = "http://tempuri.org/IWebAPIService/FwDeclarationBll_GetFWDeclarationList";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	//console.log(response);
    	var arraystr=[];
		xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.FwDeclarationBll_GetFWDeclarationListResponse.rowsCount;
			var array=[];
			var count = {COUNT:status};
			array.push(count);
			if(status!=0)
			{
				var str2 = str1.FwDeclarationBll_GetFWDeclarationListResponse.FwDeclarationBll_GetFWDeclarationListResult;
				str1 = JSON.parse(str2);
				//console.log(str1[0].OriginalValues);
				for(var i=0;i<str1.length;i++)
				{
					var str3 = str1[i];//.OriginalValues;
					arraystr.push(str3);
					if(i<str1.length)
					{
						brokerDetail(str3.BILLID,i,function(result){
							//获取账单ID，账单号，接单时间，申报时间，放行时间
							if(arraystr[flag])
							{
								var str4 = {BILLID:arraystr[flag].BILLID,BILLNO:arraystr[flag].BILLNO,BILLCODE:arraystr[flag].BILLCODE,DETAIL:result};
								array.push(str4);
							}
							aflag++;
							if(aflag==str1.length)
							{
								callback(array);
							}
						})
					}
					
				}
			}
		});
    })
}

exports.brokerFinish = function(Declaration,NodeCode,UserCode,DocumentList,callback){
	var addstring = '<FWDeclarationBll_DeclarationNodeFinish xmlns="http://tempuri.org/">' +
	                       '<Declaration>'+Declaration+'</Declaration>' +
	                       '<NodeCode>'+NodeCode+'</NodeCode>' +
	                       '<UserCode>'+UserCode+'</UserCode>' +
	                       '<DocumentList>'+DocumentList+'</DocumentList>' +
	                     '</FWDeclarationBll_DeclarationNodeFinish>';
    var messagestring = "http://tempuri.org/IWebAPIService/FWDeclarationBll_DeclarationNodeFinish";
    Basic.BasicConnect(addstring, messagestring,function(response){
		xmlParser.parseString(response, function (err, result) {
    		console.log(response);
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.FWDeclarationBll_DeclarationNodeFinishResponse.FWDeclarationBll_DeclarationNodeFinishResult;
			str1 = JSON.parse(status);
			callback(str1.Status);
		});
    })
}
