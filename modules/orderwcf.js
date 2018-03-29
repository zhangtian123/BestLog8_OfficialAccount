/**
 * nodejs访问wcf
 * 订单相关
 * */

var Basic = require('./common');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser({
	explicitArray: false,
	ignoreAttrs: true
});
//获取订单列表
exports.OrderList = function(predicate, values, pageNum, pageSize, orderByProperty, userCode, rowsCount, callback) {
	var addstring = '<BookingBll_GetSeBookingList xmlns="http://tempuri.org/">' +
		'<predicate>' + predicate + '</predicate>' +
		'<values>' + values + '</values>' +
		'<pageNum>' + pageNum + '</pageNum>' +
		'<pageSize>' + pageSize + '</pageSize>' +
		'<orderByProperty>' + orderByProperty + '</orderByProperty>' +
		'<userCode>' + userCode + '</userCode>' +
		'<rowsCount>' + rowsCount + '</rowsCount>' +
		'</BookingBll_GetSeBookingList>';
	var messagestring = "http://tempuri.org/IWebAPIService/BookingBll_GetSeBookingList";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		//console.log(response);
		xmlParser.parseString(response, function(err, result) {
			var str1 = result["s:Envelope"]["s:Body"];
			var status = str1.BookingBll_GetSeBookingListResponse.BookingBll_GetSeBookingListResult;
			str1 = JSON.parse(status);
			var array = [];
			var count = {
				COUNT: str1.length
			};
			array.push(count);
			for(var i = 0; i < str1.length; i++) {
				//获取订单ID，订单号，客户简称，客户委托号，SONOS，HBLNO
				var str4 = {
					ORDERID: str1[i].BILLID,
					ORDERNO: str1[i].ORDERNO,
					CUSTOMSCOMPANY: str1[i].REQUESTER,
					CUSTOMSOP: str1[i].REFNO,
					SONO: str1[i].BOOKINGNO,
					HBLNO: str1[i].HBLNO,
					CNTRNUMSTR: str1[i].CNTRNUMSTR
				};
				//console.log(str4);
				array.push(str4);
			}
			callback(array);
		});
	})
}

//获取订单列表
exports.OrderDetail = function(BillID, callback) {
	var addstring = '<CommonBll_GetNodeViewInfos xmlns="http://tempuri.org/">' +
		'<BillID>' + BillID + '</BillID>' +
		'<IsExcept>false</IsExcept>' +
		'</CommonBll_GetNodeViewInfos>';
	var messagestring = "http://tempuri.org/IWebAPIService/CommonBll_GetNodeViewInfos";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		//console.log(response);
		xmlParser.parseString(response, function(err, result) {
			var str1 = result["s:Envelope"]["s:Body"];
			var status = str1.CommonBll_GetNodeViewInfosResponse.CommonBll_GetNodeViewInfosResult;
			str1 = JSON.parse(status);
			var array = [];
			for(var i = 0; i < str1.length; i++) {
				var nodecode = str1[i].NODECODE;
				//只取12节点中的节点，另10个节点的值需请教小林大佬
				if(nodecode == 'FMS_SO01' || nodecode == 'FMS_SO04' || nodecode == 'FMS_SO47' || nodecode == 'FMS_SO48' || nodecode == 'FMS_SO52' || nodecode == 'FMS_SO51' || nodecode == 'FMS_SO50' || nodecode == 'FMS_SO49' ||
					nodecode == 'FMS_SO53' || nodecode == 'FMS_SO12' || nodecode == 'FMS_SO09' || nodecode == 'FMS_SO54') {
					var str4 = {
						NODECODE: str1[i].NODECODE,
						FINISHEDDATE: str1[i].FINISHEDDATE
					};
					array.push(str4);
				}
			}
			callback(array);
		});
	})
}
exports.ValidOcShareLog = function(shareId, hours, callback) {
	//console.log(username);
	var addstring = '<OcLogBll_ValidOcShareLog xmlns="http://tempuri.org/">' +
		'<shareId>' + shareId + '</shareId>' +
		'<hours>' + hours + '</hours>' +
		'</OcLogBll_ValidOcShareLog>';
	var messagestring = "http://tempuri.org/IWebAPIService/OcLogBll_ValidOcShareLog";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		xmlParser.parseString(response, function(err, result) {
			var str1 = result["s:Envelope"]["s:Body"];
			var status = str1.OcLogBll_ValidOcShareLogResponse.OcLogBll_ValidOcShareLogResult;
			if(status == 'true') {
				response = 1;
			} else {
				response = 0;
			}
			callback(response);
		});
	})
}
exports.SetOcShareLog = function(callback) {
	//console.log(username);
	var addstring = '<OcLogBll_SetOcShareLog xmlns="http://tempuri.org/">' +
		'</OcLogBll_SetOcShareLog>';
	var messagestring = "http://tempuri.org/IWebAPIService/OcLogBll_SetOcShareLog";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		xmlParser.parseString(response, function(err, result) {
			var str1 = result["s:Envelope"]["s:Body"];
			var status = str1.OcLogBll_SetOcShareLogResponse.OcLogBll_SetOcShareLogResult;
			callback(status);
		});
	})
}

//获取订单列表
exports.ShippingOrderList = function(predicate, values, pageNum, pageSize, orderByProperty, userCode, rowsCount, callback) {
	var addstring = '<OcShippingOrderBll_GetOcShippingOrderList xmlns="http://tempuri.org/">' +
		'<predicate>' + predicate + '</predicate>' +
		'<values>' + values + '</values>' +
		'<pageNum>' + pageNum + '</pageNum>' +
		'<pageSize>' + pageSize + '</pageSize>' +
		'<orderByProperty>' + orderByProperty + '</orderByProperty>' +
		'<userCode>' + userCode + '</userCode>' +
		'<rowsCount>' + rowsCount + '</rowsCount>' +
		'</OcShippingOrderBll_GetOcShippingOrderList>';
	var messagestring = "http://tempuri.org/IWebAPIService/OcShippingOrderBll_GetOcShippingOrderList";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		//console.log(response);
		xmlParser.parseString(response, function(err, result) {
			var str1 = result["s:Envelope"]["s:Body"];
			var status = str1.OcShippingOrderBll_GetOcShippingOrderListResponse.OcShippingOrderBll_GetOcShippingOrderListResult;
			str1 = JSON.parse(status);
			var array = [];
			var count = {
				COUNT: str1.length
			};
			array.push(count);
			for(var i = 0; i < str1.length; i++) {
				//获取订单
				var str4 = {
					BILLID: str1[i].BILLID,
					BILLNO: str1[i].BILLNO,
					REFNO: str1[i].REFNO,
					CARGONAME: str1[i].CARGONAME,
					CNTRNUMSTR: str1[i].CntrNumStr,
					CTNS: str1[i].CTNS,
					PACK: str1[i].PACK,
					WEIGHT: str1[i].WEIGHT,
					MEASURE: str1[i].MEASURE,
					SHIPOWNER: str1[i].SEA_SHIPOWNER,
					SEA_SAILLINE: str1[i].SEA_SAILLINE,
					SEA_VESSEL: str1[i].SEA_VESSEL,
					SEA_VOYNO: str1[i].SEA_VOYNO
				};
				//console.log(str4);
				array.push(str4);
			}
			callback(array);
		});
	})
}

exports.ShippingOrderDetail = function(BillID, callback) {
	var addstring = '<CommonBll_GetNodeViewInfos xmlns="http://tempuri.org/">' +
		'<BillID>' + BillID + '</BillID>' +
		'<IsExcept>true</IsExcept>' +
		'</CommonBll_GetNodeViewInfos>';
	var messagestring = "http://tempuri.org/IWebAPIService/CommonBll_GetNodeViewInfos";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		xmlParser.parseString(response, function(err, result) {
			var str1 = result["s:Envelope"]["s:Body"];
			var status = str1.CommonBll_GetNodeViewInfosResponse.CommonBll_GetNodeViewInfosResult;
			str1 = JSON.parse(status);
			var array = [];
			for(var i = 0; i < str1.length; i++) {
				var nodecode = str1[i].NODECODE;
				if(nodecode == 'FMS_OD03' || nodecode == 'FMS_OD04' || nodecode == 'FMS_OD05' || nodecode == 'FMS_OD22' || nodecode == 'FMS_OD26') {
					var str4 = {
						NODECODE: str1[i].NODECODE,
						FINISHEDDATE: str1[i].FINISHEDDATE
					};
					array.push(str4);
				}
			}
			callback(array);
		});
	})
}

exports.placeShippingOrder = function(shippingOrder, callback) {
	var addstring = '<OcShippingOrderBll_PlaceShippingOrder xmlns="http://tempuri.org/">' +
		'<ShippingOrder>' + shippingOrder + '</ShippingOrder>' +
		'</OcShippingOrderBll_PlaceShippingOrder>';
	var messagestring = "http://tempuri.org/IWebAPIService/OcShippingOrderBll_PlaceShippingOrder";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		console.log(response);
		xmlParser.parseString(response, function(err, result) {
			console.log(response);
			var str1 = result["s:Envelope"]["s:Body"];
			var status = str1.OcShippingOrderBll_PlaceShippingOrderResponse.OcShippingOrderBll_PlaceShippingOrderResult;
			str1 = JSON.parse(status);
			callback(str1.Status);
		});
	})
}

exports.getBaseCodes = function(predicate, values, iCounts, callback) {
	var addstring = '<WebBll_GetBaseCodes xmlns="http://tempuri.org/">' +
		'<predicate>' + predicate + '</predicate>' +
		'<values>' + values + '</values>' +
		'<iCounts>' + iCounts + '</iCounts>' +
		'</WebBll_GetBaseCodes>';
	var messagestring = "http://tempuri.org/IWebAPIService/WebBll_GetBaseCodes";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		xmlParser.parseString(response, function(err, result) {
			var str1 = result["s:Envelope"]["s:Body"];
			var str2 = str1.WebBll_GetBaseCodesResponse.WebBll_GetBaseCodesResult;
			var array = [];
			str1 = JSON.parse(str2);
			for(var i = 0; i < str1.length; i++) {
				var str3 = str1[i];
				var str4 = {
					text: str3.CODEATTRNAME,
					value: str3.CODEATTRNAME
				};
				array.push(str4);
			}
			callback(array);
		});
	})
}

exports.getSailLines = function(predicate, values, iCounts, callback) {
	var addstring = '<WebBll_GetSailLines xmlns="http://tempuri.org/">' +
		'<predicate>' + predicate + '</predicate>' +
		'<values>' + values + '</values>' +
		'<iCounts>' + iCounts + '</iCounts>' +
		'</WebBll_GetSailLines>';
	var messagestring = "http://tempuri.org/IWebAPIService/WebBll_GetSailLines";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		xmlParser.parseString(response, function(err, result) {
			var str1 = result["s:Envelope"]["s:Body"];
			var str2 = str1.WebBll_GetSailLinesResponse.WebBll_GetSailLinesResult;
			var array = [];
			str1 = JSON.parse(str2);
			for(var i = 0; i < str1.length; i++) {
				var str3 = str1[i];
				var str4 = {
					text: str3.LINECNNAME,
					value: str3.SAILCODE
				};
				array.push(str4);
			}
			callback(array);
		});
	})
}

exports.getShips = function(predicate, values, iCounts, callback) {
	var addstring = '<WebBll_GetShips xmlns="http://tempuri.org/">' +
		'<predicate>' + predicate + '</predicate>' +
		'<values>' + values + '</values>' +
		'<iCounts>' + iCounts + '</iCounts>' +
		'</WebBll_GetShips>';
	var messagestring = "http://tempuri.org/IWebAPIService/WebBll_GetShips";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		xmlParser.parseString(response, function(err, result) {
			var str1 = result["s:Envelope"]["s:Body"];
			var str2 = str1.WebBll_GetShipsResponse.WebBll_GetShipsResult;
			var array = [];
			str1 = JSON.parse(str2);
			for(var i = 0; i < str1.length; i++) {
				var str3 = str1[i];
				var str4 = {
					text: str3.NAMEEN,
					value: str3.SHIPCODE
				};
				array.push(str4);
			}
			callback(array);
		});
	})
}

exports.getRoleUsers = function(billcode, rolecode, callback) {
	var addstring = '<WebBll_GetRoleUsers xmlns="http://tempuri.org/">' +
		'<billCode>' + billcode + '</billCode>' +
		'<roleCode>' + rolecode + '</roleCode>' +
		'</WebBll_GetRoleUsers>';
	var messagestring = "http://tempuri.org/IWebAPIService/WebBll_GetRoleUsers";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		xmlParser.parseString(response, function(err, result) {
			var str1 = result["s:Envelope"]["s:Body"];
			var str2 = str1.WebBll_GetRoleUsersResponse.WebBll_GetRoleUsersResult;
			var array = [];
			str1 = JSON.parse(str2);
			for(var i = 0; i < str1.length; i++) {
				var str3 = str1[i];
				var str4 = {
					text: str3.USERNAME + "|" + str3.USERCODE,
					value: str3.USERCODE
				};
				array.push(str4);
			}
			callback(array);
		});
	})
}

exports.getCustomers = function(predicate, values, iCounts, callback) {
	var addstring = '<WebBll_GetCustomers xmlns="http://tempuri.org/">' +
		'<predicate>' + predicate + '</predicate>' +
		'<values>' + values + '</values>' +
		'<iCounts>' + iCounts + '</iCounts>' +
		'</WebBll_GetCustomers>';
	var messagestring = "http://tempuri.org/IWebAPIService/WebBll_GetCustomers";
	Basic.BasicConnect(addstring, messagestring, function(response) {
		xmlParser.parseString(response, function(err, result) {
			var str1 = result["s:Envelope"]["s:Body"];
			var str2 = str1.WebBll_GetCustomersResponse.WebBll_GetCustomersResult;
			var array = [];
			str1 = JSON.parse(str2);
			for(var i = 0; i < str1.length; i++) {
				var str3 = str1[i];
				var str4 = {
					text: str3.SHORTNAME,
					value: str3.SHORTNAME
				};
				array.push(str4);
			}
			callback(array);
		});
	})
}