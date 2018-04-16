$(document).ready(function(){

	//获取港口
	$.ajax({
		type:"get",
		url:"getPorts",
		data:{},
		async:true,
		success:function(data){
			var aDiv = $('#loadingport');   
			for(var o in data)
			{
				var result = eval(data[o]);
				$.each(result,function(key,value){
					var oDiv = document.createElement('option');
					//oDiv.value = value.PORTID + '&' + value.PORTCODE;
					oDiv.value = value.NAMEEN;
					oDiv.innerHTML = value.NAMECH+'/'+value.NAMEEN;
					aDiv.append(oDiv);
				})
			}
			$('#loadingport').searchableSelect({url:"getPorts"});
		},
		error:function(){
			mui.alert("系统处理错误");
		}
	});
	
	//获取港口
	$.ajax({
		type:"get",
		url:"getPorts",
		data:{},
		async:true,
		success:function(data){
			var aDiv = $('#desport');
			for(var o in data)
			{
				var result = eval(data[o]);
				$.each(result,function(key,value){
					var oDiv = document.createElement('option');
					//oDiv.value = value.PORTID + '&' + value.PORTCODE;
					oDiv.value = value.NAMEEN;
					oDiv.innerHTML = value.NAMECH+'/'+value.NAMEEN;
					aDiv.append(oDiv);
				})
			}
			$('#desport').searchableSelect({url:"getPorts"});
		},
		error:function(){
			mui.alert("系统处理错误");
		}
	});
	
	$('#submit').click(function(){
		//这边用AL AQABAH和ADELAIDE做测试因为数据库中只有这个数据
//		var loadingportresult = "AL AQABAH"; 
//		var desportresult = "ADELAIDE";

		//装运港
		var loadingportresult = $('#loadingport').val(); 
		//目的港
		var desportresult = $('#desport').val();
		//完货日期
		var result = $('#datetimePicker').val();
		//件数
		var num = $('#digitResult').val();
		//毛重
		var weight = $('#weight').val();
		//体积
		var volume = $('#volume').val();
		//20GP
		var test = $('#test').val();
		//40GP
		var test1 = $('#test1').val();
		//40HC
		var test2 = $('#test2').val();
		if(loadingportresult=="" || desportresult=="")
		{
			mui.alert("港口不能为空");
		}
		else
		{
			$.ajax({
				type:"get",
				url:"/getFreightQuery",
				data:{
					loadingportresult :loadingportresult ,
					desportresult :desportresult,
					result :result,
					num :num,
					weight :weight,
					volume :volume,
					test :test,
					test1 :test1,
					test2 :test2,
				},
				async:true,
				success:function(data){
					
//					alert($('#port-info').text);
					var index=0;
					var aDiv = document.body.querySelector('.query-items');
					//var oDiv = document.getElementsByClassName('maincontent')[0];

					aDiv.innerHTML='';
					for(var o in data)
					{
						var result = eval(data[o]);
						result.shift();
						$.each(result,function(key,value){
							var transtype="";
							if(value.ISDIRECT=="true")
							{
								transtype="直达";
							}
							else
							{
								transtype="非直达";
							}
							$('#port-info').text(loadingportresult+'-'+transtype+'-'+desportresult); //将港口信息返回主界面
							var oDiv = document.createElement('div');
							oDiv.id = 'card';
							oDiv.className='card-class'
							Inner(index,value.BILLID,value.PORTLOADING,transtype,value.PORTDISCHARGE,value.BASEPORT,value.CUSTOMER,value.SAILINGDATE,value.DAYNUM,value.STARTDATE,value.ENDDATE,value.PRICE20GP,value.PRICE40GP,value.PRICE40HQ,oDiv,value.TotalPrice);
							aDiv.appendChild(oDiv);
							index++;
						})
					}
					offCanvasWrapper.offCanvas('close');

				}
			});
		}
		//alert(loadingportresult+desportresult+result+num+weight+volume+test+test1+test2);
		
	})
	$('body').on("tap",'#share',function() {
		var n = $(this).parents('.card-class').index();
		var text3 = $(".query-items").find(".card-class:eq("+n+")").find('.getBILLID').eq(0).val();
		$.ajax({
			type:"get",
			url:"/setShareLog",
			async:true,
			success:function(data){
				//alert(data.result);
				if(data.result!=''){
					mui.openWindow('/shareStatusBack?type=freight&ids='+text3+'&sid='+data.result);
				}
			},
			error:function(){
				mui.alert("系统处理错误");
			}
		})
	});
	$('body').on("tap",'#renderQuote',function() {
		var n = $(this).parents('#card').index();
//		alert(n);
		var text3 = $(".maincontent").find("#card:eq("+n+")").find('.getBILLID').eq(0).val();
		mui.openWindow('/renderQuote?id='+text3);
	})
})

var Inner = function(index,id,begin,line,end,port,company,time,sail,expirydatebegin,expirydateend,GPprice20,GPprice40,HCprice40,oDiv,TotalPrice){
	oDiv.innerHTML = oDiv.innerHTML+

	'<div class="item">'+
	'船公司<span id="blue-text">'+(company==null ? '' : company)+
	'</span>船期<span id="blue-text">'+(time==null ? '' : time)+
	'</span>航程<span id="blue-text">'+(sail==null ? '' : sail)+'天</span>'+(port==null ? '' : port)
	+(isuser ? '<button id="renderQuote" type="button"></button></div>' : '<button id="share" type="button"></button></div>')+
	'<input class="getBILLID" type="hidden"'+' value="'+id+'"/>'+
	'</div>';
	if(index==0)
		oDiv.innerHTML = oDiv.innerHTML+'<div class="mark-benefit"></div>';
	else if(index==1)
		oDiv.innerHTML = oDiv.innerHTML+'<div class="mark-fast"></div>';
	oDiv.innerHTML = oDiv.innerHTML+

	'<div class="item">'+
	'<span>有效期：</span>'+
	'<span>'+(expirydatebegin==null ? '' : expirydatebegin.replace('T',' ').substr(0,expirydatebegin.length-9))+'至'+(expirydateend==null ? '' : expirydateend.replace('T',' ').substr(0,expirydateend.length-9))+'</span>'+
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
	'</div>';	
}
