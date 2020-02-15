<?php
$data = json_decode(file_get_contents("php://input"));
$id = $data->id;
  include "httpful.phar";
  $url = "https://dummy-api.cm.edu/employees/";
  $rs = \Httpful\Request::delete($url. urlencode($id))->authenticateWith('user4' , 'n7phBw3bJR5EfTMjM0kW')
  ->send();

  echo $rs;
 ?>
