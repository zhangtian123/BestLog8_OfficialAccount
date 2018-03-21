/*判断是否为偶数，是的话返回1*/
function chk(number){
	number=parseInt(number);
	var type=(number%2==0)?1:0;
	return type;
}
//function getStatus(index,col_number){
//	if(index==1)
//		return 1;
//	else
//	{
//		if(!chk(index/col_number+1))
//		{
//			if(index%col_number==0)
//				status=4;
//			else{
//				if(index%col_number==1)
//					status=5;
//				else
//					status=2;
//			}
//		}
//		else
//		{
//			if(index%col_number==0)
//				status=2;
//			else	
//			{
//				if(index%col_number==1)
//					status=3;
//				else
//					status=4;
//			}
//		}
//		return status;
//	}
//}
//index 索引号，从1开始
//col_number 每列有几个状态
function getStatus(index,row_number,total_number){
	if(index != total_number){
		
//		if(index % row_number <= (row_number - 1) && chk(index%row_number)==0) {
//			status = 1; //第一种画线情况,右横线
//			
//		}else if(index % row_number == 0) {
//			
//			if(chk(index % row_number % 2) == 0) {
//				status = 2; //第二种画线情况，右下竖线
//			} else {
//				status = 4; //第四种画线情况，左下竖线
//			}
//		} else if(index % row_number <= (row_number - 1) && chk(index%row_number)==1){
//			status = 3; //第三种画线情况，左横线
//		}
		if(index == 1 || index == 2 || index == 3 ){
			status = 1;
		}else if(index == 4){
			status = 2;
		}else if(index == 5 || index ==6 || index ==7){
			status = 3;
		}else if(index == 8){
			status = 4;
		}
	}
	else{
		status = 5;//第五种画线情况，无横线
	}
	
	return status;
}
//function trace(data){
//	if(data.total_number<=data.row_number){
//		var x=20;
//		var y=40;
//		/*初始化画布*/
//		var canvas = document.getElementById(data.id);
//      if (canvas == null)
//          return false;
//      var context = canvas.getContext("2d");
//      context.fillStyle="#df3c01";
//      context.strokeStyle = "#ff9a76 ";//线条的颜色
//      var name=data.datainit[0].name;
//		var time=data.datainit[0].time;
//		var times=data.datainit[0].time.replace('T',' ').split(':');
//		if(times.length>=3){
//			time=times[0]+':'+times[1];
//		}
//		if(time=="")
//		{
//			context.fillStyle="rgb(200,200,200)";
//			context.strokeStyle="rgb(200,200,200)";
//		}
//      context.beginPath();
//      context.arc(x,y,10,0,Math.PI*2,true);
//      context.closePath();
//      context.fill();
//      context.font = "15px 微软雅黑";
//      context.textBaseline = 'top';
//		context.fillText(name, x-10, y+10);
//		context.font = "12px 微软雅黑";
//      context.textBaseline = 'top';
//		context.fillText(time, x-10, y+30);
//		for(var index=2;index<=data.total_number;++index){
//			var times=data.datainit[index-1].time.replace('T',' ').split(':');
//		    if(times.length>=3){
//			    data.datainit[index-1].time=times[0]+':'+times[1];
//		    }
//			var name=data.datainit[index-1].name;
//			var time=data.datainit[index-1].time;
//			if(time=="")
//			{
//				context.fillStyle="rgb(200,200,200)";
//				context.strokeStyle="rgb(200,200,200)";
//			}
//			context.moveTo(x+10,y);
//			x=x+120;
//			context.lineTo(x,y);
//			context.stroke();
//			context.beginPath();
//          context.arc(x,y,10,0,Math.PI*2,true);
//          context.closePath();
//          context.fill();
//          context.font = "15px 微软雅黑";
//          context.textBaseline = 'top';
//  		context.fillText(name, x-10, y+10);
//			context.font = "12px 微软雅黑";
//	        context.textBaseline = 'top';
//			context.fillText(time, x-10, y+30);
//		}
//	}
//	else{
//		/*首先要根据状态判断到底利用哪种方式来对这个点和线进行渲染*/
//		var x=20;
//		var y=40;
//		/*初始化画布*/
//		var canvas = document.getElementById(data.id);
//      if (canvas == null)
//          return false;
//      var context = canvas.getContext("2d");
//      context.fillStyle="#df3c01";
//      context.strokeStyle = "#ff9a76";//线条的颜色
//      //遍历所有节点
//		for(var index=1;index<=data.total_number;++index){
//			var status=getStatus(index,data.col_number);
//			var times=data.datainit[index-1].time.replace('T',' ').split(':');
//		    if(times.length>=3){
//			    data.datainit[index-1].time=times[0]+':'+times[1];
//		    }
//			if(status==1){
//				var name=data.datainit[index-1].name;
//				var time=data.datainit[index-1].time;
//				if(time=="")
//				{
//					context.fillStyle="#ff9a76";
//					context.strokeStyle="#ff9a76";
//				}
//	            context.beginPath();
//	            context.arc(x,y,10,0,Math.PI*2,true);
//	            context.closePath();
//	            context.fill();
//	            context.font = "15px 微软雅黑";
//	            context.textBaseline = 'top';
//      		context.fillText(name, x+15, y-10);
//      		context.font = "12px 微软雅黑";
//	            context.textBaseline = 'top';
//      		context.fillText(time, x+15, y+10);
//      	}
//			if(status==2){
//				var name=data.datainit[index-1].name;
//				var time=data.datainit[index-1].time;
//				if(time=="")
//				{
//					context.fillStyle="#ff9a76";
//					context.strokeStyle="#ff9a76";
//				}
//				context.beginPath();
//				context.moveTo(x,y+10);
//				y=y+70;
//				context.lineTo(x,y);
//				context.stroke();
//				context.closePath();
//				context.beginPath();
//	            context.arc(x,y,10,0,Math.PI*2,true);
//	            context.closePath();
//	            context.fill();
//	            context.font = "15px 微软雅黑";
//	            context.textBaseline = 'top';
//      		context.fillText(name, x+15, y-10);
//      		context.font = "12px 微软雅黑";
//	            context.textBaseline = 'top';
//      		context.fillText(time, x+15, y+10);
//      	}
//			if(status==3){
//				var name=data.datainit[index-1].name;
//				var time=data.datainit[index-1].time;
//				if(time=="")
//				{
//					context.fillStyle="rgb(200,200,200)";
//					context.strokeStyle="rgb(200,200,200)";
//				}
//				context.moveTo(x,y+10);
//				y=y+30;
//				context.lineTo(x,y);
//				x=x+120;
//				context.lineTo(x,y);
//				y=y-30;
//				context.lineTo(x,y);
//				context.stroke();
//				context.beginPath();
//	            context.arc(x,y,10,0,Math.PI*2,true);
//	            context.closePath();
//	            context.fill();
//	            context.font = "15px 微软雅黑";
//	            context.textBaseline = 'top';
//      		context.fillText(name, x+15, y-10);
//      		context.font = "12px 微软雅黑";
//	            context.textBaseline = 'top';
//      		context.fillText(time, x+15, y+10);
//			}
//			if(status==4){
//				var name=data.datainit[index-1].name;
//				var time=data.datainit[index-1].time;
//				if(time=="")
//				{
//					context.fillStyle="rgb(200,200,200)";
//					context.strokeStyle="rgb(200,200,200)";
//				}
//      		context.moveTo(x,y-10);
//				y=y-70;
//				context.lineTo(x,y);
//				context.stroke();
//				context.beginPath();
//	            context.arc(x,y,10,0,Math.PI*2,true);
//	            context.closePath();
//	            context.fill();
//	            context.font = "15px 微软雅黑";
//	            context.textBaseline = 'top';
//      		context.fillText(name, x+15, y-10);
//      		context.font = "12px 微软雅黑";
//	            context.textBaseline = 'top';
//      		context.fillText(time, x+15, y+10);
//			}
//			if(status==5){
//				var name=data.datainit[index-1].name;
//				var time=data.datainit[index-1].time;
//				if(time=="")
//				{
//					context.fillStyle="rgb(200,200,200)";
//					context.strokeStyle="rgb(200,200,200)";
//				}
//				context.moveTo(x,y-10);
//				y=y-30;
//				context.lineTo(x,y);
//				x=x+120;
//				context.lineTo(x,y);
//				y=y+30;
//				context.lineTo(x,y);
//				context.stroke();
//				context.beginPath();
//	            context.arc(x,y,10,0,Math.PI*2,true);
//	            context.closePath();
//	            context.fill();
//	            context.font = "15px 微软雅黑";
//	            context.textBaseline = 'top';
//      		context.fillText(name, x+15, y-10);
//      		context.font = "12px 微软雅黑";
//	            context.textBaseline = 'top';
//      		context.fillText(time, x+15, y+10);
//			}
//		}
//	}
//}
function trace(data){
	//如果总状态数小于每行的状态数目
	if(data.total_number <= data.row_number){
		/*首先要根据状态判断到底利用哪种方式来对这个点和线进行渲染*/
		var tempx=0;
		var tempy=0;
		var widthSpace = window.innerWidth/6;
		/*初始化画布*/
		var canvas = document.getElementById(data.id);
        if (canvas == null)
            return false;
        var context = canvas.getContext("2d");
        
        //设置色彩
        var mainColor = "#df3c01";
        var textColor = "white";
        
        var grayColor = "#ebebeb"
        var grayText = "#a8a8a8"
        
        var emptyFlag = false;
        //遍历所有状态节点
        console.log(data.id)
        for (var index = 1; index <= data.total_number; ++index){
        	var status = getStatus(index, data.row_number, data.total_number);
        	var times=data.datainit[index-1].time.replace('T',' ').split(':');
		    if(times.length>=3){
			    data.datainit[index-1].time=times[0]+':'+times[1];
		    }
		    
		    //圆角矩形尺寸参数
		    var width = 55;
		    var height = 25;
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
        		var x = tempx + (index-1)*widthSpace*2;
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
				context.lineTo(x+width+100, y+height/2)
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
				
        	}else{
        		//第五种画线情况，无横线
//      		//绘制圆角矩形
				var x = tempx + widthSpace*4;
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
        	}
        }
	}else{
		/*首先要根据状态判断到底利用哪种方式来对这个点和线进行渲染*/
		var tempx=0;
		var tempy=0;
//		var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
		var windowWidth = document.documentElement.offsetWidth || document.body.offsetWidth ;
		console.log(windowWidth)
		var widthSpace = windowWidth/10;
		/*初始化画布*/
		var canvas = document.getElementById(data.id);
        if (canvas == null)
            return false;
        var context = canvas.getContext("2d");
        
        //设置色彩
        var mainColor = "#df3c01";
        var textColor = "white";
        
        var grayColor = "#ebebeb"
        var grayText = "#a8a8a8"
        
        var emptyFlag = false;
        //遍历所有状态节点
        console.log(data.id)
        for (var index = 1; index <= data.total_number; ++index){
        	var status = getStatus(index, data.row_number, data.total_number);
        	var times=data.datainit[index-1].time.replace('T',' ').split(':');
		    if(times.length>=3){
			    data.datainit[index-1].time=times[0]+':'+times[1];
		    }
		    
		    //圆角矩形尺寸参数
		    var width = widthSpace*1.2;
		    var height = 0.5*widthSpace;
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
        		var x = tempx + (index-1)*widthSpace*2;
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
        		
        		var x = tempx + widthSpace*6;
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
				
				context.fill();
				context.moveTo(x+width, y+height/2);
				context.lineTo(x+width+10, y+height/2)
				context.stroke();
				context.moveTo(x+width+10, y+height/2);
				context.lineTo(x+width+10, y+height/2+70)
				context.stroke();
				context.moveTo(x+width+10, y+height/2+70);
				context.lineTo(x+width, y+height/2+70)
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
        	}else if(status == 3){
        		//第三种画线情况，左横线
        		
        		var x = tempx + widthSpace*6;
        		x = x - (index-5)*widthSpace*2;
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
				var x = tempx + widthSpace*2;
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
        	}
        }
	}
}
