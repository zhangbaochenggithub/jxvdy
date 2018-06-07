<?php
  //创建到服务器的连接
    $conn=mysqli_connect("127.0.0.1","root","","v_flim",3306);
    $sql="SET NAMES UTF8";
	mysqli_query($conn,$sql);

?>