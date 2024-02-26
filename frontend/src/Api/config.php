<?php
session_start();
$host='localhost';
$user='root';
$pass='';
$db='csecu';
$con = new mysqli($host,$user,$pass,$db);
if($con->connect_error){
	die($con->connect_error);
}
?>