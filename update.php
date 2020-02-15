<?php
$data = json_decode(file_get_contents("php://input"));
$id = $data->id;
$firstname = $data->fname;
$lastname = $data->lname;
$birthday = $data->birthday;
$email = $data->email;
  include "httpful.phar";
  $url = "https://dummy-api.cm.edu/employees/";
  $rs = \Httpful\Request::put($url. urlencode($id))->authenticateWith('user4' , 'n7phBw3bJR5EfTMjM0kW')->sendsJson()
  ->body('{
    "firstname" : "'.$firstname.'",
    "lastname" : "'.$lastname.'",
    "birthday" : "'.$birthday.'",
    "email" : "'.$email.'"
  }')
  ->send();

  echo $rs;
 ?>
