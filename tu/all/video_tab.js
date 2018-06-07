$(function(){
	//切换标签
	$('.js_video_tab').each(function(i){
		var _f = $(this)
		,	_pl = $('.js_video_tab_panel', _f)
		,	_tpl = _pl.attr('js_tpl');
		$('.js_video_tab_handle', _f).each(function(){
			$(this).mouseover(function(){
				var _h = $(this)
				,	_c = _h.data('cache');
				if (undefined != _h.data('loading'))
				{
					return;
				}
				_h.data('loading', 1);
				var _ch = _h.attr('js_data');
				var _package = function(data){
					_h.addClass('on').siblings().removeClass('on');
					_f.removeData('pageno');
					_pl.html(data);
					setScore();
					lazyLoad();
				};
				if (undefined != _c)
				{
					_package(_c);
					_h.removeData('loading');
					return;
				}
				$.ajax({
					url : '/d/video_info/latestvideo'
					,type:'post'
					,cache:false
					,data:{t:_tpl,c:_ch}
					,success: function(data){
						_h.data('cache', data);
						_package(data);
						_h.removeData('loading');
					}
				});
				return;
			});
		});
		//换一换
		$('.js_video_tab_next', _f).each(function(){
			$(this).bind('click', function(){
				var _pc = $('.js_video_tab_pagecount', _f).attr('js_data')
				,	_pn = _f.data('pageno') || 1
				,	_ch = $('.js_video_tab_handle', _f).filter('.on').attr('js_data')
				,	_num = Number(_pn) + 1;
				if (_num > _pc)
				{
					_num = 0;
				}
				$.ajax({
					url:'/d/video_info/latestvideo?set='+_num
					,type:'post'
					,cahce:false
					,data:{t:_tpl,c:_ch}
					,success:function(data){
						_f.data('pageno', _num);
						_pl.html(data);
						setScore();
						lazyLoad();
					}
				});
			});
		});
	});
});