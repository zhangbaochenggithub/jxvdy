$(function(){
	//双列排行榜 32
	$('.js_rank_double').each(function(){
		var $this = $(this);
		$('.js_rank_handle', $this).each(function(){
			$(this).bind('mouseover', function(){
				var _h = $(this)
				,	_c = _h.data('cache');
				if (undefined != _h.data('loading'))
				{
					return;
				}
				_h.data('loading', 1);
				
				var _package = function(data){
					_h.addClass('on').siblings().removeClass('on');
					var _col = $('.js_col', $this).empty()
					,	_tpl = $('.js_tpl li:first-child', $this);
					$.each(data, function(k,v){
						var _li = _tpl.clone(true)
						,	_i = k+1;
						$('i', _li).addClass('num-'+_i).text(_i);
						$('a', _li).attr('href', v.url)
									.attr('title', v.title)
									.text(v.title);
						_li.appendTo(_col.eq(_i > 5 ? 1 : 0));
					});
				};
				if (undefined != _c)
				{
					_package(_c);
					_h.removeData('loading');
					return;
				}
				$.ajax({
					url:'/d/rank/list?args='+_h.attr('js_data')
					,type:'post'
					,cache:false
					,data:{m:_h.attr('js_data_m'),c:_h.attr('js_data_c')}
					,dataType:'json'
					,success:function(d){
						_h.data('cache', d.data);
						_package(d.data);
						_h.removeData('loading');
					}
				});
				return;
			});
		});
	});
	
	//单列排行榜 11
	$('.js_rank').each(function(){
		var $this = $(this);
		$('.js_rank_handle', $this).each(function(){
			$(this).bind('mouseover', function(){
				var _h = $(this)
				,	_c = _h.data('cache');
				if (undefined != _h.data('loading'))
				{
					return;
				}
				_h.data('loading', 1);
				
				var _package = function(data){
					_h.addClass('on').siblings().removeClass('on');
					var _col = $('.js_col', $this).empty()
					,	_tpl = $('.js_tpl li:first-child', $this);
					$.each(data, function(k,v){
						var _li = _tpl.clone(true)
						,	_i = k+1;
						$('i', _li).addClass('num-'+_i).text(_i);
						$('a', _li).attr('href', v.url)
									.attr('title', v.title)
									.text(v.title);
						_li.appendTo(_col.eq(0));
					});
				};
				if (undefined != _c)
				{
					_package(_c);
					_h.removeData('loading');
					return;
				}
				$.ajax({
					url:'/d/rank/list?args='+_h.attr('js_data')
					,type:'post'
					,cache:false
					,data:{m:_h.attr('js_data_m'),c:_h.attr('js_data_c')}
					,dataType:'json'
					,success:function(d){
						_h.data('cache', d.data);
						_package(d.data);
						_h.removeData('loading');
					}
				});
				return;
			});
		});
	});
	
	//单列排行榜 35
	$('.js_rank_pic').each(function(){
		var $this = $(this);
		$('.js_rank_handle', $this).each(function(){
			$(this).bind('mouseover', function(){
				var _h = $(this)
				,	_c = _h.data('cache');
				if (undefined != _h.data('loading'))
				{
					return;
				}
				_h.data('loading', 1);
				
				var _package = function(data){
					_h.addClass('on').siblings().removeClass('on');
					var _col = $('.js_col', $this).empty()
					,	_tplpic = $('.js_tpl li:first-child', $this)
					,	_tpl = $('.js_tpl li:nth-child(2)', $this);
					$.each(data, function(k,v){
						var _i = k + 1;
						if (k == 0)
						{
							var _li = _tplpic.clone(true);
							$('a', _li).attr('href', v.url)
										.attr('title', v.title)
										.eq(1).text(v.title);
							$('img', _li).attr('src', v.imageUrl)
										.attr('alt', v.title);
							$('p', _li).text(v.vi_introduction);
						}
						else
						{
							var _li = _tpl.clone(true);
							$('i.num', _li).addClass('num-'+_i).text(_i);
							$('a', _li).attr('href', v.url)
										.attr('title', v.title)
										.text(v.title);
							$('div', _li).replaceWith(v.view);
						}
						_li.appendTo(_col.eq(0));	
					});
				};
				if (undefined != _c)
				{
					_package(_c);
					_h.removeData('loading');
					return;
				}
				$.ajax({
					url:'/d/rank/list?args='+_h.attr('js_data')
					,type:'post'
					,cache:false
					,data:{m:_h.attr('js_data_m'),c:_h.attr('js_data_c')}
					,dataType:'json'
					,success:function(d){
						_h.data('cache', d.data);
						_package(d.data);
						_h.removeData('loading');
						lazyLoad();
					}
				});
				return;
			});
		});
	});
});