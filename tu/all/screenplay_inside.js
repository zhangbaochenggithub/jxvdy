$(function(){
	if($('.widget-fans-inner ul').find('li').length == 0)
	{
		$('.js_fans_jxvdy').remove();
	}
	var id = $('.comment_num').attr('js_data');
	var cocId = $('.comment_num').attr('js_coc_id');
	$.ajax({   
			url : '/d/screenplay/inside',
			type: 'post',
			data: {id: id, cocId: cocId}, 
			success: function(json){
				var data = JSON.parse(json)
				$('.comment_num').html(data['num']);
				$('.js_hits').html(data['hits']);
				$('.favorite_count').html(data['favorite']);
				if(data['favo'])
				{
					$('.fa-heart-o').removeClass('fa-heart-o').addClass('fa-heart')
								.next('span').html('已喜欢')
							.parent('a').addClass('actived').attr('js_data', 1);
				}
				if(data['coll'])
				{
					$('.fa-star-o').removeClass('fa-star-o').addClass('fa-star')
							.next('span').html('已收藏')
						.parent('a').addClass('actived').attr('js_data', 1);
				}
				$('.random-screenplay').attr('href', data['url']);
			} 
		});
		
		var conHeight = $('.js_loadmore>.js_loadmord_1').height();
		var height = $('.js_loadmore').height();
		var tem = Number(conHeight) - Number(height);
		if(tem > 0)
		{
			$('.js_loadmore').after('<div id="wyjb_contentmore" class='+height+' js_data='+tem+'><a href="javascript:;" class="btn-loading" onclick="loadmore()">加载更多&gt;&gt;</a></div>');
		}

		/*var tem = $('.js_loadmore').attr('js_total');
		if(tem > 1)
		{
			$('.js_loadmore').after('<div id="wyjb_contentmore"><a href="javascript:;" class="btn-loading" onclick="loadmore()">加载更多 [<span>2</span>/'+tem+']</a></div>');
		}*/
		
		//禁右
		$('.content').bind("contextmenu",function(){return false;}).bind("selectstart",function(){return false;}).keydown(function(){return key(arguments[0])});
})
function loadmore()
{
	var height = $('.js_loadmore').height();
	var hei = $('#wyjb_contentmore').attr('class');
	var h = Number(height) + Number(hei);
	$('.js_loadmore').css('max-height', h);
	var data = $('#wyjb_contentmore').attr('js_data');
	var t = Number(data) - Number(hei);
	if(t > 0)
	{
		var data = $('#wyjb_contentmore').attr('js_data', t);
	}
	else
	{
		$('#wyjb_contentmore').remove();
	}
}


//剧本正文加载更多
/*function loadmore()
{
	var _p = Number($('.js_loadmore').attr('js_page')) + 1
		,_t = $('.js_loadmore').attr('js_total')
		,_id = $('.js_loadmore').attr('js_data');
	if(_p >= _t)
	{
		$('#wyjb_contentmore').remove();
	}
	$.ajax({   
			url : '/d/screenplay/loadmore',
			type: 'post',
			data: {id: _id, pager: _p}, 
			success: function(data){
				$('.js_loadmore').attr('js_page', Number(_p))
				$('span', '#wyjb_contentmore').html(Number(_p)+1)
				$('.js_loadmore').append(data);
			} 
		});
}*/

//收藏 & 喜欢
function collect(obj, id, action)
{
	var mr_id = $(obj).attr('js_data');
	$.ajax({   
			url : '/d/screenplay/collect',
			type: 'post',
			data: {id: id, mr_id: mr_id, action : action},    
			success: function(data){
				if(isNaN(data))
				{
					if(data == 'login')
					{
						$('#popup_login').trigger('click');
						$('.form-usr').find('input[name=jumpto]').val(window.location.href);
					}
					else
					{
						alert(data);
					}
					return;
				}
				if(action == 'collect')
				{
					if(data == 1)
					{
						$('.fa-star-o').removeClass('fa-star-o').addClass('fa-star')
								.next('span').html('已收藏')
							.parent('a').attr('js_data', data).addClass('actived');
					}
					else
					{
						$('.fa-star').removeClass('fa-star').addClass('fa-star-o')
								.next('span').html('收藏')
							.parent('a').attr('js_data', data).removeClass('actived');
					}
				}
				else
				{
					var num = $('.favorite_count').html();
					if(data == 1)
					{
						$('.fa-heart-o').removeClass('fa-heart-o').addClass('fa-heart')
									.next('span').html('已喜欢')
								.parent('a').attr('js_data', data).addClass('actived');
						$('.favorite_count').html(Number(num) + 1);
					}
					else
					{
						$('.fa-heart').removeClass('fa-heart').addClass('fa-heart-o')
								.next('span').html('喜欢')
							.parent('a').attr('js_data', data).removeClass('actived');
						$('.favorite_count').html(Number(num) - 1);
					}
				}
			}
		});
}