var validRules = [
					['name', function(o, v){return (this.v=(''!=v)) || '用户名不能为空';}],
					['pwd', function(o, v){return (this.v=(''!=v)) || '密码不能为空';}],
					['pwd', function(o, v){return (this.v=(6<=v.length)) || '密码至少6位';}],
					['email', function(o, v){return (this.v=(''!=v)) ||'请输入邮箱'}],
					['email', function(o, v){return (this.v=!!v.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) ||'邮箱格式不正确'}]
				];