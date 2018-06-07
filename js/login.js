$(()=>{
	$("#btn").click(()=>{
		$.post(
			"../data/login.php"	,
			$("#login").serialize()
		).then(data=>{
				if(data.ok==1){
				alert(data.msg);
				location=document.referrer;
				}else
				alert(data.msg);
		})
	})
})