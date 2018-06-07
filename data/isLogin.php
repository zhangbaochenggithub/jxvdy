<?php
header("Content-Type:application/json;charset=utf-8");
require("init.php");
session_start();
@$uid=$_SESSION["uid"];
if($uid!=null){
	$sql="SELECT uname FROM v_regist WHERE vid=$uid";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	$uname=$row[0];
	echo json_encode(["ok"=>1,"msg"=>$uname]);
}else{
	echo json_encode(["ok"=>0]);
}