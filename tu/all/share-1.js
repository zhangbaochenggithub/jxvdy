//分享
function share(url, id)
{
	popWin('pop_share');
	$('.pop_share_submit').click(function(){
		var val = $("textarea[name='share_comment']").val();
		ajaxPost(url,{'id': id, 'mt_content': val},null,function(d){
			if(d.callback == 'login')
			{
				popWin('login');
				var url = window.location.href;
				$('input[name=jumpto]').val(url);
			}
			else if(d.state == 0)
			{
				location.reload();
			}
			else
			{
				alert(d.msg);
			}
		});
	})
}