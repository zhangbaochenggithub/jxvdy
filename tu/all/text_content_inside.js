$(function(){
	//图片居中,取消p的text-indent
	$('.articl-content>p>img').each(function(){$(this).parent('p').css('text-indent',0)});
	
	var id = $('.fa-comments-o').attr('js_data');
	var cocId = $('.fa-comments-o').attr('js_coc_id');
	$.ajax({   
			url : '/d/news/inside',
			type: 'post',
			data: {id: id, cocId: cocId}, 
			success: function(json){
				var data = JSON.parse(json)
				$('.fa-comments-o').next('a').find('span').html(data['num']);
				$('.fa-eye').next('span').html(data['hits']);
				$('.favorite_count').html(data['favorite']);
				if(data['favo'])
				{
					$('.fa-heart-o').removeClass('fa-heart-o').addClass('fa-heart')
							.next('span').html('已喜欢')
							.parent('a').addClass('actived').attr('js_data', 1);
				}
				if(data['coll'])
				{
					$('.fa-star-o').addClass('fa-star').removeClass('fa-star-o')
							.next('span').html('已收藏')
							.parent('a').addClass('actived').attr('js_data', 1);
				}
			} 
		});
		
		var tem = $('.js_loadmore').attr('js_total');
		if(tem > 1)
		{
			$('.js_loadmore').after('<div id="wyjb_contentmore"><a href="javascript:;" class="btn-loading" onclick="loadmore()">加载更多 [<span>2</span>/'+tem+']</a></div>');
		}
})

//正文加载更多
function loadmore()
{
	var _p = Number($('.js_loadmore').attr('js_page')) + 1
		,_t = $('.js_loadmore').attr('js_total')
		,_id = $('.js_loadmore').attr('js_data');
	if(_p >= _t)
	{
		$('#wyjb_contentmore').remove();
	}
	$.ajax({   
			url : '/d/text_content/loadmore',
			type: 'post',
			data: {id: _id, pager: _p}, 
			success: function(data){
				$('.js_loadmore').attr('js_page', Number(_p))
				$('span', '#wyjb_contentmore').html(Number(_p)+1)
				$('.js_loadmore').append(data);
			} 
		});
}

//收藏 & 喜欢
function collect(obj, id, action)
{
	var mr_id = $(obj).attr('js_data');
	$.ajax({   
			url : '/d/news/collect',
			type: 'post',
			data: {id: id, mr_id: mr_id, action : action},    
			success: function(data){
				if(!isNaN(data))
				{
					if(action == 'collect')
					{
						if(data == 1)
						{
							$('.fa-star-o').addClass('fa-star').removeClass('fa-star-o')
									.next('span').html('已收藏')
									.parent('a').attr('js_data', data).addClass('actived');
						}
						else
						{
							$('.fa-star').addClass('fa-star-o').removeClass('fa-star')
									.next('span').html('收藏')
									.parent('a').attr('js_data', data).removeClass('actived');
						}
					}
					else
					{
						var num = $('.favorite_count').html();
						if(data == 1)
						{
							$('.fa-heart-o').addClass('fa-heart').removeClass('fa-heart-o')
									.next('span').html('已喜欢')
									.parent('a').attr('js_data', data).addClass('actived');
							$('.favorite_count').html(Number(num) + 1);
						}
						else
						{
							$('.fa-heart').addClass('fa-heart-o').removeClass('fa-heart')
									.next('span').html('喜欢')
									.parent('a').attr('js_data', data).removeClass('actived');
							$('.favorite_count').html(Number(num) - 1);
						}
					}
				}
				else
				{
					if(data == 'login')
					{
						$("#popup_login").trigger('click');
						$('.form-usr').find("input[name=jumpto]").val(window.location.href);
					}
					else
					{
						alert(data);
					}
				}
			}
		});
}