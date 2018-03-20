/**
 * 2017/7/13
 * nodejs访问wcf
 * 通用js
 * */
exports.BasicConnect = function(addstring, messagestring,callback){
	var BasicHttpBinding = require('wcf.js').BasicHttpBinding
	  , Proxy = require('wcf.js').Proxy
	  , binding = new BasicHttpBinding({})
	  , proxy = new Proxy(binding, "http://101.132.79.96:8888/BestLOG80/WebAPI?wsdl")
	  , message = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">' +
	             '<Header />' +
	               '<Body>' +
	                 addstring+
	                '</Body>' +
	           '</Envelope>';
	
	proxy.send(message, messagestring, function(response, ctx) {
		callback(response);
	});
}