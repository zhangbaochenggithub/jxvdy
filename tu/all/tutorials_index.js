$(function(){
	//数据标签切换
	$('.js_data_tab').each(function(i){
		var _f = $(this)
		,	_pl = $('.js_data_tab_panel', _f);
		$('.js_data_tab_h', _f).each(function(){
			$(this).bind('callback', function(e, args){
				dynamicData(args);
			});
			$(this).mouseover(function(){
				var _h = $(this)
				,	_c = _h.data('cache')			//缓存
				,	_m = _h.attr('js_model')		//模型
				,	_t = _h.attr('js_temp')			//模板编号
				,	_act = _h.attr('js_action')		//方法名
				,	_ch = _h.attr('js_ch_id')		//频道
				,	_package = function(data){
						_pl.html(data);
						_h.addClass('on').siblings('.js_data_tab_h').removeClass('on');
						_h.triggerHandler('callback', [$('.js_excerpt', _pl)]);
						lazyLoad();
				};
				if (undefined != _h.data('loading'))
				{
					return;
				}
				_h.data('loading', 1);
				if (undefined != _c)
				{
					_h.removeData('loading') && _package(_c);
					return;
				}
				$.ajax({
					url :'/d/'+_m+'/pb?a='+_act
					,type:'post'
					,cache:false
					,data:{t:_t,c:_ch}
					,success: function(data){
						_h.data('cache', data).removeData('loading');
						_package(data);
						lazyLoad();
					}
					,error:function(e){
						_h.removeData('loading');
					}
				});
				return;
			});
		});
	});	
	
	dynamicData($('.js_excerpt'));
});

//加载动态数据 收藏状态
function dynamicData(obj)
{
	var _ids = [];
	obj.each(function(){
		_ids.push($(this).attr('js_data'));
	});
	if (0 == _ids.length)
	{
		return;
	}
	$.ajax({
			url : '/d/news/index'
			,type: 'post'
			,data: {ids: _ids}
			,dataType:'json'
			,success: function(data){
				$.each(data,function(key, value){
					var _a = $('.js_fa_'+key).attr('js_data', value);
					if(value)
					{
						$('span', _a).html('已收藏');
						$('i', _a).removeClass('fa-star-o').addClass('fa-star');
					}
				});
			}
		});
}


//收藏
function collect(obj, id)
{
	var mrId = $(obj).attr('js_data');
	$.ajax({   
			url : '/d/news/collect'
			,type: 'post'
			,cache:false
			,data: {id:id, mrId:mrId, action:'collect'}
			,success: function(data){
				if(!isNaN(data))
				{
					$(obj).attr('js_data', data);
					if(data == 1)
					{
						$(obj).find('span').html('已收藏');
						$(obj).find('i').removeClass('fa-star-o').addClass('fa-star');
					}
					else
					{
						$(obj).find('span').html('收藏');
						$(obj).find('i').removeClass('fa-star').addClass('fa-star-o');
					}
				}
				else
				{
					if(data == 'login')
					{
						$('.js_popup').trigger('click');
						$('input[name=jumpto]').val(window.location.href);
					}
					else
					{
						alert(data);
					}
				}
			}
		});
}