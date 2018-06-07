$(function(){
	//换一换
	$('.js_reload').each(function(){
		var _f = $(this);
		$('.js_reload_h', _f).each(function(){
			$(this).click(function(){
				var _h = $(this)
				,	_pc = $('.js_reload_pagecount', _f).attr('js_data') 	//总页数
				,	_pn = _f.data('pageno') || 1	//页码
				,	_m = _h.attr('js_model')		//模型
				,	_t = _h.attr('js_temp')			//模板编号
				,	_act = _h.attr('js_action')		//方法名
				,	_ch = _h.attr('js_ch_id');		//频道

				var _num = Number(_pn) + 1;
				if(_num > _pc)
				{
					_num = 0;
				}
				$.ajax({   
					url : '/d/'+_m+'/pb?a='+_act+'&set='+_pn
					,type:'post'
					,data:{t:_t,c:_ch}
					,success: function(data){
						_f.data('pageno', _num);
						$('.js_reload_panel', _f).html(data);
						setScore();
						lazyLoad();
					}
				});
			});
		});
	});
});