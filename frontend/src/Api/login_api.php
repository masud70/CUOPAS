<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Method: POST');
header('Access-Control-Allow-Header: Content-Type,Access-Control-Allow-Origin,Access-Control-Allow-Header,Access-Control-Allow-Method, Authorization, X-Requested-With');

include 'config.php';
include 'validator.php';

$data = json_decode(file_get_contents("php://input"),true);
$user = $data['userId'];
$password = $data['password'];

$user = Input::int($user);
$password = Input::str($password);
if($password){
    $password = Input::size($password,5,15);
}

if($password != false || $user != false){

    //Search for user (if student) validity
    $studentQuery = "SELECT * FROM student WHERE student_id = '$user' AND password = '$password'";
    $studentQueryResult = $con->query($studentQuery);

    if($studentQueryResult->num_rows == 1){
		
        $data = $studentQueryResult->fetch_assoc();
        // $output = mysqli_fetch_all($data, MYSQLI_ASSOC);
        echo json_encode(array("status" => "success", "type" => "student", "data" => $data));
		
    }else{
		
		//Search for user (if teacher) validity
		$teacherQuery = "SELECT * FROM teacher WHERE teacher_id = '$user' AND password = '$password'";
		$teacherQueryResult = $con->query($teacherQuery);
		
		if($teacherQueryResult->num_rows == 1){
			$data = $teacherQueryResult->fetch_assoc();
			echo json_encode(array("status" => "success", "type" => "teacher", "data" => $data));
			
		}else{
			
        echo json_encode(array("status" => "failed", "message" => "Something went wrong."));
		
		}
    }
}else{
    echo json_encode(array("status" => "failed", "message" => "Something went wrong."));
}



?>