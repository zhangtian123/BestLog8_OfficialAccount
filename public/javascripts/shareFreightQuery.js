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
					oDiv.className = 'mui-card content-item';
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
		'<div class="toplabel"></div>' +
		'<!--页眉，放置标题-->' +
		'<div class="mui-card-header">' +
		'<span class="left-text">' + begin + '-' + line + '-' + end + '</span>' +
		'<span class="right-text">' + (port == null ? '' : port) + '</span>' +
		'</div>' +
		'<!--内容区-->' +
		'<div class="mui-card-content">';
	if(index == 0)
		oDiv.innerHTML = oDiv.innerHTML + '<div class="mark-benefit"></div>';
	else if(index == 1)
		oDiv.innerHTML = oDiv.innerHTML + '<div class="mark-fast"></div>';
	oDiv.innerHTML = oDiv.innerHTML +
		'<div class="item"  style="margin-left:5px;">' +
		'<div class="img1"></div>' +
		'<span>船公司/船期/航程：</span>' +
		'<span>' + (company == null ? '' : company) + '/' + (time == null ? '' : time) + '/' + (sail == null ? '' : sail) + '</span>' +
		'</div>' +
		'<div class="item"  style="margin-left:5px;">' +
		'<div class="img2"></div>' +
		'<span>有效期：</span>' +
		'<span>' + (expirydatebegin == null ? '' : expirydatebegin.replace('T', ' ').substr(0, expirydatebegin.length - 3)) + '至' + (expirydateend == null ? '' : expirydateend.replace('T', ' ').substr(0, expirydateend.length - 3)) + '</span>' +
		'</div>' +
		'<div class="item"  style="margin-left:5px;">' +
		'<div class="img3"></div>' +
		'<span>20GP/40GP/40HC：</span>' +
		'<span>' + (GPprice20 == null ? '' : GPprice20) + '/' + (GPprice40 == null ? '' : GPprice40) + '/' + (HCprice40 == null ? '' : HCprice40) + '</span>' +
		'</div>' +
		'<div class="item"  style="margin-left:5px;">' +
		'<div class="img4"></div>' +
		'<span>运费：</span>' +
		'<span>'+TotalPrice+'</span>' +
		'</div>' +
		'</div>';
}