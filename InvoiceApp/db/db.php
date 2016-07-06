<?php 
$con = mysql_connect('127.0.0.1','root','password') or die('can not connect to server');
if($con)
{
	mysql_select_db('STEEL',$con) or die('can not select database');
}
?>