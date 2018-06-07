<?php
header("Content-Type:application/json");
require("init.php");
$sql="SELECT cid,img,title,href FROM index_carousel";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));