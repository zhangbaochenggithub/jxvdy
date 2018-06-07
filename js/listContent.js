	var fid=parseInt(location.search.slice(5));
	$.ajax({
		type:"get",
		url:"../data/listContent.php",
		data:{fid:fid},
		success:function(data){
			console.log(data);
			var p=data[0];
			var html="";
			html+=`<li></li><li><a href="index.html">金象微电影首页</a>/</li>
				<li><a href="list.html">${p.channel}</a>/</li>
				<li><a href="">${p.ktype}</a>/</li>
				<li><a href="">${p.fname}</a></li>`
			$("#list_show").html(html);
			var html="";
			html+=`<div>
				<img src="${p.pic}" alt="">
				<div>
					<p>${p.fname}</p>
					<p>简介：${p.intro1}</p>
					<p>标签: <span>${p.col}</span><span>${p.district}</span></p>
					<p>${p.intro2}</p>
				</div>	
			</div>
					<p><img src="../images/third_page/fimg010.png" alt=""></p>`;
			$("#show").html(html);
			var html="";
			html+=`<a>${p.score}</a>
				<a>我的评分:</a><a href=""><img src="../images/third_page/fimg007.png" alt=""></a>
				<a href=""><span></span>点评</a>
				<a href=""><span></span>收藏</a>
				<a href=""><span></span>分享</a>
				<a href=""><span></span>用手机</a>
				<a href=""><span></span>10634</a>`
			$("#show_score").html(html);
			
		}
	})
	
	function v_click(){
	var pno=Math.floor(Math.random()*7+1);
	$.ajax({
		type:"get",
		url:"../data/listPage.php",
		data:{pno:pno},
		dataType:"json"
	}).then(data=>{
		var{data}=data;
			var html="";
			for(var i=0;i<data.length-18;i++){
			html+=`<li><a href="listContent.html?fid=${data[i].fid}">
					<img src="${data[i].pic}" alt="">
					<p><span><b>${data[i].intro1}</b><b>${data[i].intro2}</b></span></p>
					<p><span>${data[i].fname}</span><span>2.0</span></p>	
				</a></li>`;
			}
			$("#v_list_show").html(html);
	});
	}
	v_click();
	$("#v_click").click(()=>{
		v_click();
	});

	//加载广告图片
$.ajax({
	type:"get",
	url:"../data/adPic.php",
	data:"",
	success:function(data){
		var html="";
		for(var p of data){
			html+=`<li><img src="${p.sm}" data-md="${p.md}" data-bg="${p.bg}"></li>`
		}
			$("#show_sm").html(html);
			var moved=0,LIWIDTH=62;
			var forward=$("#forward"),
					backward=$("#backward");
			forward.click(function(){
				moved++;
				$("#show_sm").css("left",-LIWIDTH*moved+"px");
				checkA();
			})
			backward.click(function(){
				moved--;
				$("#show_sm").css("left",-LIWIDTH*moved+"px");
				checkA();
			})
			
			function checkA(){
				if(moved==1)
					forward.addClass("disabled");
				else forward.removeClass("disabled");
				if(data.length-moved>=5)
					backward.addClass("disabled");
				else backward.removeClass("disabled");
				}

			var mImg=document.querySelector("#mdImg>img"),
				bgDiv=document.querySelector("#bgImg"),
				 mask=document.getElementById("mask"),
				smask=document.getElementById("superMask"),
				sImg=document.querySelector("#show_sm"),
				v_ad=document.querySelector(".v_ad"),
				p=document.getElementById("img_show"),
				MSIZE=120,MAX=300-120;
			mImg.src=data[0].md;
			bgDiv.style.backgroundImage=`url(${data[0].bg})`;
			sImg.onmouseover=function(e){
				if(e.target.nodeName==="IMG"){
					var {md,bg}=e.target.dataset;
					mImg.src=md;
					bgDiv.style.backgroundImage=`url(${bg})`;
					
				}
			}
			smask.onmouseover=function(){
				mask.style.display="block";
				bgDiv.style.display="block";
			}
			smask.onmouseout=function(){
				mask.style.display="none";
				bgDiv.style.display="none";
			}
			smask.onmousemove=function(e){
				var offsetX=e.offsetX,offsetY=e.offsetY;
				var top=offsetY-MSIZE/2,
						left=offsetX-MSIZE/2;
				if(top<0) top=0;else if(top>MAX) top=MAX;
				if(left<0) left=0;else if(left>MAX) left=MAX;
				mask.style.top=top+"px";
				mask.style.left=left+"px";
				bgDiv.style.backgroundPosition=`${-1.8*left}px ${-1.66*top}px`;
			}
			v_ad.onmouseover=function(){
				 mImg.style.display="block";
				p.style.display="none";
			}
			v_ad.onmouseout=function(){
				mImg.style.display="none";
				p.style.display="block";
			}
	}

});
	function show(){
				var show=document.querySelector(".img_show");
						show.className="";
						if(show.nextElementSibling!=null){
							show.nextElementSibling.className="img_show";
						}else{
							show.parentNode.children[0].className="img_show";
						}
				
		}

setInterval(show,3000);
