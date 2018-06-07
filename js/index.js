//广告轮播
$(()=>{//大轮播广告
	$.getJSON("../data/carousel.php")
		.then(data=>{
			console.log(data);
			var html="";
			for(var p of data){
				html+=`<li><img src="${p.img}"></li>`;
			}
			html+=`<li><img src="${data[0].img}"></li>`;
			var $ul=$(".v_banner>div>ul"),
				LIWIDTH=1500,moved=0,interval=500,wait=3000,timer=null;
			$ul.html(html).css("width",(data.length+1)*LIWIDTH);
			var html="";
			for(var p of data){
				html+=`<li><img src="${p.img}"></li>`;
			}
			$(".bannerInds").html(html).children().first().addClass("show_color");
			function move(dir=1){
				if(moved==0&&dir==-1){
					moved=data.length;
					$ul.css("left",-LIWIDTH*data.length);
				}
				moved+=dir;
				$ul.animate({
					left:-LIWIDTH*moved
				},interval,function(){
						if(moved==data.length){
							moved=0;
							$ul.css("left",0);
						}
						$(".bannerInds").children(":eq("+moved+")").addClass("show_color")
							.siblings().removeClass("show_color");
					});
			}
			timer=setInterval(move,wait+interval);
			$(".v_banner").hover(
				function(){
					clearInterval(timer);
					timer=null;
			},
				function(){
					timer=setInterval(move,wait+interval);
			}
		)
		$(".bannerInds").on("click","li:not(.show_color)",function(){
			var i=$(this).index();
			moved=i;
			$ul.stop(true).animate({
				left:-LIWIDTH*moved},150,function(){
					$(".bannerInds").children(":eq("+moved+")").addClass("show_color")
							.siblings().removeClass("show_color");
				})
			})
		$("[data-move=right]").click(function(){
			if(!$ul.is(":animated"))
				move();
		})
			$("[data-move=left]").click(function(){
			if(!$ul.is(":animated"))
				move(-1);
		})
	});
});

$(()=>{//小轮播广告
	$.getJSON("../data/getCarousel.php")
		.then(data=>{
		var html="";
		for(p of data){
			html+=`<li>
							 <a href="${p.href}">
									<img src="${p.img}" title="${p.title}">
									<p>${p.title}</p>
							 </a>
						 </li>`
		}
			$("[data-load=bannerImg]").html(html).children().first().addClass("img_show");
			function img_show(){
				var show=document.querySelector(".banner_img>.img_show");
				var rect=document.querySelector(".rect_color");
				show.className="";
				rect.className="";
				if(show.nextElementSibling!=null ||rect.nextElementSibling!=null){
					show.nextElementSibling.className="img_show";
					rect.nextElementSibling.className="rect_color";
				}else{
					show.parentNode.children[0].className="img_show";
					rect.parentNode.children[0].className="rect_color";
				}
			}
				function left_show(){
					var show=document.querySelector(".banner_img>.img_show");
					var rect=document.querySelector(".rect_color");
					show.className="";
					rect.className="";
					if(show.previousElementSibling!=null ||rect.previousElementSibling!=null){
						show.previousElementSibling.className="img_show";
						rect.previousElementSibling.className="rect_color";
					}else{
						show.parentNode.lastChild.className="img_show";
						rect.parentNode.lastChild.className="rect_color";
				}
			}

			var timer=setInterval(img_show,3000);
			var banner=document.querySelector("#banner"),
					btn_banner=$(".btn_banner");
			 banner.onmouseover=function(){
				clearInterval(timer);
				btn_banner.css("opacity","1");
				timer=null;
			 }
			 banner.onmouseout=function(){
					timer=setInterval(img_show,3000);
					btn_banner.css("opacity","0");
				}
			$(".banner_rect").html("<li></li>".repeat(data.length))
				.children().first().addClass("rect_color");
			$("#btn_left").click(function(){
					left_show()
			})
			$("#btn_right").click(function(){
				img_show()
			})
	})

})
//楼层滚动
$(()=>{
	var $floor=$(".scro_floor"),
			$ul=$(".scro_floor>ul"),
			$floors=$(".floor");
	$(window).scroll(function(){
		var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
		var offsetTop1=$("#f1").offset().top;
		if(scrollTop>=2773){
			$("#t_back").addClass("back_hover");
		}else{
			$("#t_back").removeClass("back_hover");
		}
		if(offsetTop1<=scrollTop+innerHeight/2)
			$floor.show();
		else
			$floor.hide();
		$floors.each(function(i,floor){
			var $floor=$(floor);
			var offsetTop=$floor.offset().top;
			if(offsetTop<scrollTop+innerHeight/2){
				$ul.children(":eq("+i+")").children().addClass("floor_color");
					$ul.children(":eq("+i+")").siblings().children().removeClass("floor_color");

			}
		})
	})

})

window.onclick=function(e){
		console.log(e.data);
}