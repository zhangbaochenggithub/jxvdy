//分享
function share(url, id)
{
	$("#popup_dynamic").trigger('click');
	$('.pop_share_submit').click(function(){
		var val = $("textarea[name='share_comment']").val();
		$.ajax({
			url : url,
			type: 'post',
			data: {'id': id, 'mt_content': val}, 
			success:function(d){
				if(d == 'login')
				{
					$(".js_popup_closed").trigger('click');
					$("#popup_login").trigger('click');
					var url = window.location.href;
					$('input[name=jumpto]').val(url);
				}
				else if(d == 1)
				{
					location.reload();
				}
				else
				{
					alert(d)
				} 
			}
		})
	})
}