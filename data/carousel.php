<?php
header("Content-Type:application/json");
require("init.php");
$sql="SELECT uid,img FROM carousel";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));