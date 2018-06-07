$(function(){
	$('.js_pb_jxvdy').each(function(){
		var _f = $(this)
		,	_m = _f.attr('js_model')		//模型
		,	_t = _f.attr('js_temp')			//模板编号
		,	_act = _f.attr('js_action')		//方法名
		,	_ch = _f.attr('js_ch_id')		//频道
		,	_p = $('.js_reload_panel', _f).length ? $('.js_reload_panel', _f) : _f;
		$.ajax({   
			url : '/d/'+_m+'/pb?a='+_act
			,type:'post'
			,data:{t:_t,c:_ch}
			,success: function(data){
				_p.html(data);
				if(_m == 'video_info' || _m == 'drama')
				{
					setScore();
				}
				lazyLoad();
			}
		});
	});
})
	