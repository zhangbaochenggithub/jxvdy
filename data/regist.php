<?php
	$uname=$_REQUEST["uname"];
	$upwd=$_REQUEST["upwd"];
	$email=$_REQUEST["email"];
	require('init.php');
	$sql="INSERT INTO v_regist VALUES (NULL,'$uname','$upwd','$email')";
	$result=mysqli_query($conn,$sql);
	echo $result ? "新用户注册成功。":"新用户注册失败。";
	


?>
<html>
	<body>
	<?php
		if(isset($result)){
	?>
		<p><a href="../web/index.html">返回首页</a></p>
		<?php }?>

	</body>

</html>