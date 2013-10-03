<?php
//Receive variables from JavaScript
$time = $_POST["time"];
$subject = $_POST["subject"];
$trial = $_POST["trial"];
$probe = $_POST["trial"];
$code = $_POST["code"];
$response = $_POST["response"];
$rt = $_POST["rt"];

//Connect to database
$host = "localhost";
$database = "your_database_name";
$username = "your_username";
$password = "YOUR_PASSWORD";
    
$con = mysql_connect($host, $username, $password);
mysql_select_db($database, $con) or die( "Unable to select database");

//Insert variables into database
mysql_query("INSERT INTO table_name (time, subject, trial, probe, code, response, rt) 
VALUES ('$time', $subject', '$trial', '$code', '$probe','$response', '$rt');");

//Disconnect
mysql_close($con);

?>

