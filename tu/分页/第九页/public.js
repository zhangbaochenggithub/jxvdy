$(function(){
	setScore();
	
	//搜索关键字高亮显示
	if(typeof(keyword) != 'undefined')
	{
		if(keyword)
		{
			var re=new RegExp(keyword,"g");
			$(".js_search_jxvdy").each(function(){
				var _t = $('.js_title', this).html()
				,_s = $('.js_summary', this).html()
				,_tag = $('.js_tag_jxvdy', this).html()
				,_type = $('.js_type_jxvdy', this).html()
				,_y = $('.js_years_jxvdy', this).html();
				
				var _nt = _t.replace(re, "<span style='color:red'>"+keyword+"</span>")
				,_ns = _s.replace(re, "<span style='color:red'>"+keyword+"</span>");
				if(_tag != undefined)
				{
					var _ntag = _tag.replace(re, "<span style='color:red'>"+keyword+"</span>");
					$('.js_tag_jxvdy', this).html(_ntag);
				}
				if(_type != undefined)
				{
					var _ntype = _type.replace(re, "<span style='color:red'>"+keyword+"</span>");
					$('.js_type_jxvdy', this).html(_ntype);
				}
				if(_y != undefined)
				{
					_ny = _y.replace(re, "<span style='color:red'>"+keyword+"</span>");
					$('.js_years_jxvdy', this).html(_ny);
				}
				
				$('.js_title', this).html(_nt);
				$('.js_summary', this).html(_ns);
			})
		}
	}
	lazyLoad();
})

//分数
function setScore()
{
	$('.js_video_score').each(function(){
		var score = $(this).attr('js_data');
		var val1 = Math.floor(score);
		var val2 = score.substring(score.length-2, score.length);
		if(val1)
		{
			$(this).children('.video-score').find('span').html(val1);
			if(val1 != 10)
			{
				$(this).children('.video-score').find('small').html(val2);
			}
			else
			{
				$(this).children('.video-score').find('small').remove();
			}
		}
	})
}
