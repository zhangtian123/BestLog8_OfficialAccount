/**
 * nodejs访问wcf
 * 运价查询
 * */

var Basic = require('./common');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser({
	explicitArray: false,
	ignoreAttrs: true
});
//获取港口列表
exports.getPorts = function(predicate, values, iCounts, callback) {
	var addstring = '<WebBll_GetPorts xmlns="http://tempuri.org/">' +
		'<predicate>' + predicate + '</predicate>' +
		'<values>' + values + '</values>' +
		'<iCounts>' + iCounts + '</iCounts>' +
		'</WebBll_GetPorts>';
	var messagestring = "http://tempuri.org/IWebAPIService/WebBll_GetPorts";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		xmlParser.parseString(response, function(err, result) {
			var str1 = result["s:Envelope"]["s:Body"];
			var str2 = str1.WebBll_GetPortsResponse.WebBll_GetPortsResult;
			var array = [];
			str1 = JSON.parse(str2);
			//console.log(str1[0].OriginalValues);
			for(var i = 0; i < str1.length; i++) {
				var str3 = str1[i]; //.OriginalValues;
				var str4 = {
					NAMECH: str3.NAMECH,
					NAMEEN: str3.NAMEEN
				};
				//console.log(str4);
				array.push(str4);
			}
			callback(array);
		});
	})
}

//获取单位列表
exports.getPackage = function(predicate, values, iCounts, callback) {
	var addstring = '<WebBll_GetPackageType xmlns="http://tempuri.org/">' +
		'<predicate>' + predicate + '</predicate>' +
		'<values>' + values + '</values>' +
		'<iCounts>' + iCounts + '</iCounts>' +
		'</WebBll_GetPackageType>';
	var messagestring = "http://tempuri.org/IWebAPIService/WebBll_GetPackageType";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		xmlParser.parseString(response, function(err, result) {
			var str1 = result["s:Envelope"]["s:Body"];
			var str2 = str1.WebBll_GetPackageTypeResponse.WebBll_GetPackageTypeResult;
			var array = [];
			str1 = JSON.parse(str2);
			//console.log(str1[0].OriginalValues);
			for(var i = 0; i < str1.length; i++) {
				var str3 = str1[i];
				//var str4 = {PACKAGETYPEID:str3.PACKAGETYPEID,TYPECODE:str3.TYPECODE,TYPENAMECH:str3.TYPENAMECH,TYPENAMEEN:str3.TYPENAMEEN};
				//console.log(str4);
				var str4 = {
					text: str3.TYPENAMECH,
					value: str3.TYPENAMEEN
				};
				array.push(str4);
			}
			callback(array);
		});
	})
}

//获取运输方案列表
exports.getFCLList = function(predicate, values, iCounts, callback) {
	var addstring = '<GetQuoteFCLList xmlns="http://tempuri.org/">' +
		'<predicate>' + predicate + '</predicate>' +
		'<values>' + values + '</values>' +
		'<numStr>' + iCounts + '</numStr>' +
		'</GetQuoteFCLList>';
	var messagestring = "http://tempuri.org/IWebAPIService/GetQuoteFCLList";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		//console.log(response);
		xmlParser.parseString(response, function(err, result) {
			var str1 = result["s:Envelope"]["s:Body"];
			var status = str1.GetQuoteFCLListResponse.GetQuoteFCLListResult;
			str1 = JSON.parse(status);
			//console.log(status);
			var array = [];
			var count = {
				COUNT: str1.length
			};
			array.push(count);
			if(str1.length != 0) {
				for(var i = 0; i < str1.length; i++) {
					var str3 = str1[i]; //.OriginalValues;
					var str4 = {
						BILLID: str3.BILLID,
						BILLNO: str3.BILLNO,
						CUSTOMER: str3.CARRIER,
						SAILINGDATE: str3.SAILINGDATE,
						DAYNUM: str3.DAYNUM,
						PORTLOADING: str3.PORTLOADING,
						PORTDISCHARGE: str3.PORTDISCHARGE,
						ISDIRECT: str3.ISDIRECT,
						BASEPORT: str3.BASEPORT,
						STARTDATE: str3.STARTDATE,
						ENDDATE: str3.ENDDATE,
						PRICE20GP: str3.BossPrice20GP,
						PRICE40GP: str3.BossPrice40GP,
						PRICE40HQ: str3.BossPrice40HQ,
						TotalPrice: str3.TotalPrice
					};
					//console.log(str4);
					array.push(str4);
				}
			}
			callback(array);
		});
	})
}
exports.SetCrQuoteReportSea = function(quote, detail, callback) {
	var addstring = '<CrQuoteReportSeaBll_SetCrQuoteReportSeaByApp xmlns="http://tempuri.org/">' +
		'<quote>' + quote + '</quote>' +
		'<detail>' + detail + '</detail>' +
		'</CrQuoteReportSeaBll_SetCrQuoteReportSeaByApp>';
	var messagestring = "http://tempuri.org/IWebAPIService/CrQuoteReportSeaBll_SetCrQuoteReportSeaByApp";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		xmlParser.parseString(response, function(err, result) {
			console.log(response);
			var str1 = result["s:Envelope"]["s:Body"];
			var status = str1.CrQuoteReportSeaBll_SetCrQuoteReportSeaByAppResponse.CrQuoteReportSeaBll_SetCrQuoteReportSeaByAppResult;
			callback(status);
		});
	})
}
exports.getQuoteList = function(predicate, values, callback) {
	var addstring = '<CrQuoteReportSeaBll_GetCrQuoteReportSeaList xmlns="http://tempuri.org/">' +
		'<predicate>' + predicate + '</predicate>' +
		'<values>' + values + '</values>' +
		'</CrQuoteReportSeaBll_GetCrQuoteReportSeaList>';
	var messagestring = "http://tempuri.org/IWebAPIService/CrQuoteReportSeaBll_GetCrQuoteReportSeaList";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		//console.log(response);
		xmlParser.parseString(response, function(err, result) {
			var str1 = result["s:Envelope"]["s:Body"];
			var status = str1.CrQuoteReportSeaBll_GetCrQuoteReportSeaListResponse.CrQuoteReportSeaBll_GetCrQuoteReportSeaListResult;
			str1 = JSON.parse(status);
			//console.log(status);
			var array = [];
			var count = {
				COUNT: str1.length
			};
			array.push(count);
			if(str1.length != 0) {
				for(var i = 0; i < str1.length; i++) {
					var str3 = str1[i]; //.OriginalValues;
					var str4 = {
						CUSTOMER: str3.Customer,
						BEGINDATE: str3.BeginDate,
						ENDDATE: str3.EndDate,
						CARRIER: str3.CARRIER,
						PORTLOADING: str3.PORTLOADING,
						PORTDISCHARGE: str3.PORTDISCHARGE,
						PRICE20GP: str3.PRICE20GP,
						PRICE40GP: str3.PRICE40GP,
						PRICE40HQ: str3.PRICE40HQ,
						QUANTITY20GP: str3.QUANTITY20GP,
						QUANTITY40GP: str3.QUANTITY40GP,
						QUANTITY40HQ: str3.QUANTITY40HQ,
						ISDIRECT: str3.ISDIRECT,
						DAYNUM: str3.DAYNUM,
						ETD: str3.ETD
					};
					//console.log(str4);
					array.push(str4);
				}
			}
			callback(array);
		});
	})
}