$(function(){
	if($('.widget-fans-inner ul').find('li').length == 0)
	{
		$('.js_view_jxvdy').remove();
	}
		
	var id = $('.action-area').attr('js_data');
	$.ajax({
			url : '/d/video_info/setcookie'
			,type : 'post'
			,data : {'model': _MODEL, id: id}
			,success: function(){
				
			}
		})

	$.ajax({   
			url : '/d/video/inside',
			type: 'post',
			data: {id: id},
			success: function(json){
				var data = jQuery.parseJSON(json)
				$('.play-grade').attr('js_data', data['c'])
								.attr('js_score', Number(data['score']));
				var score = String(data['score']);
				var val1 = Math.floor(Number(score));
				var val2 = score.substring(score.length-2, score.length);
				if(val1)
				{
					$('.play-grade').children('.video_score').html(val1);
					if(val1 != 10)
					{
						$('.play-grade').children('.small').html(val2);
					}
					else
					{
						$('.play-grade').children('.small').remove();
					}
				}
				
				if(data['myScore'])
				{
					var num = Number(data['myScore'])/2;
					$("#rating-box").addClass('rating-stars'+num);
					$('.play-grade').attr('js_data_yi', data['myScore']);
				}
				
				if(data['coll'])
				{
					$('.video_collection').html('已收藏')
									.prev('.fa').removeClass('fa-star-o').addClass('fa-star')
								.parent('a').addClass('active');
				}
				$('.count-item').children('em').html(data['view'])
			} 
		});
		
	//星星评分
	var vi_id = $("#rating-box").attr('js_data');
	$('.rating').each(function(){
		$(this).click(function(){
			var num = Number($(this).html())
			var vs_value = num * 2;
			$.ajax({   
				url : '/d/video/comment',
				type: 'post',
				data: {vi_id: vi_id, vs_value: vs_value},
				success: function(data){
					if(data == 1)
					{
						var _n = $('.play-grade').attr('js_data');
						var _s = $('.play-grade').attr('js_score');
						var _i = $('.play-grade').attr('js_data_yi');
						if(_i)
						{
							var _num = Number(_n);
							var _score = Number(_s) * _num - Number(_i) + Number(vs_value);
						}
						else
						{
							var _num = Number(_n) + 1;
							var _score = Number(_s) * Number(_n) + Number(vs_value);
						}
						var _ss = (_score) /(_num);
						var score = _ss.toFixed(1);
						
						var preg = /rating-stars\d+/gi;
						var str = $("#rating-box").attr('class').match(preg);
						if(str != null)
						{
							for(i = 0; i < str.length; i++)
							{
								$("#rating-box").removeClass(str[i]);
							}
						}
						$("#rating-box").addClass('rating-stars'+num);
						var val1 = Math.floor(Number(score));
						var val2 = String(score).substring(score.length-2, score.length);
						if(val1)
						{
							$('.play-grade').children('.video_score').html(val1);
							if(val1 != 10)
							{
								$('.play-grade').children('.small').html(val2);
							}
							else
							{
								$('.play-grade').children('.small').remove();
							}
						}
					}
					else if(data == 'login')
					{
						$("#popup_login").trigger('click');
						$('.form-usr').find("input[name=jumpto]").val(window.location.href);
					}
					else
					{
						alert(data);
					}
				} 
			});
		})
	})
})

//收藏
function collect(id)
{
	$.ajax({   
			url : '/d/video_info/collect',
			type: 'post',
			data: {vi_id: id},    
			success: function(data){
				if(!isNaN(data))
				{
					if(data == 1)
					{
						$('.video_collection').html('已收藏')
										.prev('.fa').removeClass('fa-star-o').addClass('fa-star')
									.parent('a').addClass('active');
					}
					else
					{
						$('.video_collection').html('收藏')
										.prev('.fa').removeClass('fa-star').addClass('fa-star-o')
									.parent('a').removeClass('active');
					}
				}
				else if(data == 'login')
				{
					$("#popup_login").trigger('click');
					$('.form-usr').find("input[name=jumpto]").val(window.location.href);
				}
				else
				{
					alert(data)
				}
			}
	});
}

var flashvars={
	f:JS_CKPLAYER_F,//视频地址
	a:JS_CKPLAYER_A,//调用时的参数，只有当s>0的时候有效
	i:'',//初始图片地址
	l:'',//前置广告，swf/图片/视频，多个用竖线隔开，图片和视频要加链接地址
	r:'',//前置广告的链接地址，多个用竖线隔开，没有的留空
	t:'30',//视频开始前播放swf/图片时的时间，多个用竖线隔开
	d:'',//暂停时播放的广告，swf/图片,多个用竖线隔开，图片要加链接地址，没有的时候留空就行
	u:'',
	s:'2',//调用方式，0=普通方法（f=视频地址），1=网址形式,2=xml形式，3=swf形式(s>0时f=网址，配合a来完成对地址的组装)
	c:'0',//是否读取文本配置,0不是，1是
	e:'0',//视频结束后的动作，0是调用js函数，1是循环播放，2是暂停播放并且不调用广告，3是调用视频推荐列表的插件，4是清除视频流并调用js功能和1差不多，5是暂停播放并且调用暂停广告
	wh:'',//这是6.2新增加的宽高比，可以自己定义视频的宽高或宽高比如：wh:'4:3',或wh:'1080:720
	b:0,//指定播放器是否进行交互，默认交互，b=1时不使用交互，所以在站外引用时需要设置ckplayer.xml里的里设置<flashvars>{b->1}</flashvars>
	h:4,//播放http视频流时采用何种拖动方法，=0不使用任意拖动，=1是使用按关键帧，=2是按时间点，=3是自动判断按什么(如果视频格式是.mp4就按关键帧，.flv就按关键时间)，=4也是自动判断(只要包含字符mp4就按mp4来，只要包含字符flv就按flv来)
	ct:'2',//6.2新增加的参数，主要针对有些视频拖动时时间出错的修正参数，默认是2，自动修正，1是强制修正，0是强制不修正
	p:1,	//视频默认0是暂停，1是播放
	};
var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always', wmode:'transparent'};
var box;


$(function(){
	//CKobject.embedSWF(播放器路径,容器id,播放器id/name,播放器宽,播放器高,flashvars的值,其它定义也可省略);
	
	CKobject.embedSWF('http://skin.jxvdy.com/jxvdy/web/ckplayer65/ckplayer.swf','a1','ckplayer_a1','1100','540',flashvars,params);
//	var video=['http://movie.ks.js.cn/flv/other/1_0.mp4->video/mp4','http://www.ckplayer.com/webm/0.webm->video/webm','http://www.ckplayer.com/webm/0.ogv->video/ogg'];
	var video=JS_CKPLAYER_VIDEO;
	var support=['iPad','iPhone','ios','android+false','msie10+false'];
	CKobject.embedHTML5('a1','ckplayer_a1',1100,540,video,flashvars,support);
	/*box = new LightBox();*/
	$('.js_ck_replay').bind('click', function(){
		$('#js_playend').hide();
		CKobject.getObjectById('ckplayer_a1').ckplayer_play();
	});
});


//播放完毕
function playerstop()
{
	//只有当调用视频播放器时设置e=0或4时会有效果
//	$('#js_playend').show();	
}

//关灯
function closelights(){
	box.Show();
	CKobject._K_('video').style.width='1100px';
	CKobject._K_('video').style.height='540px';
	swfobject.getObjectById('ckplayer_a1').width=1100;
	swfobject.getObjectById('ckplayer_a1').height=540;
}

//开灯
function openlights(){
	box.Close();
	CKobject._K_('video').style.width='1100px';
	CKobject._K_('video').style.height='540px';
	swfobject.getObjectById('ckplayer_a1').width=1100;
	swfobject.getObjectById('ckplayer_a1').height=540;
}

//评论
function comment(url, id, model)
{
	$.ajax({   
			url : '/d/video_info/popcomment',
			type: 'post',
			data: {id: id, model: model},
			success: function(data){
				var _i = $(data).find('.closed').parent().parent().attr('id')
					,_id = _i.replace('js_', '');
				$('body').append(data);
				pop(url, _id);
			}
		});
}

function pop(url, _i)
{
	$('#'+_i).trigger('click');
	$('.js_video_comment_submit').click(function(){
		var coc_id = $("input[name='cId']").val();
		var vi_id = $("input[name='vId']").val();
		/*var tag = $("input[name='tag']").val();*/
		var comment = $("textarea[name='comment']").val();
		if(comment.length == 0)
		{
			alert('评论内容不能为空');
			return;
		}
		$.ajax({
			url : url,
			type: 'post',
			data: {'coc_id': coc_id, 'vi_id' : vi_id, /*'tag' :tag,*/ 'comment':comment},
			success: function(d){
				if(d == 1)
				{
					$.ajax({   
						url : window.location.href,
						success: function(){
							$('.js_popup_closed').trigger('click');
						}
					});
				}
				else
				{
					if(d == 'login')
					{
						$('.popup-wrap-mask').fadeOut(100);
						$('.js_popup_content').slideUp(200);
						$('#popup_login').trigger('click');
						$('input[name=jumpto]').val(window.location.href);
					}
					else
					{
						alert(d);
					}
				}
			}
		})
	});
}

function closed(obj)
{
	$('.popup-wrap-mask').fadeOut(100);
	$(obj).closest('.js_popup_content').slideUp(200);
}