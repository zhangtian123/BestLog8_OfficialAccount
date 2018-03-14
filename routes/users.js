//var express = require('express');
//var router = express.Router();
//
///* GET users listing. */
//router.get('/', function(req, res, next) {
//res.send('respond with a resource');
//});
//
//module.exports = router;
//var Broker = require('../modules/brokerwcf');
/*Broker.brokerOrderList("","",1,100,"BILLNO",0,function(result){
	var COUNT=0,i=0;
	for(var o in result)
	{
		var RESULT = eval(result[o]);
		COUNT = RESULT[0].COUNT;
		RESULT.shift();
		$.each(RESULT,function(key,value){
			Broker.brokerDetail(value.BILLID,function(response){
				console.log(response);
				RESULT["DETAIL"]=response;
				console.log(RESULT);
			})
		})
	}
	console.log(result);
	res.send({result:result});
})*/
//Broker.brokerOrderList("","",1,100,"BILLNO",0,function(result){
//	console.log(result);
//	result.shift();
//	for(var p in result)
//	{
//		var data = eval(result[p]);
//		var Detail = data.DETAIL;
//		for(var o in Detail)
//		{
//			var detail = eval(Detail[o]);
//			console.log(detail.NODECODE);
//		}
//		console.log(data.BILLID);
//	}
//})
//Broker.brokerFinish("","",1,1,"BILLNO",0,function(result){console.log(result);})
/*var User = require('../modules/userregister');
User.CheckisExist("liyang",null,function(result){
	console.log(result);
})*/
//var time = require('../modules/getNowDate');
//console.log(time.getNowDate(0,0,4));
//var arr = new Array;
//arr.push("2014-5-20 17:00:00");
//arr.push("2014-3-20 18:00:00");
/*function Arr(createdate,opdate){
	this.createdate=createdate;
	this.opdate = opdate;
}
var arr = new Arr("2017-06-05 19:08:45.000","Fee_CQK");*/
//var arr=["2017-06-05 19:08:45.000","Fee_CQK"];
//var arr1 = new Array;
//arr1.push("2017-06-05 19:08:45.000");
//var arr = JSON.stringify(arr);
//arr.push("Fee_CQK");
//var arr = '2017-06-05 19:08:45.000';
////条件，values[]，页数，每页数据量，排序字段，总数据量
//User.Accountbill('STATUSNAME==@0 && BILLCODE>=@1',arr, 2, 2,'BILLCODE', 0, function(response){
////	var x = response.indexOf('{"PAYTYPE"');
////	var str = response.substring(x,response.indexOf('}')+1);
////	var str1 = JSON.parse(str);
//	console.log(response);
//})
/*var User = require('../modules/trailerwcf');
User.carOrderList("","",1,2,"BILLNO",0,function(result){
	console.log(result);
	var x = result.indexOf('{')+1;
	result = result.substring(x);
	var x = result.indexOf('{');
    var array=[];
	while(x!=-1)
	{
		console.log(result);
		var y = result.indexOf('}')+1;
		var str = result.substring(x,y);
		console.log(str);
		var str1 = JSON.parse(str);
		array.push(str1);
		result = result.substring(y);
		x = result.indexOf('{')+1;
		result = result.substring(x);
		console.log(result);
		x = result.indexOf('{');
	}
	for(var o in array)
	{
		console.log(array[o]);
	}
})*/
/*var User = require('../modules/userregister');
//var arr = new Array;
//arr.push("2013-3-24 17:00:00")
//var obj = {"date":"2013-4-20 17:00:00"}
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
console.log(guid1);
console.log(guid2);
//COMCONTACTID:'+guid1+',CONTACTCOMGUID:'+guid2+',
//BILLID:'+guid2+',
var userstr = {COMCONTACTID:guid1,CONTACTCOMGUID:guid2,USERCODE:"name",IDPASSWORD:"password",EMAIL:"telephone",RowState:"4"};
var com = {BILLID:guid2,COMNAMECN: "ComChiname",COMNAME: "ComEngname",TAXNUMBER: "321456",COMADDRESS: "ComChiadd",COMADDRESSEN: "ComEngadd",EMAIL: "ComEmail",RowState:"4"};
var user = JSON.stringify(userstr);
var company = JSON.stringify(com);
console.log(userstr);
console.log(company);
User.setUser(user,company,function(response){
	console.log(response);
})*/
//var User = require('../modules/trailerwcf');
//User.carOrderList("","",1,1,"BILLNO",function(result){})
//var str = {BILLID:"4871c3953b204854a55df2269282ecd6",GETCONTIME:"2017-7-20 00:08:00",CONTAINERNO:"aabb",SEALNO:""}
//var str1 = JSON.stringify(str);
//User.trailerFinish(str1,"Fee_CQK05","admin",function(result){
//	console.log(result);
//})

//var User = require('../modules/Remittancewcf');
//var time="";
//User.Accountbill("ISCHECK==false",time,1,1,"BILLCODE",0,function(result){
//	console.log(result);
//})
//User.Accountbilldetail("b0d6a7ba3fd94e678a7222388c80bf78",function(result){
//	console.log(result);
//})

//var str = {BILLID:"b0d6a7ba3fd94e678a7222388c80bf78",BILLNO:""}
//var str1 = JSON.stringify(str);
//User.AccountbillFinish("b0d6a7ba3fd94e678a7222388c80bf78","Fee_CQK05","admin",function(result){
//	//console.log(result);
//})

//var Freight = require('../modules/orderwcf');
//Freight.OrderList("","",1,2,"BILLID",1,function(result){
//	console.log(result);
//})
//Freight.OrderDetail("6827ee482f4e41a0970868c759eb64ea",function(result){console.log(result);})
//Freight.OrderDetail("9471a4593f9f40cbaaee54e1c89b853f",function(result){console.log(result);})
//var Freight = require('../modules/freightwcf');
//Freight.getFCLList("1==1","","1,1,1",function(result){
//	//console.log(result);
//})
//Freight.getPorts("PORTTYPE==@0","shipping",5,function(result){})
////Freight.getPackage("1==1","",1,function(result){})
////var array =[1,1,1];
//var array = new Array();
//array["key1"] = 1;
//array["key2"] = 1;
//array["key3"] = 1;
//Freight.getFCLList("1==1","",array,function(result){})
var Register = require('../modules/registerauditwcf');
//Register.Registerlist("","",1,15,"CREATEDATE",1,function(result){})
Register.getphoto("9ab8d4523b0240f2b0b56696c4318d9c","","",function(result){console.log(result);})
//var Leave = require('../modules/leavewcf');
//Leave.getQingjia("","",1,1,"BILLID",1,function(result){})
//var Register = require('../modules/registerauditwcf');
//Register.Registerlist("","",1,1,"CREATEDATE",1,function(result){})
//var Freight = require('../modules/freightwcf');
////var predicate="PORTLOADING==@0 && PORTDISCHARGE==@1 && STARTDATE>=MDFunctions.ParseDateTime(@2) && ENDDATE<=MDFunctions.ParseDateTime(@3)";
////var values="0060AF788B6147A3A9A6F711852402F1,007B880F681C44A18BE07043FC85AA71,2014-02-12 12:12:22,2017-09-12 12:12:22";
//var predicate="PORTLOADING==@0 && PORTDISCHARGE==@1";
//var values="AL AQABAH,ADELAIDE";
//Freight.getFCLList(predicate,values,"1,1,1",function(result){
//	console.log(result);
//})
