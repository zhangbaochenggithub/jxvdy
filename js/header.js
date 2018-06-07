$(()=>{//加载页头
$("#header").load("header.html",function(){
	$("#search").click(function(e){
			var kw=$("#kw").val();
			//alert(kw);
			if(kw.trim().length>0){
				location="list.html?kw="+kw;
				//alert(kw);
			}
		})
		$.getJSON("../data/isLogin.php").then(data=>{
			console.log(data);
			if(data.ok==0){
				$(".loginList").show();
				$(".loginOut").hide();
			}
				else{
				$(".loginList").hide();
				$(".loginOut").show();
				$("#uname").html(data.msg);
			}
		})
			$("#logout").click(function(e){
			$.get("../data/logout.php").then(()=>{
					$(".loginList").show();
				$(".loginOut").hide();
			})
		})
	});
});


//加载页头鼠标移入弹出框

//导航栏时间
/*function task(){
						var now=new Date();
						var week=["日","一","二","三","四","五","六"];
						var y=now.getFullYear();
						var m=now.getMonth()+1;
						m<10&&(m="0"+m);
						var d=now.getDate();
						d<10&&(d="0"+d);
						var day=week[now.getDay()];
						var h=now.getHours();
						var M=now.getMinutes();
						M<10&&(M="0"+M);
						var s=now.getSeconds();
						s<10&&(s=("0"+s));
						k_clock.innerHTML=y+"年"+m+"月"+d+"日"+"&nbsp;"+h+":"+M+":"+s+"&nbsp;"+"星期"+day;
						setInterval(task,1000);
					}*/
	
	