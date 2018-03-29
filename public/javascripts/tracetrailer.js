/*判断是否为偶数，是的话返回1*/
function chk(number){
	number=parseInt(number);
	var type=(number%2==0)?1:0;
	return type;
}
function getStatus(index,col_number){
	if(index==1)
		return 1;
	else
	{
		if(!chk(index/col_number+1))
		{
			if(index%col_number==0)
				status=4;
			else{
				if(index%col_number==1)
					status=5;
				else
					status=2;
			}
		}
		else
		{
			if(index%col_number==0)
				status=2;
			else	
			{
				if(index%col_number==1)
					status=3;
				else
					status=4;
			}
		}
		return status;
	}
}
function trace(data){
	
	if(data.total_number<=data.row_number){
		var x=20;
		var y=40;
		/*初始化画布*/
		var canvas = document.getElementById(data.id);
        if (canvas == null)
            return false;
        var context = canvas.getContext("2d");
        context.fillStyle="#ff8050";
        context.strokeStyle = "#ff8050";//线条的颜色
        var name=data.datainit[0].name;
		var time=data.datainit[0].time;
		var times=data.datainit[0].time.replace('T',' ').split(':');
		if(times.length>=3){
			time=times[0]+':'+times[1];
		}
		
		if(time=="")
		{
			context.fillStyle="rgb(200,200,200)";
			context.strokeStyle="rgb(200,200,200)";
		}
        context.beginPath();
        context.arc(x,y,10,0,Math.PI*2,true);
        context.closePath();
        context.fill();
        context.font = "15px 微软雅黑";
        context.textBaseline = 'top';
		context.fillText(name, x-10, y+10);
		context.font = "12px 微软雅黑";
        context.textBaseline = 'top';
		context.fillText(time, x-10, y+30);
		for(var index=2;index<=data.total_number;++index){
			var times=data.datainit[index-1].time.replace('T',' ').split(':');
		    if(times.length>=3){
			    data.datainit[index-1].time=times[0]+':'+times[1];
		    }
			var name=data.datainit[index-1].name;
			var time=data.datainit[index-1].time;
			if(time=="")
			{
				context.fillStyle="rgb(200,200,200)";
				context.strokeStyle="rgb(200,200,200)";
			}
			context.moveTo(x+10,y);
			x=x+100;
			context.lineTo(x,y);
			context.stroke();
			context.beginPath();
            context.arc(x,y,10,0,Math.PI*2,true);
            context.closePath();
            context.fill();
            context.font = "15px 微软雅黑";
            context.textBaseline = 'top';
    		context.fillText(name, x-10, y+10);
			context.font = "12px 微软雅黑";
	        context.textBaseline = 'top';
			context.fillText(time, x-10, y+30);
		}
	}
	else{
		/*首先要根据状态判断到底利用哪种方式来对这个点和线进行渲染*/
		var x=20;
		var y=40;
		/*初始化画布*/
		var canvas = document.getElementById(data.id);
        if (canvas == null)
            return false;
        var context = canvas.getContext("2d");
        context.fillStyle="#ff8050";
        context.strokeStyle = "#ff8050";//线条的颜色
		for(var index=1;index<=data.total_number;++index){
			var status=getStatus(index,data.col_number);
			var times=data.datainit[index-1].time==null ? '' : data.datainit[index-1].time.replace('T',' ').split(':');
		    if(times.length>=3){
			    data.datainit[index-1].time=times[0]+':'+times[1];
		    }
		    else{
		    	if(times==''){
		    		data.datainit[index-1].time='';
		    	}
		    }
			if(status==1){
				var name=data.datainit[index-1].name;
				var time=data.datainit[index-1].time;
				if(time=="")
				{
					context.fillStyle="rgb(200,200,200)";
					context.strokeStyle="rgb(200,200,200)";
				}
	            context.beginPath();
	            context.arc(x,y,10,0,Math.PI*2,true);
	            context.closePath();
	            context.fill();
	            context.font = "15px 微软雅黑";
	            context.textBaseline = 'top';
        		context.fillText(name, x+15, y-10);
        		context.font = "12px 微软雅黑";
	            context.textBaseline = 'top';
        		context.fillText(time, x+15, y+10);
        	}
			if(status==2){
				var name=data.datainit[index-1].name;
				var time=data.datainit[index-1].time;
				if(time=="")
				{
					context.fillStyle="rgb(200,200,200)";
					context.strokeStyle="rgb(200,200,200)";
				}
				context.beginPath();
				context.moveTo(x,y+10);
				y=y+70;
				context.lineTo(x,y);
				context.stroke();
				context.closePath();
				context.beginPath();
	            context.arc(x,y,10,0,Math.PI*2,true);
	            context.closePath();
	            context.fill();
	            context.font = "15px 微软雅黑";
	            context.textBaseline = 'top';
        		context.fillText(name, x+15, y-10);
        		context.font = "12px 微软雅黑";
	            context.textBaseline = 'top';
        		context.fillText(time, x+15, y+10);
        	}
			if(status==3){
				var name=data.datainit[index-1].name;
				var time=data.datainit[index-1].time;
				if(time=="")
				{
					context.fillStyle="rgb(200,200,200)";
					context.strokeStyle="rgb(200,200,200)";
				}
				context.moveTo(x,y+10);
				y=y+30;
				context.lineTo(x,y);
				x=x+120;
				context.lineTo(x,y);
				y=y-30;
				context.lineTo(x,y);
				context.stroke();
				context.beginPath();
	            context.arc(x,y,10,0,Math.PI*2,true);
	            context.closePath();
	            context.fill();
	            context.font = "15px 微软雅黑";
	            context.textBaseline = 'top';
        		context.fillText(name, x+15, y-10);
        		context.font = "12px 微软雅黑";
	            context.textBaseline = 'top';
        		context.fillText(time, x+15, y+10);
			}
			if(status==4){
				var name=data.datainit[index-1].name;
				var time=data.datainit[index-1].time;
				if(time=="")
				{
					context.fillStyle="rgb(200,200,200)";
					context.strokeStyle="rgb(200,200,200)";
				}
        		context.moveTo(x,y-10);
				y=y-70;
				context.lineTo(x,y);
				context.stroke();
				context.beginPath();
	            context.arc(x,y,10,0,Math.PI*2,true);
	            context.closePath();
	            context.fill();
	            context.font = "15px 微软雅黑";
	            context.textBaseline = 'top';
        		context.fillText(name, x+15, y-10);
        		context.font = "12px 微软雅黑";
	            context.textBaseline = 'top';
        		context.fillText(time, x+15, y+10);
			}
			if(status==5){
				var name=data.datainit[index-1].name;
				var time=data.datainit[index-1].time;
				if(time=="")
				{
					context.fillStyle="rgb(200,200,200)";
					context.strokeStyle="rgb(200,200,200)";
				}
				context.moveTo(x,y-10);
				y=y-30;
				context.lineTo(x,y);
				x=x+120;
				context.lineTo(x,y);
				y=y+30;
				context.lineTo(x,y);
				context.stroke();
				context.beginPath();
	            context.arc(x,y,10,0,Math.PI*2,true);
	            context.closePath();
	            context.fill();
	            context.font = "15px 微软雅黑";
	            context.textBaseline = 'top';
        		context.fillText(name, x+15, y-10);
        		context.font = "12px 微软雅黑";
	            context.textBaseline = 'top';
        		context.fillText(time, x+15, y+10);
			}
		}
	}
}

function trace2(data){
	
}