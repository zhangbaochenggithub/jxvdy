function ajax({
	type,//请求类型:get/post
	url,//请求地址,不要带"?"
	data,//请求参数
	dataType//text/html/json
}){
	return new Promise(function(callback){
		var xhr=null;//1.创建异步对象
		if(window.XMLHttpRequest){//标准创建
			xhr=new XMLHttpRequest();
		}else{//IE8以下
			xhr=new ActiveXObject("Microsoft.XMLHttp");
		}
		//2.设置回调函数
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200){
				var res=xhr.responseText;
				if(dataType!==undefined
						&&dataType.toLowerCase()==="json")
					res=JSON.parse(res);
				//处理res的逻辑
				callback(res);
			}
		}
		//增加：更改请求消息头
		if(type.toLowerCase()==="post")
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		//data:"username=dingding&upwd=123456"
		if(data!==undefined&&type.toLowerCase()==="get")
			url+="?"+data;
		xhr.open(type,url,true);//3.创建请求
		//4.发送请求
		if(data!==undefined
				&&type.toLowerCase()==="post")
			xhr.send(data);
		else
			xhr.send(null);
	});
}
//ajax("get","header.html").then(function(res){
	//使用res
//})