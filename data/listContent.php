<?php
header("Content-Type:application/json;charset=utf-8");
require("init.php");
@$fid=$_REQUEST["fid"];
$sql="select channel,col,ktype,district,fyear,fname,intro1,intro2,score,pic FROM flimPage WHERE fid=$fid";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,1);
echo json_encode($rows);