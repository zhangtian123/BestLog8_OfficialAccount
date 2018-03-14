$(document).ready(function(){
	
	//页面加载完成时获取请款列表，初始为未审核(现已由下拉刷新步骤代替初始化)
	$.ajax({
		type:"get",
		url:"/getBrokerList",
		async:true,
		success:function(data){
			DATA = data;
			var result;
			for(var o in DATA)
			{
				result = eval(DATA[o]);
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
					mui('#pullrefresh').pullRefresh().pullupLoading();
				});
			}
		},
		error:function(){
			mui.alert("系统处理错误");
		}
	})
})