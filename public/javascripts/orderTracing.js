var array = [];

$(document).ready(function(){
	
	//页面加载完成时获取请款列表，初始为未审核
	$.ajax({
		type:"get",
		url:"/getOrderList",
		async:true,
		success:function(data){
			DATA = data;
			for(var o in DATA)
			{
				var result = eval(DATA[o]);
				Totalcount = result[0].COUNT;
			}
			//alert(Totalcount);
			if (mui.os.plus) {
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
		error:function(){
			mui.alert("系统处理错误");
		}
	})
	
	/*通过侧边栏选择筛选条件*/
	$("#submit").click(function(){
		var no = $('input[name="orderno"]').val();
		var select=$('#filter-select').val();
		var orderno="",customsop="",sono="",hblno="";
		//选择时间区间时获取时间
		//alert(orderno+customsop+sono+hblno);
		if(select=="订单号")orderno=no;
		else if(select=="客户委托号")customsop=no;
		else if(select=="SO NO")sono=no;
		else if(select=="HBL NO")hblno=no;
		$.ajax({
			type:"get",
			url:"getOrderList",
			data:{
				orderno:orderno,
				customsop:customsop,
				sono:sono,
				hblno:hblno,
			},
			async:true,
			success:function(data){
				currentlist = 0;
				count = 0;
				downflag = 0;
				upflag = 0;
				Totalcount = 0;
				DATA = data;
				var aDiv = document.body.querySelector('.maincontent');
				aDiv.innerHTML="";
				for(var o in DATA)
				{
					var result = eval(DATA[o]);
					Totalcount = result[0].COUNT;
				}
				//alert(Totalcount);
				if (mui.os.plus) {
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
			error:function(){
				mui.alert("系统处理错误");
			}
//			success:function(data){
//				DATA = data;
//				var aDiv = document.body.querySelector('.maincontent');
//				aDiv.innerHTML="";
//				var flag1=0;
//				var flag = 0;
//				//alert(flag1+" "+currentlist+" "+flag);
//				for(var o in DATA)
//				{
//					var result = eval(DATA[o]);
//					result.shift();
//					$.each(result,function(key,value){
//						//alert(flag1+" "+currentlist+" "+flag);
//						if(flag1>=currentlist && flag<3)
//						{
//							var oDiv = document.createElement('div');
//							oDiv.className = 'mui-card content-item';
//							Inner(value.BILLNO,value.BILLID,value.CURRENCY,value.TOTALAMOUNT,value.BILLDATE,value.LASTDATE,value.PAYTYPE,value.BRANCHCODE,value.BANKADDRESS,oDiv);
//							aDiv.append(oDiv);
//							flag++;
//							currentlist++;
//							flag1++;
//						}
//						else if(flag1<currentlist) 
//						{
//							flag1++;
//							return true;
//						}
//					}) 
//				}
//			},
//			error:function(){
//				mui.alert("系统处理错误");
//			}
		});
	})
	
	/*查看详细条目*/
	$('body').on("tap",'#Detail',function() {
		var n = $(this).parents('#card').index();
		//n = n + 1;
		var text2 = $(".maincontent").find("#card:eq("+n+")").find('.getBILLID').eq(0).val();
		if(!array[text2])
		{
			array[text2]=1;
			var aDiv = $(this).siblings('.mui-collapse-content');
			$.ajax({
				type:"get",
				url:"/getOrderDetail",
				data:{
					BILLid:text2,
				},
				async:true,
				success:function(data){
					var time1="",time2="",time3="",time4="",time5="",time6="",time7="",time8="",time9="",time10="",time11="",time12="";
					for(var o in data)
					{
						var result = eval(data[o]);
						$.each(result,function(key,value){
							//var time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,time11,time12="";
							switch(value.NODECODE)
							{
								case 'FMS_SO01':
									time1=value.FINISHEDDATE;
									break;
								case 'FMS_SO04':
									time2 = value.FINISHEDDATE;
									break;
								case 'FMS_SO47':
									time3 = value.FINISHEDDATE;
									break;
								case 'FMS_SO48':
									time4 = value.FINISHEDDATE;
									break;
								case 'FMS_SO52':
									time5 = value.FINISHEDDATE;
									break;
								case 'FMS_SO51':
									time6 = value.FINISHEDDATE;
									break;
								case 'FMS_SO50':
									time7 = value.FINISHEDDATE;
									break;
								case 'FMS_SO49':
									time8 = value.FINISHEDDATE;
									break;
								case 'FMS_SO53':
									time9 = value.FINISHEDDATE;
									break;
								case 'FMS_SO12':
									time10 = value.FINISHEDDATE;
									break;
								case 'FMS_SO09':
									time11 = value.FINISHEDDATE;
									break;
								case 'FMS_SO54':
									time12 = value.FINISHEDDATE;
									break;
								default:break;
							}
						})
					}
					trace({
						"id":text2,
						"row_number":3,//每行有几个圆
						"col_number":4,//每列有几个圆
						"total_number":12,//一共有多少个圆
						"datainit":[
							{"name":"接单","time":time1},
							{"name":"订舱","time":time2},
							{"name":"提箱","time":time3},
							{"name":"进场","time":time4},
							{"name":"申报","time":time5},
							{"name":"放行","time":time6},
							{"name":"对单","time":time7},
							{"name":"签发","time":time8},	
							{"name":"对账","time":time9},
							{"name":"付款","time":time10},
							{"name":"开船","time":time11},
							{"name":"到港","time":time12},
						]
					});
				},
				error:function(){
					mui.alert("系统处理错误");
				}
			});
		}
	})
	$('body').on("tap",'#share',function() {
		var n = $(this).parents('#card').index();
		var text3 = $(".maincontent").find("#card:eq("+n+")").find('.getBILLID').eq(0).val();
		$.ajax({
			type:"get",
			url:"/setShareLog",
			async:true,
			success:function(data){
				//alert(data.result);
				if(data.result!=''){
					mui.openWindow('/shareStatusBack?type=order&ids='+text3+'&sid='+data.result);
				}
			},
			error:function(){
				mui.alert("系统处理错误");
			}
		})
	})
	
})

var Inner = function(id, billid,customscompany,customsop,sonos,hblno,CNTRNUMSTR, oDiv){
	oDiv.innerHTML=oDiv.innerHTML+
	'<div class="item"><span id="blue-text">'+
				'订单号'+id+'</span><button id="share" type="button" ></button>'+
				'<input class="getBILLID" type="hidden" id="'+id+'" value="'+billid+'"/></div>'+
				'<div id="circle-left"></div><div id="circle-right"></div><hr style="border:1px dashed #ebebeb;">'+
					'<div class="item">'+
						'<span class="item-title">客户简称</span>'+
						'<span style="float:right">'+(customscompany==null ? '' : customscompany)+'</span>'+
					'</div>'+
					'<div class="item">'+
						'<span class="item-title">客户委托号</span>'+
						'<span style="float:right">'+(customsop==null ? '' : customsop)+'</span>'+
					'</div>'+
					'<div class="item">'+
						'<span class="item-title">SO NO</span>'+
						'<span style="float:right">'+(sonos==null ? '' : sonos)+'</span>'+
					'</div>'+
					'<div class="item">'+
						'<span class="item-title">H/BL NO</span>'+
						'<span style="float:right">'+(hblno==null ? '' : hblno)+'</span>'+
					'</div>'+
					'<div class="item">'+
						'<span class="item-title">箱型箱量</span>'+
						'<span style="float:right">'+(CNTRNUMSTR==null ? '' : CNTRNUMSTR)+'</span>'+
					'</div>'+
				'</div>'+
				'<div id="circle-left"></div><div id="circle-right"></div><hr style="border:1px dashed #ebebeb;">'+
				 '<ul class="mui-table-view"> '+
			        '<li class="mui-table-view-cell mui-collapse">'+
			            '<a class="mui-navigate-right" id="Detail" href="#">点击查看订单进度</a>'+
			            '<div class="mui-collapse-content">'+
					        '<canvas id="'+billid+'" width="370px" height="300px" style="width:310px;height:300px;"></canvas>'+
						'</div>'+
			       ' </li>'+
			    '</ul>';
}