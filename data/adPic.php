<?php
header("Content-Type:application/json;charset-utf-8");
require("init.php");
$sql="SELECT bg,md,sm FROM v_pic ";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,1);
echo json_encode($rows);