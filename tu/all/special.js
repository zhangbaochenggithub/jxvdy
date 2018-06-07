//喜欢
function like(url, id, action, obj)
{
	ajaxPost(url,{'id': id, 'action': action},null,function(d){
		if(d.state == 0)
		{
			if(d.i == 0)
			{
				var html = $(obj).html().replace('已喜欢', '喜欢');
				$(obj).html(html);
				var num = $('.topic_center_top_text_end_rightr').text();
				$('.topic_center_top_text_end_rightr').text(Number(num) - 1);
			}
			else
			{
				var html = $(obj).html().replace('喜欢', '已喜欢');
				$(obj).html(html);
				var num = $('.topic_center_top_text_end_rightr').text();
				$('.topic_center_top_text_end_rightr').text(Number(num) + 1);
			}
		}
		else if(d.callback == 'login')
		{
			popWin('login');
			var url = window.location.href;
			$('input[name=jumpto]').val(url);
		}
		else
		{
			alert(d.msg);
			location.reload();
		}
	});
}