<?php
class Site{
	public function __construct(){
		$this->f3 = Base::instance();
		$this->db = new DB\SQL($this->f3->get('dbVars.path'), $this->f3->get('dbVars.username'), $this->f3->get('dbVars.password'));
		$this->appVars = array(
				'isLoggedIn' => $this->f3->exists('SESSION.user.username'),
				'activeTab' => 'currentLocationTab',
				'activeForm' => false
				);
		$this->f3->set('isLoggedIn', $this->appVars['isLoggedIn']);
		if (!$this->f3->exists('SESSION.error')){
			$this->f3->set('SESSION.error', false);
		}
	}
	
	
	public function showIndex(){
		$Locations = new Locations();
		$jsVars = $this->appVars;
		if ($this->appVars['isLoggedIn'] && $this->f3->get('SESSION.user.userLevel') == 1){
			$this->f3->set('content', 'loggedInDiane.htm');
			$this->f3->set('locations', $Locations->getAllLocations());
			$this->f3->set('phoneNumbers', $Locations->getAllPhoneNumbers());
			$jsVars['locations'] = $this->f3->get('locations');
			$jsVars['phoneNumbers'] = $this->f3->get('phoneNumbers');
		}
		else {
			$this->f3->set('content', 'notLoggedIn.htm');
		}
		$this->f3->set('currentLocation', $Locations->getCurrentLocation());
		$jsVars['currentLocation'] = $this->f3->get('currentLocation');
		$jsVars['activeTab'] = $this->appVars['activeTab'];
		$jsVars['error'] = $this->f3->get('SESSION.error');
		$this->f3->set('initDataStr', json_encode($jsVars));
		echo Template::instance()->render('layout.htm');
	}
	
	public function routeForm(){
		if (isset($_POST['formId'])){
			switch($_POST['formId']){
				case 'login':
					$this->doLogIn();
					break;
				case 'editAccount':
					$this->editAccount();
					break;
				case 'editLocation':
					$this->editLocation();
					$this->appVars['activeTab'] = 'locationsTab';
					break;
				case 'editPhoneNumber':
					$this->editPhoneNumber();
					$this->appVars['activeTab'] = 'phoneNumbersTab';
					break;
				case 'setLocation':

					$this->setLocationFromForm();

					$this->appVars['activeTab'] = 'locationsTab';
					break;
			}
			if ($this->f3->get('SESSION.error')){
				$this->appVars['activeForm'] = $_POST['formId'];
			}
			
			
		}

		$this->showIndex();
		
	}
	public function handleTwilioRequest(){
		$error = false;
		$Locations = new Locations();

		if (!isset($_POST['Body']) || strlen($_POST['Body']) < 3){
			$error = "Missing or too short message";
		}
		if (!$error){
			$threeLetterCode = substr($_POST['Body'], 0, 3);
			if (strlen($_POST['Body']) > 4){
				$subLocation = substr($_POST['Body'], 4);
			}
			else {
				$subLocation = false;
			}
			$result = $Locations->setCurrentLocation($threeLetterCode, $subLocation);
			$error = $result['error'];
		}
		$responseMsg = $error?$error:'Location fucking updated!';
		header("content-type: text/xml");
		echo '<?xml version="1.0" encoding="UTF-8"?>
				<Response>
					<Message>' . $responseMsg . '</Message>
				</Response>';
	}
	public function doLogOut(){
		$this->f3->set('SESSION.error', false);
		$this->f3->set('SESSION.user', false);
		$this->appVars['isLoggedIn'] = false;
		$this->f3->set('isLoggedIn', false);
		$this->f3->reroute('/');
	}
	private function doLogIn(){
		$error = false;
		$Users = new Users();
		if (isset($_POST['username']) && isset($_POST['password'])){
			$user = $Users->getUser($_POST['username'], $_POST['password']);
		}
		else {
			$error = 'You fucking need both a username and password.';
		}
		if (!$error){
			if ($user){
				$this->f3->set('SESSION.user', $user);
				$this->appVars['isLoggedIn'] = true;
				$this->f3->set('isLoggedIn', true);
			}
			else {
				$error = 'Bad fucking login, goddammit';
			}
		}
		$this->f3->set('SESSION.error', $error);
	}
	private function editAccount(){
		$Users = new Users();
		$error = false;
		if ($this->appVars['isLoggedIn'] && isset($_POST['password']) && isset($_POST['newPassword'])){
			$result = $Users->updateAccount($this->f3->get('SESSION.user.username'), $_POST['password'], $_POST['newPassword']);
			$error = $result['error'];
		}
		$this->f3->set('SESSION.error', $error);
	}
	private function setLocationFromForm(){
		$error = false;
		$Locations = new Locations();
		if (isset($_POST['threeLetterCode'])){
			$subCode = isset($_POST['subCode'])?$_POST['subCode'] : '';
			$result = $Locations->setCurrentLocation($_POST['threeLetterCode'], $subCode, $_POST['subLocation'], isset($_POST['timeForHangouts']));
			$error = $result['error'];
		}
		else {
			$error = 'No Location Specified';
		}
		$this->f3->set('SESSION.error', $error);
	}
	private function editLocation (){
		$Locations = new Locations();
		if ($_POST['currentThreeLetterCode']){
			$result = $Locations->editLocation($_POST);
		}
		else {
			$result = $Locations->addLocation($_POST);
		}
		$error = $result['error'];
		$this->f3->set('SESSION.error', $error);
	}
	private function editPhoneNumber(){
		$Locations = new Locations();
		if ($_POST['phoneNumberId']){
			$result = $Locations->editPhoneNumber($_POST);
		}
		else {
			$result = $Locations->addPhoneNumber($_POST);
		}
		$error = $result['error'];
		$this->f3->set('SESSION.error', $error);
	}
			
			
}


?>