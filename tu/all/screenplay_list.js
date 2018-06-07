//加载动态数据----点击量/喜欢数
$(function(){
	var ids = [];
	$('.excerpt').each(function(i){
		ids[i] = $(this).attr('js_data');
	})
	$.ajax({   
			url : '/d/screenplay/list',
			type: 'post',
			data: {ids: ids},
			success: function(data){
				$.each(JSON.parse(data),function(key, value)
				{
					$('.content_'+key).find('.fa-eye').next('span').html(value['hits']);
					$('.content_'+key).find('.fa-heart-o').next('span').html(value['favorite']);
				})
			} 
		});
})