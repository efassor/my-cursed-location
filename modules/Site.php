<?php
class Site{
	public function __construct(){
		$this->f3 = Base::instance();
		$this->db = new DB\SQL($this->f3->get('dbVars.path'), $this->f3->get('dbVars.username'), $this->f3->get('dbVars.password'));
		$this->currentLocation = array();
		$this->isLoggedIn = $this->f3->exists('SESSION.user');
	}
	
	
	public function showIndex(){
		$this->loadCurrentLocation(); 
		$this->f3->set('content', 'location.htm');
		$this->f3->set('location', $this->currentLocation['city']);
		echo Template::instance()->render('layout.htm');
	}
	
	public function doLogIn(){
		$error = false;
		if (isset($_POST['username']) && isset($_POST['password'])){
			$pwHash = $this->hashPw($_POST['password']);
		}
		else {
			$error = 'You fucking need both a username and password.';
		}
		if (!$error){
			$user=new DB\SQL\Mapper($this->db,'users');
			$user->load(array('username=?', $_POST['username']));
			if (!$user->dry() && $user->password == $pwHash){
				$this->f3->push('SESSION.user', $user->cast());
			}
			else {
				$error = 'Bad fucking login, goddammit';
			}
		}
		if ($error){
			$this->f3->push('SESSION.error', $error);
		}

	}
	
	
	public function handleTwilioRequest(){
		$error = false;
		$airport = new DB\SQL\Mapper($this->db,'airports');
		$locationDetail = new DB\SQL\Mapper($this->db,'locationdetails');
		$locationVisit = new DB\SQL\Mapper($this->db,'locationvisits');

		if (!isset($_POST['Body']) || strlen($_POST['Body']) < 3){
			$error = "Missing or too short message";
		}
		if (!$error){
			$threeLetterCode = substr($_POST['Body'], 0, 3);
			if (strlen($_POST['Body']) > 4){
				$subLocation = substr($_POST['Body'], 4);
				$subLocationIsSubCode = false;
			}
			else {
				$subLocation = false;
			}
			$airport->load(array('threeLetterCode=?', $threeLetterCode));
			if ($airport->dry()){
				$error = "Can't find airport \"$threeLetterCode\"" ;
			}
		}
		if (!$error){
			if ($subLocation){
				$locationDetail->load(array('threeLetterCode=? AND subCode=?', $threeLetterCode, $subLocation));
			}
			if (!$subLocation || $locationDetail->dry()){
				$locationDetail->load(array('threeLetterCode=?', $threeLetterCode));
			}
			else {
				$subLocationIsSubCode = true;
			}
			if ($locationDetail->dry()){
				$locationDetail->threeLetterCode = $threeLetterCode;
				$locationDetail->phoneNumberId = $this->f3->get('appVars.defaultPhoneNumberId');
				$locationDetail->save();
			}
			$this->db->exec('UPDATE locationvisits SET isCurrent = 0');
			$locationVisit->threeLetterCode = $threeLetterCode;
			if ($subLocation){
				if ($subLocationIsSubCode){
					$locationVisit->subCode = $subLocation;
				}
				else {
					$locationVisit->subLocationName = $subLocation;
				}
			}
			$locationVisit->isCurrent = true;
			$locationVisit->save();
		}
		$responseMsg = $error?$error:'Location fucking updated!';
		header("content-type: text/xml");
		echo '<?xml version="1.0" encoding="UTF-8"?>
				<Response>
					<Message>' . $responseMsg . '</Message>
				</Response>';
	}
	private function loadCurrentLocation(){
		$result = $this->db->exec("
			SELECT lv.*, a.country, a.city, a.timeZoneOffset FROM locationvisits lv
			JOIN airports a ON a.threeLetterCode = lv.threeLetterCode
			WHERE isCurrent = 1
			");
		$currentLocation = $result[0];
		$query = "
			SELECT city, country, phoneNumber, extraStuffJson FROM locationdetails ld
			LEFT JOIN phonenumbers pn ON ld.phoneNumberId = pn.id
			WHERE threeLetterCode = '{$currentLocation['threeLetterCode']}'";
		if ($currentLocation['subCode']){
			$query .= " AND subCode = '{$currentLocation['subCode']}'";
		}
		$result = $this->db->exec($query);
		$locationDetails = $result[0];
		foreach(array('city', 'country') as $k){
			if ($locationDetails[$k]){
				$currentLocation[$k] = $locationDetails[$k];
			}
		}
		$currentLocation['phoneNumber'] = $locationDetails['phoneNumber'];
		$currentLocation['locationExtraStuffJson'] = $locationDetails['extraStuffJson'];
		$this->currentLocation = $currentLocation;
	}
	private function hashPw($pw){
		return hash("sha256", $this->f3->get("appVars.passwordSalt") . $pw);
	}
			
}


?>