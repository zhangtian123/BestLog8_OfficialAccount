/**
 * nodejs访问wcf
 * 请假审核
 * */

var Basic = require('./common');

//获取请假列表
exports.getQingjia = function(predicate, values, pageNum, pageSize, orderByProperty, rowsCount, callback){
	var addstring = '<OaQingJiaBll_GetQingJiaList xmlns="http://tempuri.org/">' +
	                       '<predicate>'+predicate+'</predicate>' +
	                       '<values>'+values+'</values>' +
	                       '<pageNum>'+pageNum+'</pageNum>' +
	                       '<pageSize>'+pageSize+'</pageSize>' +
	                       '<orderByProperty>'+orderByProperty+'</orderByProperty>' +
	                       '<rowsCount>'+rowsCount+'</rowsCount>' +
	                     '</OaQingJiaBll_GetQingJiaList>';
    var messagestring = "http://tempuri.org/IWebAPIService/OaQingJiaBll_GetQingJiaList";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	console.log(response);
		callback(response);
    })
}

//通过请假
exports.agreeQingjia = function(QingJia, NodeCode, UserCode, callback){
	var addstring = '<OaQingJiaBll_QingJiaNodeFinish xmlns="http://tempuri.org/">' +
	                       '<QingJia>'+QingJia+'</QingJia>' +
	                       '<NodeCode>'+NodeCode+'</NodeCode>' +
	                       '<UserCode>'+UserCode+'</UserCode>' +
	                     '</OaQingJiaBll_QingJiaNodeFinish>';
    var messagestring = "http://tempuri.org/IWebAPIService/OaQingJiaBll_QingJiaNodeFinish";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	console.log(response);
		callback(response);
    })
}

//驳回请假
exports.rejectQingjia = function(BillID, NodeCode, UserCode, Remark, callback){
	var addstring = '<OaQingJiaBll_CancelQingJiaNode xmlns="http://tempuri.org/">' +
	                       '<BillID>'+BillID+'</BillID>' +
	                       '<NodeCode>'+NodeCode+'</NodeCode>' +
	                       '<UserCode>'+UserCode+'</UserCode>' +
	                       '<Remark>'+Remark+'</Remark>' +
	                     '</OaQingJiaBll_CancelQingJiaNode>';
    var messagestring = "http://tempuri.org/IWebAPIService/OaQingJiaBll_CancelQingJiaNode";
    Basic.BasicConnect(addstring, messagestring,function(response){
    	console.log(response);
		callback(response);
    })
}