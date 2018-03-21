var array = [];

$(document).ready(function() {

	//页面加载完成时获取请款列表，初始为未审核(现已由下拉刷新步骤代替初始化)
	var aDiv = document.body.querySelector('.maincontent');
	var time = $('input[name="radio"]:checked').val();
	var begin = time;
	var end = 'now';
	//选择时间区间时获取时间
	if(time == 'choose') {
		begin = $('#begin').text();
		end = $('#end').text();
	}
	$.ajax({
		type: "get",
		url: "/getRemittanceList",
		data: {
			type: 'remittance',
			begin: begin,
			end: end,
		},
		async: true,
		success: function(data) {
			DATA = data;
			var result;
			for(var o in DATA) {
				result = eval(DATA[o]);
				Totalcount = result[0].COUNT;
			}
			//alert(Totalcount);
			if(mui.os.plus) {
				mui.plusReady(function() {
					setTimeout(function() {
						mui('#pullrefresh').pullRefresh().pullupLoading();
					}, 1000);
				});
			} else {
				mui.ready(function() {
					//mui('#pullrefresh').pullRefresh().pullupLoading();
					setTimeout(function() {
						mui('#pullrefresh').pullRefresh().pullupLoading();
					}, 1000);
				});
			}
			//			for(var i=0;i<Totalcount;i++)
			//			{
			//				array[i]=0;
			//			}
		},
		error: function() {
			mui.alert("系统处理错误");
		}
	})

	/*通过侧边栏选择筛选条件*/
	$("#submit").click(function() {
		offCanvasWrapper.offCanvas('close'); //关闭菜单栏
//		显示loading动画
		document.getElementById("over").style.display = "block";
		document.getElementById("layout").style.display = "block";
		currentlist = 0;
		var time = $('input[name="radio"]:checked').val();
		var begin = time;
		var end = 'now';
		//选择时间区间时获取时间
		if(time == 'choose') {
			begin = $('#begin').text();
			end = $('#end').text();
		}
		$.ajax({
			type: "get",
			url: "getRemittanceList",
			data: {
				type: 'remittance',
				begin: begin,
				end: end,
			},
			async: true,
			success: function(data) {
//				隐藏loading动画
				document.getElementById("over").style.display = "none";
				document.getElementById("layout").style.display = "none";
				DATA = data;
				var aDiv = document.body.querySelector('.maincontent');
				aDiv.innerHTML = "";
				var flag1 = 0;
				var flag = 0;
				for(var o in DATA) {
					var result = eval(DATA[o]);
					result.shift();
					var myflag = 0; //用于判断是否有数据
					$.each(result, function(key, value) {
						myflag++;
						if(flag1 >= currentlist && flag < 3) {
							var oDiv = document.createElement('div');
							oDiv.className = 'mui-card content-item';
//							oDiv.className='card';
							Inner(value.BILLNO, value.BILLID, value.CURRENCY, value.TOTALAMOUNT, value.CUSTOMER, value.BILLDATE, value.LASTDATE, value.PAYTYPE, value.BANKNAME, value.ACCOUNTNO, oDiv);
							alert(value.BILLNO)
							aDiv.appendChild(oDiv);
							flag++;
						} else if(flag1 < currentlist) {
							flag1++;
							return true;
						} else {
							currentlist += 3;
							return false;
						}
					});
					if(myflag == 0) {
						var oDiv = document.createElement('div');
						oDiv.className = 'nodata';
						oDiv.innerHTML = "没有数据~";
						aDiv.appendChild(oDiv);
					}
				}
			},
			error: function() {
//				隐藏loading动画
				document.getElementById("over").style.display = "none";
				document.getElementById("layout").style.display = "none";
				mui.alert("系统处理错误");
			}
		});
	})

	/*查看详细条目*/
	$('body').on("tap", '#Detail', function() {
		var n = $(this).parents('.content-item').index();
		var text2 = $(".maincontent").find(".content-item:eq(" + n + ")").find('.getBILLID').eq(0).val();
		//是否是第一次点击查看，只有第一次点击查看详细条目才加入html
		if(!array[text2]) {
			array[text2] = 1;
			var text1 = $(".maincontent").find(".content-item:eq(" + n + ")").find("#totalprice").text();
			var totalprice = text1.split(" ");
			//alert(totalprice);
			//var text2 = $(".maincontent").find(".content-item:eq("+n+")").find('.getBILLID').eq(0).val();
			var aDiv = $(this).siblings('.mui-collapse-content');
			$.ajax({
				type: "get",
				url: "/getRemittanceDetail",
				data: {
					BILLid: text2,
				},
				async: true,
				success: function(data) {
					var oDiv = document.createElement('div');
					oDiv.className = 'item-row';
					InnerDetail1(oDiv);
					aDiv.append(oDiv);
					var oDiv = document.createElement('hr');
					aDiv.append(oDiv);
					var m = 1;
					for(var o in data) {
						var result = eval(data[o]);
						result.shift();
						$.each(result, function(key, value) {
							var oDiv = document.createElement('div');
							oDiv.className = 'item-row';
							InnerDetail2(m, value.FeeName, value.Currency, value.Price, oDiv);
							aDiv.append(oDiv);
							m++;
						})
					}
					var oDiv = document.createElement('div');
					oDiv.className = 'item-row';
					InnerDetail3(m, totalprice[0], totalprice[1], oDiv);
					aDiv.append(oDiv);
					var oDiv = document.createElement('hr');
					aDiv.append(oDiv);
					var oDiv = document.createElement('div');
					oDiv.className = 'buttonbar';
					var time = $('input[name="radio"]:checked').val();
					if(time == "needconfirm" || time == "now")
						InnerDetail4(oDiv);
					aDiv.append(oDiv);
				},
				error: function() {
					mui.alert("系统处理错误");
				}
			});
		}

	})

	/*通过请款时，要提醒用户是否确认，确认后删除页面上选中的请款并在数据库中改为已审核*/
	$('body').on("tap", '#agree', function() {
		var btnArray = ['是', '否'];
		mui.confirm('确定审核通过此请款？', '确认', btnArray, function(e) {
			if(e.index == 0) {
				var n = $(this).parents('.content-item').index();
				n = n + 1;
				var text1 = $(".maincontent").find(".content-item:eq(" + n + ")").find('.mui-card-header').eq(0).text();
				var remittanceid = text1.substr(text1.indexOf('：') + 1, 9);
				//alert(remittanceid);
				var text2 = $(".maincontent").find(".content-item:eq(" + n + ")").find('.getBILLID').eq(0).val();
				//alert(text2);
				//$(".maincontent").find(".content-item:eq("+n+")").remove();
				$.ajax({
					type: "post",
					url: "/agreeRemittance",
					data: {
						BILLid: text2,
					},
					async: true,
					success: function(data) {
						var result = eval(data);
						if(result.result == 0) {
							$(".maincontent").find(".content-item:eq(" + n + ")").remove();
							mui.alert("成功通过");
						} else {
							mui.alert("系统处理错误");
						}
					},
					error: function() {
						mui.alert("系统处理错误");
					}
				});
			} else {
				mui.alert("未通过");
			}
		})
	})

	/*驳回请款时，要让用户输入驳回理由，向后台传回请款单号和驳回理由*/
	$('body').on("tap", "#reject", function(e) {
		e.preventDefault();
		var btnArray = ['确定', '取消'];
		mui.prompt('请输入驳回理由：', '详细条目不对', '驳回', btnArray, function(e) {
			if(e.index == 0) {
				var n = $(this).parents('.content-item').index();
				n = n + 1;
				var text1 = $(".maincontent").find(".content-item:eq(" + n + ")").find('.mui-card-header').eq(0).text();
				var remittanceid = text1.substr(text1.indexOf('：') + 1, 9);
				var text2 = $(".maincontent").find(".content-item:eq(" + n + ")").find('.getBILLID').eq(0).val();
				//$(".maincontent").find(".content-item:eq("+n+")").remove();
				$.ajax({
					type: "post",
					url: "/rejectRemittance",
					data: {
						remittanceid: text2,
						reason: e.value,
					},
					async: true,
					success: function(data) {
						var result = eval(data);
						if(result.result == 0) {
							$(".maincontent").find(".content-item:eq(" + n + ")").remove();
							mui.alert("成功驳回");
						} else {
							mui.alert("系统处理错误");
						}
					},
					error: function() {
						mui.alert("系统处理错误");
					}
				});
			} else {
				mui.alert("取消");
			}
		})
	})

})

var Inner = function(id, billid, currency, money, deal, submittime, latesttime, way, branch, account, oDiv) {
	oDiv.innerHTML = oDiv.innerHTML +
//		'<div class="toplabel"></div>' +
		'<!--页眉，放置标题--><div class="information">' +
		'<div class="mui-card-header imp-info-col">请款单编号</div>' +
		'<div class="mui-card-header imp-info-col info-r">'+id+'</div>' +'</div>'+
		'<div class="ticket-style"><div class="circle-l"></div><div class="dashLine"></div><div class="circle-r"></div></div>'+
		'<input class="getBILLID" type="hidden" id="' + id + '" value="' + billid + '"/>' +
		'<!--内容区-->' +
		'<div class="info-content">' +
		'<div class="item">' +
		'<span class="item-title">请款金额：</span>' +
		'<span id="totalprice" class="info-r">' + currency + ' ' + money + '</span>' +
		'</div>' +
		'<div class="item">' +
		'<span class="item-title">往来单位：</span>' +
		'<span  class="info-r">' + deal + '</span>' +
		'</div>' +
		'<div class="item">' +
		'<span class="item-title">提交日期：</span>' +
		'<span  class="info-r">' + submittime.replace('T', ' ').substr(0, submittime.length - 3) + '</span>' +
		'</div>' +
		'<div class="item">' +
		'<span class="item-title">最迟付款日：</span>' +
		'<span  class="info-r">' + latesttime.replace('T', ' ').substr(0, latesttime.length - 3) + '</span>' +
		'</div>' +
		'<div class="item">' +
		'<span class="item-title">结算方式：</span>' +
		'<span  class="info-r">' + way + '</span>' +
		'</div>' +
		'<div class="item">' +
		'<span class="item-title">开户行：</span>' +
		'<span  class="info-r">' + (branch == null ? '' : branch) + '</span>' +
		'</div>' +
		'<div class="item">' +
		'<span class="item-title">银行账号：</span>' +
		'<span  class="info-r">' + (account == null ? '' : account) + '</span>' +
		'</div>' +
		'</div>' +
		'<div class="ticket-style" style="margin-top:2px;"><div class="circle-l"></div><div class="dashLine"></div><div class="circle-r"></div></div>'+
		'<ul class="mui-table-view"> ' +
		'<li class="mui-table-view-cell mui-collapse">' +
		'<a class="mui-navigate-right" id="Detail" href="#">点击查看详细条目</a>' +
		'<div class="mui-collapse-content">' +
		'</div>' +
		'</li>' +
		'</ul>';
}

var InnerDetail1 = function(oDiv) {
	oDiv.innerHTML = oDiv.innerHTML +
		'<li>序号</li>' +
		'<li>账单条目</li>' +
		'<li>币别</li>' +
		'<li>金额</li>';
}

var InnerDetail2 = function(title, FeeName, Currency, Price, oDiv) {
	oDiv.innerHTML = oDiv.innerHTML +
		'<li>' + title + '</li>' +
		'<li>' + FeeName + '</li>' +
		'<li>' + Currency + '</li>' +
		'<li>' + Price + '</li>';
}

var InnerDetail3 = function(title, totalprice0, totalprice1, oDiv) {
	oDiv.innerHTML = oDiv.innerHTML +
		'<li>' + title + '</li>' +
		'<li>总计</li>' +
		'<li>' + totalprice0 + '</li>' +
		'<li>' + totalprice1 + '</li>';
	//'<li>TotalPrice</li>';
}

var InnerDetail4 = function(oDiv) {
	oDiv.innerHTML = oDiv.innerHTML +
		'<button id="agree" type="button" class="mui-btn mui-btn-primary smallbtn-audit">通过</button>' +
		'<button id="reject" type="button" class="mui-btn mui-btn-primary smallbtn-audit">驳回</button>';
}