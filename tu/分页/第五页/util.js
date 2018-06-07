$(function(){
	//表单绑定提交事件
	$('.js_form').bind('submit', doSubmit);
	$('.js_check_available').bind('change', checkAvailable).data('available', true);
	
	//日期选择器
	if (typeof($.cxCalendar) != 'undefined')
	{
		$('.input_cxcalendar').each(function(){
			$(this).cxCalendar({data:new Date()});
		});
	}
})
var jxvUI = {
				'alert':function(d){alert(d);},
			};
/**
* Ajax 提交表单
* 
* @param jqf
*/
var ajaxSubmitForming = false;
function ajaxSubmitForm(jqf, data)
{
	if (ajaxSubmitForming)
	{
		return;
	}
	
	ajaxSubmitForming = true;
	
	$.ajax({
		url:jqf.attr('action')
		,type:jqf.attr('method')
		,cache:false
		,data:(typeof(data) == 'undefined')? jqf.serializeArray() : data
		,dataType:'json'
		,success:function(d){
			if (typeof(d.callback) != 'undefined')
			{
				jqf.triggerHandler('submitCallback', d.callback);
			}
			else
			{
				(typeof(d.n)!='undefined') ? tips(d.n, d.msg) : jxvUI.alert(d.msg);
				if(d.tip)
				{
					$('.js_popup_closed').trigger('click');
					$('#js_login_user_info').surReady(function(){
						$.ajax({
							url : '/d/member/mess'
							,type : 'post'
							,success: function(d){
								var data = JSON.parse(d);
								if(typeof(data['m_nick']) == 'string')
								{
									$('.js_login_user_info').removeClass('login-before').addClass('login-after')
									$('.js_login_link').hide();
									$('.js_user_login_btn').hide();
									$('.js_user_name_wrap').show().find('img').attr('src', data['i_path']).attr('alt', data['m_nick']);
									$('.js_user_name_wrap .js_user_nick').html(data['m_nick']);
									$('.js_user_icon').show().find('img').attr('src', data['i_path']).attr('alt', data['m_nick']);
									$('.js_user_icon div a').html(data['m_nick']);
									$('.js_user_icon ul').children('li').first().find('a').html(data['attention']);
									$('.js_user_icon ul').children('li').last().find('a').html(data['fans']);
									$('.js_user_footer').show();
								}
								if(typeof(data['notice']) == 'string' && data['notice'] != 0)
								{
									$('.js_mess_total').show();
								}
							}
						})
					})
					return;
				}
				if (typeof(d.url) !='undefined')
				{
					location.href = d.url;	
					return;
				}
				if (typeof(d.closeThis) != 'undefined' && d.closeThis)
				{
					if (typeof(closeTab) == 'function')
					{
						closeTab();	
					}
					else
					{
						window.close();
					}
				}
				if (typeof(d.reload) != 'undefined' && d.reload)
				{
					location.reload();
				}	
			}
			ajaxSubmitForming = false;
		}
		,error:function(e){
			ajaxSubmitForming = false;
		}
	});
}

/**
* Ajax Post 请求控制变量
* 
* @type Boolean
*/
var ajaxPosting = false;
/**
* Ajax Post 请求
* * 
* @param string url
* @param args postData
* @param bool async
* @param function callback
*/
function ajaxPost(url, postData, async, callback)
{
	if (ajaxPosting)
	{
		return;
	}
	ajaxPosting = true;
	$.ajax({
		url:url
		,type:'POST'
		,cache:false
		,data:postData
		,dataType:'json'
		,async:(typeof(async) == 'undefined') ? true : async
		,success:function(d){
			if (typeof(callback) == 'function')
			{
				callback(d);
			}
			else
			{
				jxvUI.alert(d.msg);
				if (typeof(d.reload) != 'undefined' && d.reload)
				{
					location.reload();
				}	
			}
			ajaxPosting = false;
		}
		,error:function(e){
			jxvUI.alert(e.msg);
			ajaxPosting = false;
		}
	});
}

/**
* 表单智能提示
* 
* @param name
* @param value
*/
function tips(name, value)
{
	name = name.replace(/([a-z_\d]+)\[\]/ig, "$1");
	var _tip = $('#js_'+name+'_tip');
	value = (typeof(value) == 'string') ? value : '';
	if (_tip.size() == 1)
	{
		_tip.text(value);
		$('form').each(function(){
			var html = $(this).html();
			var preg = /js_[a-z]+_tip/gi;
			var str = html.match(preg);
			if(str != null)
			{
				for(i = 0; i < str.length; i++)
				{
					$("#"+str[i]).removeClass('user-tip-error');
					$("#"+str[i]).parent('.user-group').removeClass('has-error');
				}
			}
			
		})
		if(value.length > 0)
		{
			_tip.addClass('user-tip-error');
			_tip.parent('.user-group').addClass('has-error');
			_tip.prev().focus();
		}
	}
	else if ('' != value)
	{
		jxvUI.alert(value);
	}
}

/**
* 转换序列化的表单数据为对象
* 
* @param arr
* 
* @returns {Object}
*/
function flatSerializeArray(arr)
{
	var _o = {};
	$.each(arr, function(k, v){
		_o[v.name] = v.value;
	});
	return _o;
}

/**
* 验证表单
* 
* @param jqForm
* @param [rules]
* @uses ajaxSubmitForm(jqForm), flatSerializeArray(arr)
*/
function validForm(jqf, rules)
{
	var	_rules = {};
	$.extend(_rules, eval('('+jqf.attr('js_validrules')+')'), rules || {});
	if ($.isEmptyObject(_rules))
	{
		return true;
	}
	var _data = jqf.serializeArray()
	,	_fd = flatSerializeArray(_data)
	,	_flag = {v:false};
	$.each(_rules, function(i, r){
		if (typeof(r[1]) == 'function')
		{
			tips(r[0], r[1].call(_flag, _fd, _fd[r[0]]));
		}
		return _flag.v;
	});
	return _flag.v;
}

var delaySubmit = checkAvailableing = false;
/**
* 远程查询可用性
* 
*/
function checkAvailable()
{
	checkAvailableing = true;
	var $this = $(this).data('available', false)
	,	_v = $this.val()
	,	_n = $this.attr('name')
	if ('' == _v)
	{
		return;
	}
	ajaxPost(CHECK_FIELD_URL, {n:_n,v:_v}, true, function(d){
			$this.data('available', (0 == d.state));
			tips(_n, d.msg);
			checkAvailableing = false;
			if ((0 == d.state) && typeof(delaySubmit) == 'object' && delaySubmit.is('form'))
			{
				delaySubmit.triggerHandler('submit');
			}
			delaySubmit = false;
	});
}

/**
* 检查表单提交就绪
* 
* @param jqf :jquery form
* 
* @returns {Boolean}
*/
function SubmitReady(jqf)
{
	var _ready = false
	,	_items = jqf.find('.js_check_available');
	if (0 == _items.size())
	{
		return true;
	}
	_items.each(function(){

		return _ready = $(this).data('available');
	});
	return _ready;
}

function doSubmit()
{
	$this = $(this);
	if (checkAvailableing)
	{
		delaySubmit = $this;
		return;
	}
	SubmitReady($this) && validForm($this) && ajaxSubmitForm($this);
}

/**
* 设置剪切板内容
* 
* @param data
*/
function setClipboard(data)
{
	if (window.clipboardData != undefined)
	{
		if (window.clipboardData.setData('Text', data))
		{
			alert('已复制到剪切板');
			return;
		}
	}
	prompt('请按 CTRL+C 复制', data);
}

/**
* 等比缩放图片
* 
* @param mW
* @param mH
* @param img
*/
function AutoResizeImage(mW,mH,img)
{ 
	var _i = new Image(),_w,_h;
	_i.src=img.src;
	_w = _i.width;
	_h = _i.height;
	if (0==_w || 0==_h)return;
	((_w/_h>= mW/mH)&&(_w>mW)&&(_h=_h*mW/_w)&&(_w=mW))||((_h>mH)&&(_w=_w*mH/_h)&&(_h=mH));
	(img.style.width=_w+'px')&&(img.style.height=_h+'px');
	if(_h < mH)
	{
		var _mt= (mH - _h)/2;
		img.style.marginTop=_mt+'px';
	}
}