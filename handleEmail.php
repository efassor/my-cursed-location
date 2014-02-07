#!/usr/bin/php -q
<?php
$email = "";
$emailUpdatesAllowedFrom = 'foo@bar.com';
$fd = fopen("php://stdin", "r");
while (!feof($fd)) {

    $email .= fread($fd, 1024);

}
fclose($fd);
require("phpLib/PlancakeEmailParser.php");
$error = false;
$emailParser = new PlancakeEmailParser($email);

$emailFrom = $emailParser->getHeader('From');
if (strpos($emailFrom, $emailUpdatesAllowedFrom) == false){
	$error = "Invalid Email";
}
if (!$error){
	$emailSubject = $emailParser->getSubject();
	if (strlen($emailSubject) < 3){
		$error = "Missing or too short message";
	}
}
if (!$error){
	$url = 'http://wherethefuckisdiane.com/api/';
	$fields = array(
						'Body' => urlencode($emailSubject)
					);
	
	//url-ify the data for the POST
	$fields_string = '';
	foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
	rtrim($fields_string, '&');
	
	//open connection
	$ch = curl_init();
	
	//set the url, number of POST vars, POST data
	curl_setopt($ch,CURLOPT_URL, $url);
	curl_setopt($ch,CURLOPT_POST, count($fields));
	curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
	
	//execute post
	$result = curl_exec($ch);
	//close connection
	curl_close($ch);
	if (!$result){
		$error = "Error saving location";
	}
	
}
if ($error){
	mail($emailUpdatesAllowedFrom, 'Location was not fucking updated!', $error);
}
else {
	mail($emailUpdatesAllowedFrom, 'Location fucking updated!', '');
}
?>