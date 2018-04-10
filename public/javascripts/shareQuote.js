$(document).ready(function(){
    $.ajax({
				type:"get",
				url:"/getQuoteList",
				data:{
					ids:ids
				},
				async:true,
				success:function(data){
					var index=0;
					var aDiv = document.body.querySelector('.query-items');
					//var oDiv = document.getElementsByClassName('maincontent')[0];
					aDiv.innerHTML='';
					for(var o in data)
					{
						var result = data[o];
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
							var oDiv = document.createElement('div');
							oDiv.className = 'mui-card content-item';
							Inner(index,value.PORTLOADING,transtype,value.PORTDISCHARGE,null,value.CARRIER,value.ETD,value.DAYNUM,value.BEGINDATE,value.ENDDATE,value.PRICE20GP,value.PRICE40GP,value.PRICE40HQ,value.QUANTITY20GP,value.QUANTITY40GP,value.QUANTITY40HQ,value.CUSTOMER,oDiv);
							aDiv.appendChild(oDiv);
							index++;
						})
					}
				}
			});
})

var Inner = function(index,begin,line,end,port,company,time,sail,expirydatebegin,expirydateend,GPprice20,GPprice40,HCprice40,GPquantity20,GPquantity40,HCquantity40,Customer,oDiv){
	oDiv.innerHTML = oDiv.innerHTML+
				'<div class="toplabel"></div>'+
				'<!--页眉，放置标题-->'+
				'<div class="mui-card-header">'+
					'<span class="left-text" style="color:#0078cd;">'+begin+'-'+line+'-'+end+'</span>'+
					'<span class="right-text">'+(port==null ? '' : port)+'</span>'+
				'</div>'+
				'<!--内容区-->'+
				'<div class="mui-card-content" >';
	//if(index==0)
	//	oDiv.innerHTML = oDiv.innerHTML+'<div class="mark-benefit"></div>';
	//else if(index==1)
	//	oDiv.innerHTML = oDiv.innerHTML+'<div class="mark-fast"></div>';
	oDiv.innerHTML = oDiv.innerHTML+
	                '<div class="item">'+
						'<span style="margin-left:8px;color:#0078cd;">客户：</span>'+
						'<span>'+(Customer==null ? '' : Customer)+'</span>'+
					'</div>'+
					'<div class="item">'+
						'<span style="margin-left:8px;color:#0078cd;">船公司/船期/航程：</span>'+
						'<span>'+(company==null ? '' : company)+'/'+(time==null ? '' : time.split('T')[0])+'/'+(sail==null ? '' : sail)+'</span>'+
					'</div>'+
					'<div class="item">'+
						'<span style="margin-left:8px;color:#0078cd;">有效期：</span>'+
						'<span>'+(expirydatebegin==null ? '' : expirydatebegin.replace('T',' ').substr(0,expirydatebegin.length-3))+'至'+(expirydateend==null ? '' : expirydateend.replace('T',' ').substr(0,expirydateend.length-3))+'</span>'+
					'</div>'+
					'<div class="item">'+
						'<span style="margin-left:8px;color:#0078cd;">20GP/40GP/40HQ：</span>'+
						'<span>'+(GPprice20==null ? '' : GPprice20)+'/'+(GPprice40==null ? '' : GPprice40)+'/'+(HCprice40==null ? '' : HCprice40)+'</span>'+
					'</div>'+
					'<div class="item">'+
						'<span style="margin-left:8px;color:#0078cd;">20GP/40GP/40HQ数量：</span>'+
						'<span>'+(GPquantity20==null ? '' : GPquantity20)+'/'+(GPquantity40==null ? '' : GPquantity40)+'/'+(HCquantity40==null ? '' : HCquantity40)+'</span>'+
					'</div>'+
					'<div class="item" >'+
						'<span style="margin-left:8px;color:#0078cd;">运费：</span>'+
						'<span style="margin-left:8px;">'+computeFee(GPprice20,GPprice40,HCprice40,GPquantity20,GPquantity40,HCquantity40)+'</span>'+
					'</div>'+
				'</div>';	
}
function computeFee(price20GP,price40GP,price40HQ,conTeu1,conTeu2,conTeu3){
            	var totalFee='',totalFeeValue=0;
            	if(conTeu1>0){
            		totalFee+=(conTeu1+'X'+price20GP+'(20GP)');
            		totalFeeValue+=(price20GP*conTeu1);
            	}
            	if(conTeu2>0){
            		if(totalFee!=''){
            			totalFee+='+';
            		}
            		totalFee+=(conTeu2+'X'+price40GP+'(40GP)');
            		totalFeeValue+=(price40GP*conTeu2);
            	}
            	if(conTeu3>0){
            		if(totalFee!=''){
            			totalFee+='+';
            		}
            		totalFee+=(conTeu3+'X'+price40HQ+'(40HQ)');
            		totalFeeValue+=(price40HQ*conTeu3);
            	}
            	if(totalFee!=''){
	            	totalFee+=('='+totalFeeValue);
            	}else{
            		totalFee = '0';
            	}
            	return totalFee;
            }