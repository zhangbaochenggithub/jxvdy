//加载动态数据----是否已收藏/评论数量/点击量/喜欢数
$(function(){
	var ids = [];
	var chIds = [];
	$('.excerpt').each(function(i){
		ids[i] = $(this).attr('js_data');
		chIds[i] = $(this).attr('js_ch_id');
	})
	$.ajax({   
			url : '/d/news/list',
			type: 'post',
			data: {ids: ids, chIds: chIds},
			success: function(data){
				$.each(JSON.parse(data),function(key, value)
				{
					$('.content_'+key).find('.fa-eye').next('span').html(value['hits']);
					$('.content_'+key).find('.fa-heart-o').next('span').html(value['favorite']);
					$('.content_'+key).find('.fa-star-o').parent('a').attr('js_data', value['collect']);
					/*$('.content_'+key).find('.fa-comments-o').next('a').find('span').html(value['num']);*/
					if(value['collect'])
					{
						$('.content_'+key).find('.fa-star-o').parent('a').find('span').html('已收藏');
						$('.content_'+key).find('.fa-star-o').removeClass('fa-star-o').addClass('fa-star');
					}
				})
			} 
		});
})

//收藏
function collect(obj, id)
{
	var mr_id = $(obj).attr('js_data');
	$.ajax({
			url : '/d/news/collect',
			type: 'post',
			data: {id: id, mr_id: mr_id, action : 'collect'},    
			success: function(data){
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