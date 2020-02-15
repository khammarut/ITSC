<?php
  $data = json_decode(file_get_contents("php://input"));
  $firstname = $data->fname;
  $lastname = $data->lname;
  $birthday = $data->birthday;
  $email = $data->email;
  include "httpful.phar";
  $response = Httpful\Request::post('https://dummy-api.cm.edu/employees')->sendsJson()->body(
    '{
    "firstname" : "'.$firstname.'",
    "lastname" : "'.$lastname.'",
    "birthday" : "'.$birthday.'",
    "email" : "'.$email.'"
    }'
  )
  ->authenticateWith('user4' , 'n7phBw3bJR5EfTMjM0kW')
  ->send();
 ?>
