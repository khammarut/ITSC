<?php
  include "httpful.phar";
  $url = "https://dummy-api.cm.edu/employees";
  $rs = \Httpful\Request::get($url)->authenticateWith('user4' , 'n7phBw3bJR5EfTMjM0kW')->sendsJson()
  // ->body('{
  //   "firstname" : "Khammarut",
  //   "lastname" : "Fakkhiew",
  //   "birthday" : "1994-07-24",
  //   "email" : "khammarut10@Outlook.com"
  // }')
  ->send();

  echo '{"rs" : '.$rs.'}';
 ?>
