$(document).ready(function() {
	$.ajax({
		type: "get",
		url: "getPorts",
		data: {},
		async: true,
		success: function(data) {
			var aDiv = $('#pol');   
			for(var o in data) {
				var result = eval(data[o]);
				$.each(result, function(key, value) {
					var oDiv = document.createElement('option');
					//oDiv.value = value.PORTID + '&' + value.PORTCODE;
					oDiv.value = value.NAMEEN;
					oDiv.innerHTML = value.NAMECH + '/' + value.NAMEEN;
					aDiv.append(oDiv);
				})
			}
			$('#pol').searchableSelect({
				url: "getPorts"
			});
		},
		error: function() {
			mui.alert("系统处理错误");
		}
	});

	$.ajax({
		type: "get",
		url: "getPorts",
		data: {},
		async: true,
		success: function(data) {
			var aDiv = $('#pod');
			for(var o in data) {
				var result = eval(data[o]);
				$.each(result, function(key, value) {
					var oDiv = document.createElement('option');
					oDiv.value = value.NAMEEN;
					oDiv.innerHTML = value.NAMECH + '/' + value.NAMEEN;
					aDiv.append(oDiv);
				})
			}
			$('#pod').searchableSelect({
				url: "getPorts"
			});
		},
		error: function() {
			mui.alert("系统处理错误");
		}
	});
})