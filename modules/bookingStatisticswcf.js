/**
 * nodejs访问wcf
 * 订舱统计
 * */

var Basic = require('./common');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true});
//获取订单列表
exports.BookingStatisticsList = function(predicate, groupBy, callback){
	var addstring = '<BookingBll_GetBookingStatistics xmlns="http://tempuri.org/">' +
	                       '<predicate>'+predicate+'</predicate>' +
	                       '<groupBy>'+groupBy+'</groupBy>' +
	                     '</BookingBll_GetBookingStatistics>';
    var messagestring = "http://tempuri.org/IWebAPIService/BookingBll_GetBookingStatistics";
    Basic.BasicConnect(addstring, messagestring,function(response){
//    	console.log(response);
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.BookingBll_GetBookingStatisticsResponse.BookingBll_GetBookingStatisticsResult;
			str1 = JSON.parse(status);
			var array=[];
			var count = {COUNT:str1.length};
			array.push(count);
			for(var i=0;i<str1.length;i++)
			{
				var str4 = {GroupPro:str1[i].GroupPro,BookingCount:str1[i].BookingCount,Teus:str1[i].Teus,Con20GP:str1[i].Con20GP,Con40HQ:str1[i].Con40HQ,Con45HQ:str1[i].Con45HQ};
				//console.log(str4);
				array.push(str4);
			}
			callback(array);
		});
    })
}

exports.CustomerStatisticsList = function(predicate, groupBy, callback){
	var addstring = '<CrContactCompanyBll_GetCustomerStatistics xmlns="http://tempuri.org/">' +
	                       '<predicate>'+predicate+'</predicate>' +
	                       '<groupBy>'+groupBy+'</groupBy>' +
	                     '</CrContactCompanyBll_GetCustomerStatistics>';
    var messagestring = "http://tempuri.org/IWebAPIService/CrContactCompanyBll_GetCustomerStatistics";
    Basic.BasicConnect(addstring, messagestring,function(response){
//    	console.log(response);
    	xmlParser.parseString(response, function (err, result) {
			var str1=result["s:Envelope"]["s:Body"];
			var status = str1.CrContactCompanyBll_GetCustomerStatisticsResponse.CrContactCompanyBll_GetCustomerStatisticsResult;
			str1 = JSON.parse(status);
			var array=[];
			var count = {COUNT:str1.length};
			array.push(count);
			for(var i=0;i<str1.length;i++)
			{
				var str4 = {GroupPro:str1[i].GroupPro,RegCount:str1[i].RegCount,CheckCount:str1[i].CheckCount,OrderCount:str1[i].OrderCount,RefuseCount:str1[i].RefuseCount};
				//console.log(str4);
				array.push(str4);
			}
			callback(array);
		});
    })
}