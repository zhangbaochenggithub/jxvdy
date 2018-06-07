<?php
header("Content-Type:application/json;charset=utf-8");
require("init.php");
$sql="SELECT fid,channel,col,ktype,district,fyear,fname,intro1,intro2,score,pic FROM flimPage";
@$kw=$_REQUEST["kw"];
@$col=$_REQUEST["col"];
@$ktype=$_REQUEST["ktype"];
@$district=$_REQUEST["district"];
@$fyear=$_REQUEST["fyear"];
@$score=$_REQUEST["score"];
if(!$kw){$kw="";}
if(!$col){$col="";}
if(!$ktype){$ktype="";}
if(!$district){$district="";}
if(!$fyear){$fyear="";}
if(!$score){$score="";}
if($kw!=null){
	$kws=explode(" ",$kw);
	for($i=0;$i<count($kws);$i++){
		$kws[$i]=" fname like '%$kws[$i]%' ";
	}
	$where=implode(" and ",$kws);
	$sql.=" where $where ";
}
if($ktype!=null){
$sql.="  WHERE  ktype = '$ktype' ";
}
if($score!=null){
	$sql.=" ORDER BY score DESC";
}
if($district!=null){
$sql.="  WHERE  district = '$district' ";
}
if($fyear!=null){
$sql.="  WHERE  fyear = '$fyear' ";
}
if($col!=null){
$sql.="  WHERE  col = '$col' ";
}
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,1);
@$pno=$_REQUEST["pno"];
if($pno==null) $pno=1;
$psize=36;
$count=count($rows);
$sql.=" limit ".(($pno-1)*$psize).", $psize";
$result=mysqli_query($conn,$sql);
$rows=mysqli_fetch_all($result,1);
$output=[
	"pno"=>$pno,
	"psize"=>$psize,
	"count"=>$count,
	"pcount"=>ceil($count/$psize),
	"data"=>$rows
];
echo json_encode($output);




