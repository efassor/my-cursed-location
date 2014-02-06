<?php

$f3=require('f3/base.php');

$f3->set('DEBUG',3);
$f3->set('AUTOLOAD','modules/');
$f3->config('config.ini');
$f3->config('routes.ini');


$f3->run();
?>