$(document).ready(function(){
	
	var aDiv = document.body.querySelector('.maincontent');
	aDiv.innerHTML="";
	$.ajax({
		type:"get",
		url:"/registerlist",
		data:{},
		async:true,
		success:function(data){
			for(var o in data)
			{
				var result = eval(data[o]);
				//alert(result[0].COUNT);
				result.shift();
				$.each(result,function(key,value){
					var oDiv = document.createElement('div');
					oDiv.className = 'mui-card content-item';
					Inner(value.RegisterUser,value.COMNAME,value.COMNAMECN,value.RegisterDate,value.REGADDRESS,value.REGADDRESSEN,value.TAXNUMBER,value.EMAIL,value.BILLID,value.BILLCODE,oDiv);
					aDiv.appendChild(oDiv);
				})
			}
		},
		error:function(){
			mui.alert("系统处理错误");
		}
	})
})

$('body').on("tap",'#registerDetail',function(){
	var n = $(this).parents('.content-item').index();
	var id = $(".maincontent").find(".content-item:eq("+n+")").find('input').eq(0).attr('id');
	//alert(id);
	var code = $(".maincontent").find(".content-item:eq("+n+")").find('input').eq(1).attr('id');
	var user = $(".maincontent").find(".content-item:eq("+n+")").find('input').eq(2).attr('id');
	var comname = $(".maincontent").find(".content-item:eq("+n+")").find('input').eq(3).attr('id');
	var comnamecn = $(".maincontent").find(".content-item:eq("+n+")").find('input').eq(4).attr('id');
	var address = $(".maincontent").find(".content-item:eq("+n+")").find('input').eq(5).attr('id');
	var addressen = $(".maincontent").find(".content-item:eq("+n+")").find('input').eq(6).attr('id');
	var taxnumber = $(".maincontent").find(".content-item:eq("+n+")").find('input').eq(7).attr('id');
	var email = $(".maincontent").find(".content-item:eq("+n+")").find('input').eq(8).attr('id');
	$.ajax({
		type:"post",
		url:"/saveregisterDetail",
		data:{
			id:id,
			code:code,
			user:user,
			comname:comname,
			comnamecn:comnamecn,
			address:address,
			addressen:addressen,
			taxnumber:taxnumber,
			email:email,
		},
		async:true,
		success:function(data){
			var result = eval(data);
			if(result.result == 1)
			{
				mui.openWindow('/registerDetail');
			}
			else{
				mui.alert("系统处理错误");
			}
		},
		error:function(){
			mui.alert("系统处理错误");
		}
	})
	//n = n + 1;
})

/*通过注册申请*/
$('body').on("tap",'#agree',function() {
	var btnArray = ['是','否'];
	mui.confirm('确定通过此注册申请？','确认',btnArray,function(e){
		if(e.index==0){
			var n = $(this).parents('.content-item').index();
			n = n + 1;
			var text2 = $(".maincontent").find(".content-item:eq("+n+")").find('input').eq(0).attr('id');
			$.ajax({
				type:"post",
				url:"/agreeregister",
				data:{
					BILLID:text2,
				},
				async:true,
				success:function(data){
					var result = eval(data);
					if(result.result == 0)
					{
						$(".maincontent").find(".content-item:eq("+n+")").remove();
						mui.alert("成功通过");
					}
					else
					{
						mui.alert("系统处理错误");
					}
				},
				error:function(){
					mui.alert("系统处理错误");
				}
			});
		}
		else{
			mui.alert("未通过");
		}
	})
})

/*驳回*/
$('body').on("tap","#reject",function(e){
	e.preventDefault();
	var btnArray = ['确定','取消'];
	mui.prompt('请输入驳回理由：','信息不对','驳回',btnArray,function(e){
		if(e.index == 0){
			var n = $(this).parents('.content-item').index();
			n = n + 1;
			var text2 = $(".maincontent").find(".content-item:eq("+n+")").find('input').eq(0).attr('id');
			$.ajax({
				type:"post",
				url:"/rejectregister",
				data:{
					BILLID:text2,
					reason:e.value,
				},
				async:true,
				success:function(data){
					var result = eval(data);
					if(result.result == 0)
					{
						$(".maincontent").find(".content-item:eq("+n+")").remove();
						mui.alert("成功驳回");
					}
					else
					{
						mui.alert("系统处理错误");
					}
				},
				error:function(){
					mui.alert("系统处理错误");
				}
			});
		}
		else{
			mui.alert("取消");
		}
	})
})
	
var Inner = function(usercode, company,companycn, date, regaddress, regaddressen, taxnumber, email, billid, billcode, oDiv){
	oDiv.innerHTML = oDiv.innerHTML +
	  		'<div class="colorful"></div>'+
			'<!--页眉，放置标题-->'+
			'<div class="mui-card-header">'+
				'<span class="left-text">用户名</span><span class="a-little-left">'+usercode+'</span>'+
				'<span class="right-text pointer" style="float:right" id="registerDetail">查看详情></span>'+
				'<input type="hidden" id="'+billid+'"/>'+
				'<input type="hidden" id="'+billcode+'"/>'+
				'<input type="hidden" id="'+usercode+'"/>'+
				'<input type="hidden" id="'+company+'"/>'+
				'<input type="hidden" id="'+companycn+'"/>'+
				'<input type="hidden" id="'+regaddress+'"/>'+
				'<input type="hidden" id="'+regaddressen+'"/>'+
				'<input type="hidden" id="'+taxnumber+'"/>'+
				'<input type="hidden" id="'+email+'"/>'+
			'</div>'+
			'<!--内容区-->'+
			'<div class="mui-card-content" style="text-align: center;">'+
				'<div class="item dashLine"></div>'+
				'<div class="item">'+
					'<span class="item-title">所在单位</span>'+
					'<span class="a-little-left">'+company+'</span>'+
				'</div>'+
				'<div class="item">'+
					'<span class="item-title">申请时间</span>'+
					'<span class="a-little-left">'+(date==null ? "" : date.replace('T',' ').substr(0,date.length-3))+'</span>'+
				'</div>'+
				
				'<div class="mui-card-footer"><div class="buttonbar" style="margin-left:15%;">'+
					'<button type="button" id="agree" class="mui-btn mui-btn-primary smallbtn-audit">通过</button>'+
					'<button type="button" id="reject" class="mui-btn mui-btn-primary smallbtn-audit">驳回</button>'+
				'</div></div>'+
			'</div>';
}
