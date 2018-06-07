$(function(){
	var id = $('.js_comment_num').attr('js_data');
	var cocId = $('.js_comment_num').attr('js_coc_id');
	$.ajax({   
			url : '/d/screenplay_collection/inside',
			type: 'post',
			data: {id: id, cocId: cocId}, 
			success: function(json){
				var data = JSON.parse(json)
				$('.js_comment_num').html(data['num']);
				$('.js_hits_num').html(data['hits']);
			} 
		});
})

//结束征集
function over_coll(id)
{
	$("#popup_over").trigger('click');
	$('.over_collection').click(function(){
		$.ajax({   
			url : '/d/screenplay_collection/over',
			type: 'post',
			data: {id: id},
			success: function(data){
				if(data == 'login')
				{
					$('.js_popup_closed').trigger('click');
					$("#popup_login").trigger('click');
					$('.form-usr').find("input[name=jumpto]").val(window.location.href);
				}
				else if(data == 'ok')
				{
					$('.ctn-status').addClass('actived');
					$('.ctn-status').html('已结束');
					$('.btn-contact').addClass('actived').removeAttr('onclick');
					$('.btn-contact').html('投稿结束');
					$('.js_popup_closed').trigger('click');
				}
				else
				{
					alert(data);
					$('.js_popup_closed').trigger('click');
				}
			}
		});
	})
}

//参加投稿的剧本翻页
function reloadPager(obj)
{
	var _h = $(obj)
	,	_p = _h.closest('.js_jxvdy_joincollection')
	,	_f = _h.closest('.js_jxvdy_pager')
	,	_ch = _f.attr('js_ch_id')
	,	_act = _f.attr('js_action')
	,	_m = _f.attr('js_model')
	,	_t = _f.attr('js_temp')
	,	_pn = _h.attr('js_data');
	$.ajax({   
		url : '/d/'+_m+'/pb?a='+_act+'&pn='+_pn
		,type:'post'
		,data:{t:_t,c:_ch}
		,success: function(data){
			_p.html(data);
			lazyLoad();
		}
	});
}

//取消投稿
function cancel(url, id)
{
	popWin('canel');
	var aA=$("#canel .pop_comment_text_lii").children("a");
	aA[0].onclick=function()
	{
		ajaxPost(url,{'id': id},null,function(d){
			if(d.state == 0)
			{
				location.reload();
			}
			else
			{
				alert(d.msg);
			}
		});
		CloseWebPage();
	}
}

//中标 & 淘汰
function audit(url, id, opera)
{
	ajaxPost(url,{'id': id, 'opera': opera},null,function(d){
		if(d.state == 0)
		{
			location.reload();
		}
		else
		{
			alert(d.msg);
		}
	});
		
}

//投稿
function tougao(i)
{
	$.ajax({   
			url : '/d/screenplay/pb?a=getMyScreenplay'
			,type:'post'
			,data:{t:'1015',c:i}
			,success: function(data){
				$("#js_tougao_jxvdy").html(data);
			}
		});
	$("#popup_tougao").trigger('click');
}

//选择要投稿的剧本
function select(obj, id)
{
	if($(obj).attr('class') == 'selected')
	{
		$(obj).find('input:hidden').remove();
		$(obj).attr('class', '');
		$(obj).find('.item-type').find('.icon-sel').remove();
	}
	else
	{
		$(obj).append("<input type='hidden' name='id[]' value='"+id+"'>");
		$(obj).attr('class', 'selected');
		$(obj).find('.item-type').append('<span class="icon-sel"></span>');
	}
}