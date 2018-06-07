//导航当前栏目高亮
$('#js_nav_highlight').surReady(function(){
	var _r = location.pathname.match(/\/([a-z]+)/)
	,_n = (null !== _r && typeof(_r[1]) != 'undefined') ? _r[1] : '';
	if(typeof(_n) == 'string')
	{
		$('.js_navbtn_'+_n).addClass('nav-up-selected-inpage').siblings().removeClass('nav-up-selected-inpage');
	}
});

//监测到标签载入立即执行	开始

// 首页通栏焦点图
$('#js_index_focus_wrap').surReady(function(){
    $(this).slide({
        titCell: ".thumbnail-wrap li",
        mainCell: ".focus-figure",
        prevCell:".thumb-prev",
        nextCell:".thumb-next",
        targetCell: ".focus-title li",
        effect: "fold",
        interTime:5000,
        delayTime: 800,
        autoPlay: true,
        triggerTime: 0
    });
});


//微电影(网络剧)频道首页通栏焦点图
$('#js_focus_wrap').surReady(function(){
    $(this).slide({
        titCell: ".thumbnail-wrap li",
        mainCell: ".focus-figure",
        targetCell: ".focus-title li",
        effect: "fold",
        interTime:4000,
        delayTime: 800,
        autoPlay: true,
        triggerTime: 0
    });
});

// 资讯焦点图
$('#js_index_slide_wrap').surReady(function(){
	var _btn = $('.prev,.next', this);
	//鼠标移过，左右按钮显示
	$(this).hover(function(){
		_btn.stop(true, true).fadeTo('show', 0.6);
		}, function(){
			_btn.fadeOut();
	})
	// 图片切换
	.slide({
		mainCell: '#js_index_slide_wrap .index-slide-inner',
		effect: 'fold',
		autoPlay: true,
		interTime:4000,
		delayTime: 600,
		trigger: 'click'
	}).data('slide', 'OK');
});
//资讯焦点图fix
$(function(){
	$('#js_index_slide_wrap').slide({
		mainCell: '.index-slide-inner',
		effect: 'fold',
		autoPlay: true,
		interTime:4000,
		delayTime: 600,
		trigger: 'click'
	});
	
	lazyLoad();
});

//微影剧本频道&教学频道首页焦点图 大图和文字切换
$('#js_focus_screenplay').surReady(function(){	
	$(this).slide({
		titCell: "#js_focus_nav li",
		mainCell: "#js_focus_pic",
		targetCell: "#js_focus_text li",
		effect: "left",
		interTime:4000,
		delayTime: 300,
		autoPlay: true,
		triggerTime: 0
	}).find('#js_focus_text').show();
});

// 播放记录TAB
$('#js_history_tab').surReady(function(){
	$(this).slide({
		mainCell: ".history-inner",
		pnLoop: false,
		delayTime: 100
	});
});

// 剧本&故事梗概、人物资料TAB
$('#js_widget_screenplay_tab').surReady(function(){
	$(this).slide({
		mainCell: ".widget-screenplay-inner",
		pnLoop: false,
		delayTime: 100
	});
});

function lazyLoad()
{
	//当前效果代码
	$("#displayBox .hd a").click(function(){ $("#displayBox").hide(); $("#displayBox iframe").attr("src","") }); //关闭隐藏盒子
	$("#displayBox").blur( function(){ $(this).hide } );

	var isIE6 = !!window.ActiveXObject&&!window.XMLHttpRequest;
	
	//滚动加载
	var scrollLoad =function(){
		$("#lazyload_content img[_src]").each(function(){
			var t = $(this);
			if(t.hasClass('lazy-video'))
			{
				var _s = 'http://skin.jxvdy.com/jxvdy2/public/images/lazy_video.png';
			}
			else
			{
				var _s = 'http://skin.jxvdy.com/jxvdy2/public/images/lazy_article.png';
			}
			t.attr("src",_s);
			if( t.offset().top<= $(document).scrollTop() + $(window).height()  )
			{
				t.attr('src',t.attr('_src')).removeAttr('_src');
			}
		});//each E
	}

	scrollLoad();
	$(window).scroll(function(){ 
		if(isIE6){ $("#displayBox").css("top", $(document).scrollTop()+10) }
		scrollLoad();
	});
}

// 栏目筛选展开收起(用于列表页/搜索页)
$('#js_btn_filter').surReady(function(){
	$(this).click(function() { //当点击黄色块触发btn-filter
		$(".subcolumn-select").slideToggle("slow");
		$(this).toggleClass("open");
		return false; //触发后然后改变小图标方向，css在.open定义的
	});
});

// 微影活动频道焦点图 把最后一个放到第一个前面，然后通过外层ul{margin-left:-980px !important; }来显示第一个
$('#js_preview_slider_wrap').surReady(function(){
	$(".slide-inner li", this).first().before($(".preview-slider-wrap .slide-inner li").last());
	// 控制左右按钮显示
	$(this).hover(function() {
		$(this).find(".arrow").stop(true, true).fadeIn(300)
		}, function() {
			$(this).find(".arrow").fadeOut(300)
	})
	.slide({
		titCell: ".slide-indicators ul",
		mainCell: ".slide-inner ul",
		effect: "leftLoop",
		autoPlay: true,
		vis: 3,
		autoPage: true,
		trigger: "click"
	});
});

// 主导航二级菜单
$('#js_nav').surReady(function(){
	var _list={}
		,_m = ($('.nav-down-menu').width()-$('.navigation-down-inner').width())/2;
	$('.js_navdown').each(function(){
		var _nav = $(this).attr('js_navdown')
			,	_k = _nav + '_timer'
			,	_btn= $('.js_navbtn_'+_nav)
			,	_sub = $('#js_navsub_'+_nav)
			,	_pos = _btn.offset().left+(_btn.width()/2);
		$(this).hover(function(){
			clearTimeout(_list[_k]);
			_list[_k] = setTimeout(function(){
				_btn.addClass('nav-up-selected').siblings().removeClass('nav-up-selected');
				_sub.stop(true,true).slideDown(150);
					var _width = 0;
					$('dl', _sub).each(function(){
						_width += $(this).width();
					});
					$('dl', _sub).eq(0).css('marginLeft', _pos-(_width/2)-_m);
				}, 100);
			},function(){
				clearTimeout(_list[_k]);
				_list[_k] = setTimeout(function(){
					$('.js_navdown').removeClass('nav-up-selected');
					_sub.stop(true,true).slideUp(150);
					}, 100);
		});
	});
});

// 滚动时间轴
$('#timeline').surReady(function(){
	var _intv = null;
	$(this).mouseover(function(){
			clearInterval(_intv);
		}).mouseleave(function(){
			_intv = setInterval(function(){
				var _tl = $('#timeline');
				_tl.prepend($('li:last', _tl)).css('marginTop', '-110px')
				.animate({'marginTop': '0px'}, 800);
			}, 3000);
		}).triggerHandler('mouseleave');
});

// 投稿历史记录滚动插件
$('#tougao-scrollbar').surReady(function(){
	$(this).slimscroll({
	    height: '326px',
	    width: '598px',
	    distance: '5px'
	});
});

//监测到标签载入立即执行	结束

//页面DOM载入完毕时执行	开始
$(function(){

	// 主导航向上向下效果
	(function() {
		var _h = $('#header');
		if (_h.length != 0)
		{
			new Headroom(_h.get(0),{
				tolerance: 5,
				offset : 200,
				classes: {
					initial: "header-animated",
					pinned: "slideDown",
					unpinned: "slideUp"
				}
			}).init();
		}
	}());

	// 下拉菜单(用于三角下拉)
	$(".dropdown-wrap").slide({
		type: "menu", //效果类型
		titCell: ".dropdown-object", // 鼠标触发对象
		targetCell: ".dropdown-inner", // 效果对象，必须被titCell包含
		delayTime: 0, // 效果时间
		defaultPlay: false, //默认不执行
		returnDefault: true // 返回默认
	});

	// 浮动固定位置(用于内页排行榜)
	(function(){
		var _S = $('#sidebar')
		,	_F = $('#footer');
		if (_S.offset() != undefined && _F.offset() != undefined) {
			var _t = _S.offset().top;
			$(window).scroll(function(e){
				var	_mY = _F.offset().top - _S.outerHeight(true)
				,	_y = $(this).scrollTop();
				if (_y <= _t)
				{
					_S.removeClass('fixed').removeAttr('style');
					return;
				}
				if (_y <= _mY)
				{
					_S.addClass('fixed').removeAttr('style');
				}
				else
				{
					_S.removeClass('fixed').css({position: 'absolute',top: _mY+'px'});
				}
			});
		}
	})();
	// 提示插件zebra_tooltips
	new $.Zebra_Tooltips($('.zebra_tips1'));

	// 历史记录滚动插件
	$('#history-scrollbar').slimscroll({
		height: '300px',
		width: '335px',
		distance: '5px'
	});

	//返回顶部
	$(window).scroll(function(){
		if($(window).scrollTop()>100){
			$("#side-bar .gotop").fadeIn();
		}
		else{
			$("#side-bar .gotop").hide();
		}
	});
	$("#side-bar .gotop").click(function(){
		$('html,body').animate({'scrollTop':0},500);
	});

	// 弹出层
	$('.js_popup').click(function() {

		$('.popup-wrap-mask').fadeIn(100);
		var _t = $(this).attr('js_popup');
		if (_t == 'js_popup_login' && typeof(oauthLoginInit) == 'function')
		{
			oauthLoginInit();
		}
		$('#'+_t).slideDown(200);
	});
	$('.js_popup_closed').click(function() {
		$('.popup-wrap-mask').fadeOut(100);
		$(this).closest('.js_popup_content').slideUp(200);
	});

	//移动推广弹层
	if (false && window == top)	//false关闭
	{
		(function(){
			//检测平台
			var _plat ={
						lang: (navigator.browserLanguage || navigator.language).toLowerCase(),
						ver: function(){
							var u = navigator.userAgent, app = navigator.appVersion;
							return {//移动终端浏览器版本信息
									trident: u.indexOf('Trident') > -1, //IE内核
									presto: u.indexOf('Presto') > -1, //opera内核
									webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
									gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
									mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
									ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
									android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
									iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
									iPad: u.indexOf('iPad') > -1, //是否iPad
									webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
								};
							}()
						};

			if (_plat.ver.ios || _plat.ver.iPhone || _plat.ver.iPad)
			{
				var _cookieName = 'JX_mobile_ad_nopop';
				if (1 == $.getCookie(_cookieName))	//判断冷却cookie
				{
					return;
				}
				$('<div id="js_m_layer" />').appendTo('html')
					.load('http://m.jxvdy.com/wellcome/layer.html', function(data){
						var _meta = $('<meta name="viewport" content="width=device-width, initial-scale=1" />').appendTo('head');	
						$('.js_popup_closed',this).click(function(){
								$('#js_m_layer').remove();	
								_meta.remove();
								$('body').show();
						});
						$('.js_nopop', this).click(function(){
							$.setCookie(_cookieName, 1, '0.5d');	//设置冷却cookie
						});
						$('body').hide();
					});
			}
		})();
	}

	//单击多选选中
	(function(){
		var i=$(this);
		var p=i.find(".maps-checked em");
		p.click(function(){
			if(!!$(this).hasClass("item-checked")){
				$(this).removeClass("item-checked");
			}else{
				$(this).addClass("item-checked").siblings().removeClass("item-checked");
			}
		});
	}());

});	//ready end
//页面DOM载入完毕时执行	结束

// 倒计时(用于剧本征集内页)
function countDown(time, day_elem, hour_elem, minute_elem, second_elem) {
	//if(typeof end_time == "string")
	var end_time = new Date(time).getTime(), //月份是实际月份-1
	//current_time = new Date().getTime(),
	sys_second = (end_time - new Date().getTime()) / 1000;
	var timer = setInterval(function() {
		if (sys_second > 0) {
			sys_second -= 1;
			var day = Math.floor((sys_second / 3600) / 24);
			var hour = Math.floor((sys_second / 3600) % 24);
			var minute = Math.floor((sys_second / 60) % 60);
			var second = Math.floor(sys_second % 60);
			day_elem && $(day_elem).text(day); //计算天
			$(hour_elem).text(hour < 10 ? "0" + hour : hour); //计算小时
			$(minute_elem).text(minute < 10 ? "0" + minute : minute); //计算分
			$(second_elem).text(second < 10 ? "0" + second : second); // 计算秒
		} else {
			clearInterval(timer);
		}
		}, 1000);
};

//字数限制
function checkLength(ele)
{
	var _e = $(ele)
    ,	_mltip = $(_e.attr('js_mltip'))
    ,	_mc = parseInt(_e.attr('js_ml')) || 250
    ,	_curr = _mc - ele.value.length //250 减去 当前输入的
    ,	_sel = _e.parents('form').find('input:submit');
    if(_sel.length == 0)
   {
	   var _sel = _e.parents('form').find('input:button');
   }
    if(_curr < 0)
    {
    	var _msg = "已经超出<span style='color:red'>"+Math.abs(_curr.toString())+"</span>个字";
    	_sel.removeClass('btn-warning').addClass('btn-error').attr('disabled', 'disabled');
    }
    else
    {
		_msg = '还可以输入'+_curr.toString()+'个字';
		_sel.removeClass('btn-error').addClass('btn-warning').removeAttr('disabled');
    }
    _mltip.html(_msg);
    return true;
}