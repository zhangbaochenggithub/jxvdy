$(function(){
	//表单绑定提交事件
	$('.js_form').bind('submit', doSubmit);
	$('.js_check_available').bind('change', checkAvailable).data('available', true);
	
	//日期选择器
	if (typeof($.cxCalendar) != 'undefined')
	{
		$('.input_cxcalendar').each(function(){
			$(this).cxCalendar({data:new Date()});
		});
	}
	
	//分页
	$('.js_pager').each(function(){
		if (typeof($(this).pager) != 'function')
		{
			return false;
		}
		var _this = $(this)
		,	_n = _this.attr('js_pageno') || 1
		,	_c = _this.attr('js_pagecount') || 1
		,	_u = _this.attr('js_url') || location.href
		,	_b = _u.split(".html")
		;
		_this.pager({
						url:_u
						,pagenumber:_n
						,pagecount:_c
					});
	});
	
	//分数
	setScore();
	
	//长度截取
	$('.js_cut').each(function(){
		var len = $(this).attr('js_data');
		var html = $(this).text();
		if(html.length > len)
		{
			var html = html.substring(0, len);
			var html = html + '...';
		}
		$(this).text(html);
	})
	
	//统计字数
	$("#js_count_char").keydown(function(){
		var curLength=$("#js_count_char").val().length;	
		if(curLength>=140){
			var num=$("#js_count_char").val().substr(0,139);
			$("#js_count_char").val(num);
		}
		else{
			$("#textCount").text(139-$("#js_count_char").val().length)
		}
	});
	
	$('.js_price').each(function(){
		var price = $(this).text();
		if(Number(price) > 99999)
		{
			$(this).text('99999+');
		}
	})
});


//分数
function setScore()
{
	$('.js_video_score').each(function(){
		var score = $(this).attr('js_data');
		
		var val1 = Math.floor(score);
		var val2 = score.substring(score.length-2, score.length);
		if(val1)
		{
			$(this).children('.score_l').html(val1);
			if(val1 != 10)
			{
				$(this).children('.score_s').html(val2);
			}
			else
			{
				$(this).children('.score_s').remove();
			}
		}
	})
}