<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://www.rtcdssbsl.com');
header('Access-Control-Allow-Method: POST');
header('Access-Control-Allow-Header: Content-Type,Access-Control-Allow-Origin,Access-Control-Allow-Header,Access-Control-Allow-Method, Authorization, X-Requested-With');
include '../inc/config.php';
include '../inc/validator.php';

$user = $_POST['user'];
$password = $_POST['password'];
$user = Input::isPhone($user);
$password = Input::str($password);

if($password != false || $user != false){
    $q1 = "SELECT * FROM employee WHERE username = '$user' AND password = '$password'";

    $r = $con->query($q1);

    if($r->num_rows > 0){
        $data = $r->fetch_assoc();
        $_SESSION['roll'] = $data['roll'];
        $_SESSION['id'] = $data['id'];
        $_SESSION['year'] = 2021;
        $_SESSION['name'] = $data['name_en'];
        $_SESSION['image'] = $data['image'];
        $_SESSION['isLoggedIn'] = true;

        echo json_encode(array("message" => "You have successfully logged in.", "status" => "success"));
    }else{
        echo json_encode(array("message" => "Sorry! Your username or password is not correct.", "status" => "failed"));
    }
}else{
    echo json_encode(array("message" => "Sorry! Your username or password is not correct.", "status" => "failed"));
}



?>