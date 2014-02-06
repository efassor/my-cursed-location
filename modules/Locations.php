<?php
class Locations{
	public function __construct(){
		$this->f3 = Base::instance();
		$this->db = new DB\SQL($this->f3->get('dbVars.path'), $this->f3->get('dbVars.username'), $this->f3->get('dbVars.password'));
	}
	public function getCurrentLocation(){
		$locationVisit = new DB\SQL\Mapper($this->db,'locationvisits');
		$locationVisit->load(array('isCurrent=?', 1));
		$currentLocation = false;
		if (!$locationVisit->dry()){
			$result = $this->getLocationDetails($locationVisit->threeLetterCode, $locationVisit->subCode);
			$currentLocation = $result[0];
			$currentLocation['subLocationName'] = $locationVisit->subLocationName;
		}
		return $currentLocation;
	}
	public function setCurrentLocation($threeLetterCode, $subLocation = false, $description = false, $timeForHangouts = true){
		$airport = new DB\SQL\Mapper($this->db,'airports');
		$locationDetail = new DB\SQL\Mapper($this->db,'locationdetails');
		$locationVisit = new DB\SQL\Mapper($this->db,'locationvisits');
		$error = false;
		$subLocationIsSubCode = false;
		$airport->load(array('threeLetterCode=?', $threeLetterCode));
		if ($airport->dry()){
			$error = "Can't find airport \"$threeLetterCode\"" ;
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
				$locationDetail->phoneNumberId = 1;//$this->f3->get('appVars.defaultPhoneNumberId');
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
			if (!$subLocationIsSubCode){
				$locationVisit->subLocationName  = $description;
				
			}
			$locationVisit->timeForHangouts = $timeForHangouts;
			$locationVisit->isCurrent = true;
			$locationVisit->save();
		}
		return array('error'=>$error);
	}
	public function editLocation($data){
		$locationDetail = new DB\SQL\Mapper($this->db,'locationdetails');
		$error = false;
		if (isset($data['currentThreeLetterCode'])){
			if (isset($data['currentSubCode']) && $data['currentSubCode']){
				$currentSubCode = $data['currentSubCode'];
			}
			else {
				$currentSubCode = '';
			}
		}
		else {
			$error = 'No location specified';
		}
		if (!$error){

			$locationDetail->load(array('threeLetterCode=? AND subCode=?', $data['currentThreeLetterCode'], $currentSubCode));
			if ($locationDetail->dry()){
				$error = "Can't find location";
			}
		}
		if (!$error){
			$locationDetail->city = $data['city'];
			$locationDetail->country = $data['country'];
			$locationDetail->phoneNumberId = $data['phoneNumberId'];
			$locationDetail->save();
		}
		return array('error' => $error);
	}
	public function addLocation($data){
		$airport = new DB\SQL\Mapper($this->db,'airports');
		$locationDetail = new DB\SQL\Mapper($this->db,'locationdetails');
		$error = false;
		$airport->load(array('threeLetterCode=?', $data['threeLetterCode']));
		if ($airport->dry()){
			$error = "Can't find airport \"$threeLetterCode\"" ;
		}
		if (!$error){
			$locationDetail->threeLetterCode = $data['threeLetterCode'];
			$locationDetail->subCode = $data['subCode'];
			$locationDetail->city = $data['city'];
			$locationDetail->country = $data['country'];
			$locationDetail->phoneNumberId = $data['phoneNumberId'];
			$locationDetail->save();
			
			
		}
		return array('error' => $error);
	}
	public function editPhoneNumber($data){
		$phoneNumber = new DB\SQL\Mapper($this->db,'phonenumbers');
		$error = false;
		$phoneNumber->load(array('id=?', $data['phoneNumberId']));
		if ($phoneNumber->dry()){
			$error = "Couldn't find that phone number";
		}
		if (!$error){
			$phoneNumber->name = $data['name'];
			$phoneNumber->phoneNumber = $data['phoneNumber'];
			$phoneNumber->save();
		}
		return array('error' => $error);
	}
	public function addPhoneNumber($data){
		$phoneNumber = new DB\SQL\Mapper($this->db,'phonenumbers');
		$error = false;
		if (!$error){
			$phoneNumber->name = $data['name'];
			$phoneNumber->phoneNumber = $data['phoneNumber'];
			$phoneNumber->save();
		}
		return array('error' => $error);
	}
	private function getLocationDetails($threeLetterCode = false, $subCode = ''){
		$query = "
			SELECT a.timeZoneOffset, a.latitude, a.longitude, ld.threeLetterCode, ld.subCode, ld.city, ld.country, a.city AS airportcity, a.country AS airportcountry, phoneNumber, extraStuffJson FROM locationdetails ld
			LEFT JOIN phonenumbers pn ON ld.phoneNumberId = pn.id
			LEFT JOIN airports a ON ld.threeLetterCode = a.threeLetterCode";
		if ($threeLetterCode){
			$query.= " WHERE ld.threeLetterCode = '{$threeLetterCode}' AND ld.subCode = '{$subCode}'";
		}
		$result = $this->db->exec($query);
		for ($i=0; $i < count($result); $i++){
			foreach(array('city', 'country') as $k){
				$result[$i][$k] = $result[$i][$k] ? $result[$i][$k] : $result[$i]["airport{$k}"];
				unset($result[$i]["airport{$k}"]);
			}
		}
		return $result;
	}
	public function getAllPhoneNumbers(){
		$result = $this->db->exec("SELECT id, name, phoneNumber FROM phonenumbers");
		return $result;
	}
	public function getAllLocations(){
		return $this->getLocationDetails(false);
	}
	

}
?>
