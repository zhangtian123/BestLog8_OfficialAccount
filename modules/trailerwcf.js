/**
 * nodejs访问wcf
 * 状态反馈拖车相关
 * */

var Basic = require('./common');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true});
var flag=0;
var aflag=0;
//获取节点流
var trailerDetail = function(BillID,num, callback){
	var addstring = '<CommonBll_GetNodeViewInfos xmlns="http://tempuri.org/">' +
	                       '<BillID>'+BillID+'</BillID>' +
	                     '</CommonBll_GetNodeViewInfos>';
    var messagestring = "http://tempuri.org/IWebAPIService/CommonBll_GetNodeViewInfos";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	//console.log(response);
    	flag=num;
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.CommonBll_GetNodeViewInfosResponse.CommonBll_GetNodeViewInfosResult;
			str1 = JSON.parse(status);
			var array=[];
			for(var i=0;i<str1.length;i++)
			{
				var nodecode = str1[i].NODECODE;
				if(str1[i].IsFinished && (nodecode == 'FMS_TCMX05' || nodecode== 'FMS_TCMX06' || nodecode== 'FMS_TCMX07' 
				   || nodecode== 'FMS_TCMX08' || nodecode== 'FMS_TCMX09'
				   || nodecode== 'FMS_TCMX10' || nodecode== 'FMS_TCMX11'))
				{
					var str4 = {NODECODE:str1[i].NODECODE,FINISHEDDATE:str1[i].FINISHEDDATE};
					array.push(str4);
				}
			}
			callback(array);
		});
    })
}
//获取派车单列表
exports.carOrderList = function(predicate, values, pageNum, pageSize, orderByProperty, rowsCount, callback){
	flag=0;
	aflag=0;
	var addstring = '<FWDispatchBll_GetDisPatchList xmlns="http://tempuri.org/">' +
	                       '<predicate>'+predicate+'</predicate>' +
	                       '<values>'+values+'</values>' +
	                       '<pageNum>'+pageNum+'</pageNum>' +
	                       '<pageSize>'+pageSize+'</pageSize>' +
	                       '<orderByProperty>'+orderByProperty+'</orderByProperty>' +
	                       '<rowsCount>'+rowsCount+'</rowsCount>' +
	                     '</FWDispatchBll_GetDisPatchList>';
 //   var messagestring = "http://tempuri.org/IWebAPIService/FWDispatchBll_GetDisPatchList";
 	var messagestring = "http://tempuri.org/IWebAPIService/FWDispatchBll_GetDisPatchList";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	//callback(response);
    	var arraystr=[];
		xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.FWDispatchBll_GetDisPatchListResponse.rowsCount;
			var array=[];
			var count = {COUNT:status};
			array.push(count);
			if(status!=0)
			{
				var str2 = str1.FWDispatchBll_GetDisPatchListResponse.FWDispatchBll_GetDisPatchListResult;
				str1 = JSON.parse(str2);
				//console.log(str1[0].OriginalValues);
				for(var i=0;i<str1.length;i++)
				{
					var str3 = str1[i];//.OriginalValues;
					arraystr.push(str3);
					if(i<str1.length)
					{
						trailerDetail(str3.BILLID,i,function(result){
							if(arraystr[flag])
							{
								var str4 = {BILLID:arraystr[flag].BILLID,BILLNO:arraystr[flag].BILLNO,BILLCODE:arraystr[flag].BILLCODE,CONTAINERNO:arraystr[flag].CONTAINERNO,SIZE:arraystr[flag].SIZE,TYPE:arraystr[flag].TYPE,TRUCKNO:arraystr[flag].TRUCKNO,DRIVER:arraystr[flag].DRIVER,TELEPHONE:arraystr[flag].TELEPHONE,DETAIL:result};
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

exports.trailerFinish = function(Dispatch,NodeCode,UserCode,DocumentList,callback){
	console.log(Dispatch)
	console.log(DocumentList)
	var addstring = '<FWDispatchBll_DispatchNodeFinish xmlns="http://tempuri.org/">' +
	                       '<Trailer>'+Dispatch+'</Trailer>' +
	                       '<NodeCode>'+NodeCode+'</NodeCode>' +
	                       '<UserCode>'+UserCode+'</UserCode>' +
	                       '<DocumentList>'+DocumentList+'</DocumentList>' +
	                     '</FWDispatchBll_DispatchNodeFinish>';
    var messagestring = "http://tempuri.org/IWebAPIService/FWDispatchBll_DispatchNodeFinish";
    Basic.BasicConnect(addstring, messagestring,function(response){
		console.log(response);
		xmlParser.parseString(response, function (err, result) {
    		console.log(response);
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.FWDispatchBll_DispatchNodeFinishResponse.FWDispatchBll_DispatchNodeFinishResult;
			str1 = JSON.parse(status);
			callback(str1.Status);
		});
    })
}

/* 获取货物件数单位列表*/
exports.trailerPackageType = function(predicate, values, iCounts,callback){
	var addstring = '<WebBll_GetPackageType xmlns="http://tempuri.org/">' +
	                       '<predicate>'+predicate+'</predicate>' +
	                       '<values>'+values+'</values>' +
	                       '<iCounts>'+iCounts+'</iCounts>' +
	                     '</WebBll_GetPackageType>';
    var messagestring = "http://tempuri.org/IWebAPIService/WebBll_GetPackageType";
    Basic.BasicConnect(addstring, messagestring,function(response){
		console.log(response);
//		xmlParser.parseString(response, function (err, result) {
//  		console.log(response);
//			var str1=result["s:Envelope"]["s:Body"];
//			var status = str1.FWDeclarationBll_DeclarationNodeFinishResponse.FWDeclarationBll_DeclarationNodeFinishResult;
//			str1 = JSON.parse(status);
//			callback(str1.Status);
//		});
    })
}

/* 获取司机列表 Supier:所属公司*/
exports.trailerGetDrivers = function(Suplier,callback){
	var addstring = '<FWDispatchBll_GetDrivers xmlns="http://tempuri.org/">' +
	                       '<Suplier>'+Suplier+'</Suplier>' +
	                     '</FWDispatchBll_GetDrivers>';
    var messagestring = "http://tempuri.org/IWebAPIService/FWDispatchBll_GetDrivers";
    Basic.BasicConnect(addstring, messagestring,function(response){
		console.log(response);
//		xmlParser.parseString(response, function (err, result) {
//  		console.log(response);
//			var str1=result["s:Envelope"]["s:Body"];
//			var status = str1.FWDeclarationBll_DeclarationNodeFinishResponse.FWDeclarationBll_DeclarationNodeFinishResult;
//			str1 = JSON.parse(status);
//			callback(str1.Status);
//		});
    })
}

/* 获取车号列表 Supier:所属公司*/
exports.trailerGetTruck = function(Suplier,callback){
	var addstring = '<FWDispatchBll_GetTruckList xmlns="http://tempuri.org/">' +
	                       '<Suplier>'+Suplier+'</Suplier>' +
	                     '</FWDispatchBll_GetTruckList>';
    var messagestring = "http://tempuri.org/IWebAPIService/FWDispatchBll_GetTruckList";
    Basic.BasicConnect(addstring, messagestring,function(response){
		console.log(response);
//		xmlParser.parseString(response, function (err, result) {
//  		console.log(response);
//			var str1=result["s:Envelope"]["s:Body"];
//			var status = str1.FWDeclarationBll_DeclarationNodeFinishResponse.FWDeclarationBll_DeclarationNodeFinishResult;
//			str1 = JSON.parse(status);
//			callback(str1.Status);
//		});
    })
}