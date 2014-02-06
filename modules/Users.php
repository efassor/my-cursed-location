<?php
class Users{
	public function __construct(){
		$this->f3 = Base::instance();
		$this->db = new DB\SQL($this->f3->get('dbVars.path'), $this->f3->get('dbVars.username'), $this->f3->get('dbVars.password'));
	}
	public function getUser($username, $password){
		$error = false;
		$pwHash = $this->hashPw($password);
		$user=new DB\SQL\Mapper($this->db,'users');
		$user->load(array('username=?', $username));
		if (!$user->dry() && $user->password == $pwHash){
			return array('username'=>$user->username, 'userLevel'=>$user->userLevel);
		}
		else {
			return false;
		}

	}
	public function updateAccount($username, $password, $newPassword){
		$error = false;
		$user=new DB\SQL\Mapper($this->db,'users');
		$user->load(array('username=?', $this->f3->get('SESSION.user.username')));
		if ($user->dry()){
			$error = "Bad username";
		}
		if (!(isset($_POST['password']) && $this->hashPw($_POST['password']) == $user->password)){
			$error = "Bad password, dammit!";
		}
		if (!$error && isset($_POST['newPassword'])){
			$user->password = $this->hashPw($_POST['newPassword']);
			$user->save();
		}
		return array('error'=>$error);
	}
	private function hashPw($pw){
		return hash("sha256", $this->f3->get("appVars.passwordSalt") . $pw);
	}

}

?>