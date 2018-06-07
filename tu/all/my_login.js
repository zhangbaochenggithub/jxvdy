var validRules = [
					['name', function(o, v){return (this.v=(''!=v)) || '用户名不能为空';}],
					['pwd', function(o, v){return (this.v=(''!=v)) || '密码不能为空';}],
					['pwd', function(o, v){return (this.v=(6<=v.length)) || '密码至少6位';}]
				];