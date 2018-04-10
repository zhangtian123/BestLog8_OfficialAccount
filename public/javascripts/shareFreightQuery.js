$(document).ready(function() {
	$.ajax({
		type: "get",
		url: "/getFreightQuery2",
		data: {
			ids: ids
		},
		async: true,
		success: function(data) {
			var index = 0;
			var aDiv = document.body.querySelector('.query-items');
			//var oDiv = document.getElementsByClassName('maincontent')[0];
			aDiv.innerHTML = '';
			for(var o in data) {
				var result = eval(data[o]);
				result.shift();
				$.each(result, function(key, value) {
					var transtype = "";
					if(value.ISDIRECT == "true") {
						transtype = "直达";
					} else {
						transtype = "非直达";
					}
					var oDiv = document.createElement('div');
					oDiv.id = 'card';
					Inner(index, value.BILLID, value.PORTLOADING, transtype, value.PORTDISCHARGE, value.BASEPORT, value.CUSTOMER, value.SAILINGDATE, value.DAYNUM, value.STARTDATE, value.ENDDATE, value.PRICE20GP, value.PRICE40GP, value.PRICE40HQ, oDiv,value.TotalPrice);
					aDiv.appendChild(oDiv);
					index++;
				})
			}
		}
	});
})

var Inner = function(index, id, begin, line, end, port, company, time, sail, expirydatebegin, expirydateend, GPprice20, GPprice40, HCprice40, oDiv,TotalPrice) {
	oDiv.innerHTML = oDiv.innerHTML +
	'<div class="item">' +
	'<span class="left-text" id="blue-text">' + begin + '-' + line + '-' + end + '</span>' +
	'<span class="right-text" id="blue-text">' + (port == null ? '' : port) + '</span>' +
	'</div>' +
	'<div class="item">'+
	'船公司<span id="blue-text">'+(company==null ? '' : company)+
	'</span>船期<span id="blue-text">'+(time==null ? '' : time)+
	'</span>航程<span id="blue-text">'+(sail==null ? '' : sail)+'天</span>'+(port==null ? '' : port)
	+
	'</div>';
	if(index==0)
		oDiv.innerHTML = oDiv.innerHTML+'<div class="mark-benefit"></div>';
	else if(index==1)
		oDiv.innerHTML = oDiv.innerHTML+'<div class="mark-fast"></div>';
	oDiv.innerHTML = oDiv.innerHTML+

	'<div class="item">'+
	'<span>有效期：</span>'+
	'<span>'+(expirydatebegin==null ? '' : expirydatebegin.replace('T',' ').substr(0,expirydatebegin.length-9))+'-'+(expirydateend==null ? '' : expirydateend.replace('T',' ').substr(0,expirydateend.length-9))+'</span>'+
	'</div>'+
	'<div class="item">'+
	'<span>20GP/40GP/40HC：</span>'+
	'<span>'+(GPprice20==null ? '' : GPprice20)+'/'+(GPprice40==null ? '' : GPprice40)+'/'+(HCprice40==null ? '' : HCprice40)+'</span>'+
	'</div>'+
	'<hr style="border:1px dashed #ebebeb;">'+
	'<div class="item">'+
	'<span>运费：</span>'+
	'<span>'+TotalPrice+'</span>'+
	'</div>'+
	'</div>';	}