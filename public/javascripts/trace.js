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
			x=x+120;
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
<<<<<<< HEAD
		var tempx=0;
		var tempy=0;
//		var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
		var windowWidth = document.documentElement.offsetWidth || document.body.offsetWidth ;
		console.log(windowWidth)
		var widthSpace = windowWidth/10;
=======
		var x=20;
		var y=40;
>>>>>>> 4d44a4cff93b4b3fcdfd01c8cd8c6a575126d20e
		/*初始化画布*/
		var canvas = document.getElementById(data.id);
        if (canvas == null)
            return false;
        var context = canvas.getContext("2d");
        context.fillStyle="#ff8050";
        context.strokeStyle = "#ff8050";//线条的颜色
		for(var index=1;index<=data.total_number;++index){
			var status=getStatus(index,data.col_number);
			var times=data.datainit[index-1].time.replace('T',' ').split(':');
		    if(times.length>=3){
			    data.datainit[index-1].time=times[0]+':'+times[1];
		    }
<<<<<<< HEAD
		    
		    //圆角矩形尺寸参数
		    var width = widthSpace*0.6;
		    var height = 0.3*widthSpace;
		    var radius = 10;
		    if(width < 2 * radius)
		    	radius = width / 2;
		    if(height < 2 * radius)
		    	radius = height / 2;
		    
		    var name = data.datainit[index-1].name;
        	var time = data.datainit[index-1].time;
        	console.log(name +" " + time)
		    if(emptyFlag == true ||time == ""  ) {
		    	//节点未完成
		    	context.fillStyle = grayColor;
		    	context.strokeStyle = grayColor;
		    	textStyle = grayText;
		    	emptyFlag = true;
		    } else{
		    	context.strokeStyle = mainColor;
		    	textStyle = textColor;
		    }
		    
        	if(status == 1){
        		//第一种画线情况,右横线
        		var x = tempx + (index-1)*widthSpace*1;
        		var y = tempy;
        		if (emptyFlag == false){
        			var grad = context.createLinearGradient(x, y, x + width, y);
        			grad.addColorStop(0, 'rgb(255,154,118)');
        			grad.addColorStop(1, 'rgb(239,60,1)')
        			context.fillStyle = grad;
        		}
        	
        		context.beginPath();
				context.moveTo(x+radius,y);
				context.arcTo(x+width, y, x+width, y+height, radius);
				context.arcTo(x+width, y+height, x, y+height, radius);
				context.arcTo(x, y+height, x, y ,radius);
				context.arcTo(x, y, x+width, y, radius);
				context.closePath();
				context.moveTo(x+width, y+height/2);
				context.lineTo(x+width+widthSpace, y+height/2)
				context.stroke();
				
				//绘制文本
        		context.fill()
        		context.fillStyle = textStyle;
        		context.textAlign = "center"
        		context.font = "15px 微软雅黑"
        		context.fillText(name, x+width/2, y+0.7*height);
        		context.fillStyle = "black";
        		context.font = "8px 微软雅黑"
        		var tempIndex = 10;
	      		context.fillText(time.substring(0,tempIndex), x+width/2, y+1.5*height);
	      		context.fillText(time.substring(tempIndex,time.length), x+width/2, y+2*height)
				
        	}else if(status == 2){
        		//第二种画线情况，右下竖线
        		
        		var x = tempx + widthSpace*3;
        		var y = tempy;
        		if (emptyFlag == false){
        			var grad = context.createLinearGradient(x, y, x + width, y);
        			grad.addColorStop(0, 'rgb(255,154,118)');
        			grad.addColorStop(1, 'rgb(239,60,1)')
        			context.fillStyle = grad;
        		}

=======
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
>>>>>>> 4d44a4cff93b4b3fcdfd01c8cd8c6a575126d20e
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
<<<<<<< HEAD
				
				//绘制文本
        		context.fill()
        		context.fillStyle = textStyle;
        		context.textAlign = "center"
        		context.font = "15px 微软雅黑"
        		context.fillText(name, x+width/2, y+0.7*height);
        		context.fillStyle = "black";
        		context.font = "8px 微软雅黑"
        		var tempIndex = 10;
	      		context.fillText(time.substring(0,tempIndex), x+width/2, y+1.5*height);
	      		context.fillText(time.substring(tempIndex,time.length), x+width/2, y+2*height)
        	}else if(status == 3){
        		//第三种画线情况，左横线
        		
        		var x = tempx + widthSpace*3;
        		x = x - (index-5)*widthSpace*1;
        		var y = tempy + 70;
        		if (emptyFlag == false){
        			var grad = context.createLinearGradient(x, y, x + width, y);
        			grad.addColorStop(0, 'rgb(255,154,118)');
        			grad.addColorStop(1, 'rgb(239,60,1)')
        			context.fillStyle = grad;
        		}
        		context.beginPath();
				context.moveTo(x+radius,y);
				context.arcTo(x+width, y, x+width, y+height, radius);
				context.arcTo(x+width, y+height, x, y+height, radius);
				context.arcTo(x, y+height, x, y ,radius);
				context.arcTo(x, y, x+width, y, radius);
				context.closePath();
				context.moveTo(x+width, y+height/2);
				context.lineTo(x+width-widthSpace, y+height/2)
				context.stroke();
				
				//绘制文本
        		context.fill()
        		context.fillStyle = textStyle;
        		context.textAlign = "center"
        		context.font = "15px 微软雅黑"
        		context.fillText(name, x+width/2, y+0.7*height);
        		context.fillStyle = "black";
        		context.font = "8px 微软雅黑"
        		var tempIndex = 10;
	      		context.fillText(time.substring(0,tempIndex), x+width/2, y+1.5*height);
	      		context.fillText(time.substring(tempIndex,time.length), x+width/2, y+2*height)
        	}else if(status == 4){
        		//第四种画线情况，左下竖线
        	}else{
        		//第五种画线情况，无横线
        		//绘制圆角矩形
				var x = tempx + widthSpace*1;
				var y = tempy + 70;
				if (emptyFlag == false){
        			var grad = context.createLinearGradient(x, y, x + width, y);
        			grad.addColorStop(0, 'rgb(255,154,118)');
        			grad.addColorStop(1, 'rgb(239,60,1)')
        			context.fillStyle = grad;
        		}
=======
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
>>>>>>> 4d44a4cff93b4b3fcdfd01c8cd8c6a575126d20e
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