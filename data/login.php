<?php
header("Content-Type:application/json;charset=utf-8");
require('init.php');
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"];
$sql="SELECT * FROM v_regist WHERE uname='$uname' AND binary upwd='$upwd'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
if($row!=null){
	$uid=$row[0];
	session_start();
	$_SESSION["uid"]=$uid;
	echo json_encode(["ok"=>1,'msg'=>"登录成功！"]);
}else{
	echo json_encode(["ok"=>0,'msg'=>"账号或密码不正确,请重新输入!"]);
}

?>

