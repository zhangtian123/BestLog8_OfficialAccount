var array = [];

$(document).ready(function() {
    var isCheck = $('input[name="radio"]:checked').val();
	//页面加载完成时获取请款列表，初始为未审核
	$.ajax({
		type: "get",
		url: "/getShippingOrderList",
		data:{
			isCheck:isCheck,
		},
		async: true,
		success: function(data) {
			DATA = data;
			for(var o in DATA) {
				var result = eval(DATA[o]);
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
					setTimeout(function() {
						mui('#pullrefresh').pullRefresh().pullupLoading();
					}, 1000);
				});
			}
		},
		error: function() {
			mui.alert("系统处理错误");
		}
	})

	/*通过侧边栏选择筛选条件*/
	$("#submit").click(function() {
		var no = $('input[name="orderno"]').val();
		var select=$('#filter-select').val();
		var isCheck = $('input[name="radio"]:checked').val();
		var orderno="",customsop="";
		//选择时间区间时获取时间
		//alert(orderno+customsop+sono+hblno);
		if(select=="订单号")orderno=no;
		else if(select=="客户委托号")customsop=no;
		$.ajax({
			type: "get",
			url: "getShippingOrderList",
			data: {
				orderno: orderno,
				customsop: customsop,
				isCheck:isCheck,
			},
			async: true,
			success: function(data) {
				currentlist = 0;
				count = 0;
				downflag = 0;
				upflag = 0;
				Totalcount = 0;
				DATA = data;
				var aDiv = document.body.querySelector('.maincontent');
				aDiv.innerHTML = "";
				for(var o in DATA) {
					var result = eval(DATA[o]);
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
						setTimeout(function() {
							mui('#pullrefresh').pullRefresh().pullupLoading();
						}, 1000);
					});
				}
			},
			error: function() {
				mui.alert("系统处理错误");
			}
		});
	})

	/*查看详细条目*/
	$('body').on("tap", '#Detail', function() {
		var n = $(this).parents('.card-class').index();
		//n = n + 1;
		var text2 = $(".maincontent").find(".card-class:eq(" + n + ")").find('.getBILLID').eq(0).val();
		if(!array[text2]) {
			array[text2] = 1;
			var aDiv = $(this).siblings('.mui-collapse-content');
			$.ajax({
				type: "get",
				url: "/getShippingOrderDetail",
				data: {
					BILLid: text2,
				},
				async: true,
				success: function(data) {
					var time1 = "",
						time2 = "",
						time3 = "",
						time4 = "",
						time5 = "";
					for(var o in data) {
						var result = eval(data[o]);
						$.each(result, function(key, value) {
							switch(value.NODECODE) {
								case 'FMS_OD03':
									time1 = value.FINISHEDDATE;
									if(time1!=null){aDiv.find(".circle-unfinished:eq(0)").attr("class","circle");
									aDiv.find(".time:eq(0)").text(time1.replace('T',' ').substring(0,16));}
									break;
								case 'FMS_OD04':
									time2 = value.FINISHEDDATE;
									if(time2!=null){aDiv.find(".circle-unfinished:eq(0)").attr("class","circle");
									aDiv.find(".time:eq(1)").text(time2.replace('T',' ').substring(0,16));}
									break;
								case 'FMS_OD05':
									time3 = value.FINISHEDDATE;
									if(time3!=null){aDiv.find(".circle-unfinished:eq(0)").attr("class","circle");
									aDiv.find(".time:eq(2)").text(time3.replace('T',' ').substring(0,16));}
									break;
								case 'FMS_OD22':
									time4 = value.FINISHEDDATE;
									if(time4!=null){aDiv.find(".circle-unfinished:eq(0)").attr("class","circle");
									aDiv.find(".time:eq(3)").text(time4.replace('T',' ').substring(0,16));}
									break;
								case 'FMS_OD26':
									time5 = value.FINISHEDDATE;
									if(time5!= null)aDiv.find(".circle-unfinished:eq(0)").attr("class","circle");
									aDiv.find(".time:eq(4)").text(time5.replace('T',' ').substring(0,16));
									break;
								default:
									break;
							}
						})
					}
					// trace({
					// 	"id": text2,
					// 	"row_number": 3, //每行有几个圆
					// 	"col_number": 2, //每列有几个圆
					// 	"total_number": 5, //一共有多少个圆
					// 	"datainit": [{
					// 			"name": "订单申请",
					// 			"time": time1
					// 		},
					// 		{
					// 			"name": "订单预审",
					// 			"time": time2
					// 		},
					// 		{
					// 			"name": "订单审核",
					// 			"time": time3
					// 		},
					// 		{
					// 			"name": "订单分配",
					// 			"time": time4
					// 		},
					// 		{
					// 			"name": "订舱接收",
					// 			"time": time5
					// 		},
					// 	]
					// });
				},
				error: function() {
					mui.alert("系统处理错误");
				}
			});
		}
	})
	//	$('body').on("tap",'#share',function() {
	//		var n = $(this).parents('.content-item').index();
	//		var text3 = $(".maincontent").find(".content-item:eq("+n+")").find('.getBILLID').eq(0).val();
	//		$.ajax({
	//			type:"get",
	//			url:"/setShareLog",
	//			async:true,
	//			success:function(data){
	//				alert(data.result);
	//				if(data.result!=''){
	//					mui.openWindow('/shareStatusBack?type=order&ids='+text3+'&sid='+data.result);
	//				}
	//			},
	//			error:function(){
	//				mui.alert("系统处理错误");
	//			}
	//		})
	//	})
})

var Inner = function(billno, billid, customerReqNo, cargoName, num, packageType, weight, measure, vessel, voyno, shipOwner, sailline, CNTRNUMSTR, oDiv) {
	oDiv.innerHTML = oDiv.innerHTML +
		'<div class="item"><span id="blue-text">' +
		'订单号' + billno +'</span></div>'+ // '<button id="share" type="button" class="mui-btn mui-btn-primary">分享</button></div>' +
		'<input class="getBILLID" type="hidden" id="' + billno + '" value="' + billid + '"/>' +
		'<div id="circle-left"></div><div id="circle-right"></div><hr style="border:1px dashed #ebebeb;">'+
		'<div class="item">' +
		'<span class="item-title">客户委托号</span>' +
		'<span style="float:right">' + (customerReqNo == null ? '' : customerReqNo) + '</span>' +
		'</div>' +
		'<div class="item">' +
		'<span class="item-title">货物名称</span>' +
		'<span style="float:right">' + (cargoName == null ? '' : cargoName) + '</span>' +
		'</div>' +
		'<div class="item">' +
		'<span class="item-title">件毛体</span>' +
		'<span style="float:right">' + (num == null ? '' : num) + (packageType == null ? '' : packageType) + '/' + (weight == null ? '' : weight) + '/' + (measure == null ? '' : measure) + '</span>' +
		'</div>' +
		'<div class="item">' +
		'<span class="item-title">船名/航次</span>' +
		'<span style="float:right">' + (vessel == null ? '' : vessel) + '/' + (voyno == null ? '' : voyno) + '</span>' +
		'</div>' +
		'<div class="item">' +
		'<span class="item-title">船公司/航线</span>' +
		'<span style="float:right">' + (shipOwner == null ? '' : shipOwner) + '/' + (sailline == null ? '' : sailline) + '</span>' +
		'</div>' +
		'<div class="item">' +
		'<span class="item-title">箱型箱量</span>' +
		'<span style="float:right">' + (CNTRNUMSTR == null ? '' : CNTRNUMSTR) + '</span>' +
		'</div>' +
		'</div>' +
		'<div id="circle-left"></div><div id="circle-right"></div><hr style="border:1px dashed #ebebeb;">'+
		'<ul class="mui-table-view"> ' +
		'<li class="mui-table-view-cell mui-collapse">' +
		'<a class="mui-navigate-right" id="Detail" href="#">点击查看订单进度</a>' +
		'<div class="mui-collapse-content">' +
		// '<canvas id="' + billid + '" width="370px" height="300px"></canvas>' +
		'<div id="node"><div class="circle-unfinished">订单申请</div><div class="time"></div></div><div id="node-line"></div>'+
		'<div id="node"><div class="circle-unfinished">订单预审</div><div class="time"></div></div><div id="node-line"></div>'+
		'<div id="node"><div class="circle-unfinished">订单审核</div><div class="time"></div></div>'+
		'<div id="node-line-short"></div>'+
		'<div id="node-line-v"></div>'+
		'<div style="margin-right:4px;">'+
		'<div id="node-line-short" style="float:right;"></div>'+
		'<div id="node" style="float:right"><div class="circle-unfinished">订单分配</div><div class="time"></div></div><div id="node-line" style="float:right"></div>'+
		'<div id="node" style="float:right"><div class="circle-unfinished">订舱接收</div><div class="time"></div></div>'+
		'</div>'+
		'</div>' +
		' </li>' +
		'</ul>';
}