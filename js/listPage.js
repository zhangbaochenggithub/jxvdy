function load(pno=1){
	var kw;
	if(location.search!=="")
		kw=location.search.slice(1);
	ajax({
		type:"get",
		url:"../data/listPage.php",
		data:"pno="+pno+(kw?"&"+kw:""),
		dataType:"json"
	}).then(output=>{
		var {data,pno,pcount}=output;
		var html="";
		for(var p of data){
			html+=`<li><a href="listContent.html?fid=${p.fid}">
				<img src="${p.pic}" alt="">
				<p><span><i>${p.intro1}</i><b>${p.intro2}</b></span></p>
				<p><span>${p.fname}</span><span>${p.score}</span></p>	
			</a></li>`
		}
			document.getElementById("show_list").innerHTML=html;
			var html=`<a href="javascript:;" class="previous ">上一页</a>`;
			for(var i=1;i<=pcount;i++){
				html+=`<a href="javascript:;" class=${i==pno?"current":""}>${i}</a>`;
			}
			html+=`<a href="javascript:;" class="next">下一页</a>`;
			var divPages=document.getElementById("pages");
			divPages.innerHTML=html;
			var prev=divPages.children[0],
				next=divPages.lastElementChild;
			if(pno==1){
				prev.className="previous disabled";
				prev.removeAttribute("href");
			}else prev.className="previous";
			if(pno==pcount){
				next.className="next disabled";
				next.removeAttribute("href");
				}else next.className="next";
	})
}
	(()=>{
		load();
		document.getElementById("pages").onclick=function(e){
			if(e.target.nodeName=="A"){
				var a=e.target;
				if(!/disabled|current/.test(a.className)){
					if(/previous|next/.test(a.className)){
						var i=parseInt(document.querySelector("#pages>.current").innerHTML);
						if(a.className=="previous"){
							load(i-1);
						}else{
							load(i+1);
						}
					}else{
						load(a.innerHTML);
					}
				}
			}
		}
	})();

//类型 地区 年代 查询
$("#show_col").on("click","li>a",function(e){
	e.preventDefault();
	var $this=$(this).html();
	location="list.html?col="+$this;
		
})

function clo(){
var url=window.location.href;
		console.log(url);
	if(url.indexOf("col=%E7%BD%91%E7%BB%9C%E5%89%A7")>1){
		$("#show_col>li").eq(2).children().addClass("v_check");
		$("#show_col>li").eq(2).siblings().children().removeClass("v_check");

	}
}
clo();
$("#show_type").on("click","li>a",function(e){
	e.preventDefault();
	var $this=$(this).html();
	location="list.html?ktype="+$this;
//	$("#show_type>li>a").attr("href","list.html?ktype="+$this);
	if($this=="全部"||$this=="其他"){
		location="list.html?";
	}
})
function type(){
	var url=window.location.href;
	if(url.indexOf("ktype=%E7%88%B1%E6%83%85")>1){
		$("#show_type>li").eq(2).children().addClass("v_check");
		$("#show_type>li").eq(2).siblings().children().removeClass("v_check");
	}
	if(url.indexOf("ktype=%E6%A0%A1%E5%9B%AD")>1){
		$("#show_type>li").eq(3).children().addClass("v_check");
		$("#show_type>li").eq(3).siblings().children().removeClass("v_check");
	}
	if(url.indexOf("ktype=%E6%B8%A9%E6%83%85")>1){
		$("#show_type>li").eq(4).children().addClass("v_check");
		$("#show_type>li").eq(4).siblings().children().removeClass("v_check");
	}
		if(url.indexOf("ktype=%E5%8A%B1%E5%BF%97")>1){
		$("#show_type>li").eq(5).children().addClass("v_check");
		$("#show_type>li").eq(5).siblings().children().removeClass("v_check");
	}
		if(url.indexOf("ktype=%E7%A4%BE%E4%BC%9A")>1){
		$("#show_type>li").eq(6).children().addClass("v_check");
		$("#show_type>li").eq(6).siblings().children().removeClass("v_check");
	}
		if(url.indexOf("ktype=%E8%81%8C%E5%9C%BA")>1){
		$("#show_type>li").eq(7).children().addClass("v_check");
		$("#show_type>li").eq(7).siblings().children().removeClass("v_check");
	}
		if(url.indexOf("ktype=%E6%90%9E%E7%AC%91")>1){
		$("#show_type>li").eq(8).children().addClass("v_check");
		$("#show_type>li").eq(8).siblings().children().removeClass("v_check");
	}
	if(url.indexOf("ktype=%E6%82%AC%E7%96%91")>1){
		$("#show_type>li").eq(9).children().addClass("v_check");
		$("#show_type>li").eq(9).siblings().children().removeClass("v_check");
	}
	if(url.indexOf("ktype=%E7%A9%BF%E8%B6%8A")>1){
		$("#show_type>li").eq(10).children().addClass("v_check");
		$("#show_type>li").eq(11).siblings().children().removeClass("v_check");
	}
	if(url.indexOf("type=%E5%89%A7%E6%83%85")>1){
		$("#show_type>li").eq(-4).children().addClass("v_check");
		$("#show_type>li").eq(-4).siblings().children().removeClass("v_check");
	}
}
type();
$("#show_dist").on("click","li>a",function(e){
	e.preventDefault();
	var $this=$(this).html();
	location="list.html?district="+$this
	if($this=="全部"||$this=="其他"){
		location="list.html?";
	}
})
function dist(){
	var url=window.location.href;
	if(url.indexOf("district=%E5%9B%BD%E5%86%85")>1){
		$("#show_dist>li").eq(2).children().addClass("v_check");
		$("#show_dist>li").eq(2).siblings().children().removeClass("v_check");
	}
	if(url.indexOf("district=%E5%9B%BD%E5%A4%96")>1){
		$("#show_dist>li").eq(3).children().addClass("v_check");
		$("#show_dist>li").eq(3).siblings().children().removeClass("v_check");
	}
}
dist();
$("#show_year").on("click","li>a",function(e){
	e.preventDefault();
	var $this=$(this).html();
	location="list.html?fyear="+$this;
	if($this=="全部"){
		location="list.html?";
	}
	if($this=="其他"){
		location="list.html?qita";
	}

})
function year(){
	var url=window.location.href;
	if(url.indexOf("fyear=2015")>1){
		$("#show_year>li").eq(2).children().addClass("v_check");
		$("#show_year>li").eq(2).siblings().children().removeClass("v_check");
	}
	if(url.indexOf("fyear=2014")>1){
		$("#show_year>li").eq(3).children().addClass("v_check");
		$("#show_year>li").eq(3).siblings().children().removeClass("v_check");
	}
	if(url.indexOf("fyear=2013")>1){
		$("#show_year>li").eq(4).children().addClass("v_check");
		$("#show_year>li").eq(4).siblings().children().removeClass("v_check");
	}
	if(url.indexOf("fyear=2012")>1){
		$("#show_year>li").eq(5).children().addClass("v_check");
		$("#show_year>li").eq(5).siblings().children().removeClass("v_check");
	}
	if(url.indexOf("qita")>1){
		$("#show_year>li").eq(6).children().addClass("v_check");
		$("#show_year>li").eq(6).siblings().children().removeClass("v_check");
	}
}
year();

$("#show_score").on("click","a",function(e){
	e.preventDefault();
	var $this=$(this).html();
	location="list.html";
	if($this=="评分最高")
	location="list.html?score=?";
})
$("#show_hide").click(function(e){
	e.preventDefault();
	if($("#show_type").is(":has(:hidden)")){
			$("#show_type").show();
			$("#show_dist").show();
			$("#show_year").show();
			$(this).html("收起筛选");
	}else{
			$("#show_type").hide();
			$("#show_dist").hide();
			$("#show_year").hide();
			$(this).html("显示筛选");
	}
})


