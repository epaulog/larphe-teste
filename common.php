<?php
	session_start();
	
	$sal = base64_encode("lucianothume");
	//-----------------------------------------------------------------------------------
	class Database{
		private $dbservername = "localhost:3306";
		private $dbusername = "root";
		private $dbpassword = "";
		private $dbname = "has";
		public $conn;
		public function __construct(){
			$this->dbConnection();
		}
		public function dbConnection(){     
			$this->conn = null;
			try{
				$this->conn = new PDO("mysql:host=$this->dbservername;dbname=$this->dbname", $this->dbusername, $this->dbpassword);
				$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			}
			catch(PDOException $exception){
				echo "Connection error: " . $exception->getMessage();
			}			 
		}
		public function runQuery($sql){
			try{
				$stmt = $this->conn->prepare($sql);
				$stmt->execute();
				return $stmt;
			}
			catch(PDOException $exception){
				echo "Connection error: " . $exception->getMessage();
			}
		}
		public function selectAllFromThisAccount($table){
			try{
				$stmt = $this->runQuery("SELECT
											* 
										FROM 
											$table 
										WHERE 
											account_id='".$_SESSION['account_id']."'");
				return $stmt->fetchAll(PDO::FETCH_ASSOC);
			}
			catch(PDOException $exception){
				echo "Connection error: " . $exception->getMessage();
			}
		}
		public function selectTuplaByIdFromTable($id,$table){
			try{
				$stmt = $this->runQuery("SELECT
											* 
										FROM 
											$table 
										WHERE 
											id=$id");
				return $stmt->fetch(PDO::FETCH_ASSOC);
			}
			catch(PDOException $exception){
				echo "Connection error: " . $exception->getMessage();
			}
		}
		public function insertToTableObject($table, $object){
			$keys = "(".objectKeysToString($object).")";
			$values = "(".objectValuesToString($object).")";
			$sql = "INSERT INTO 
						$table $keys
					VALUES
						$values";
			try{
				$stmt = $this->runQuery($sql);
				return $this->conn->lastInsertId();
			}
			catch(PDOException $exception){
				echo "Connection error: " . $exception->getMessage();
			}
		}
		public function deleteTuplaFromTablebyId($table, $id){
			try{
				$stmt = $this->runQuery("DELETE
										FROM 
											$table 
										WHERE 
											id=$id");
			}
			catch(PDOException $exception){
				echo "Connection error: " . $exception->getMessage();
			}
		}
		public function UpdateTableObjectbyId($table, $object){ // objeto deve ter a chave 'id' e não pode ser a ultima chave a ser adicionada
			$strObject = ObjecttoString($object);
			try{
				$sql = "UPDATE 
							$table 
						SET
							$strObject
						WHERE
							id=".$object['id']."";
				$stmt = $this->runQuery($sql);
			}
			catch(PDOException $exception){
				echo "Connection error: " . $exception->getMessage();
			}
		}
	}
	//-----------------------------------------------------------------------------------
	class User{
		public $id;
		public $name;
		public $user;
		public $psw;
		public $type;
		public $account_id;
		//public $conn;
		private $db;
		public function __construct(){
			$this->db = new Database();
		}
		public function doLogin($email,$psw){
			$stmt = $this->db->runQuery("SELECT 
										* 
									FROM 
										users
									WHERE 
										user='".$email."' 
										AND 
										psw='".$psw."'");
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			if($result){
				$_SESSION['id'] = $result['id'];
				$_SESSION['name'] = $result['name'];
				$_SESSION['account_id'] = $result['account_id'];
				$this->account_id = $result['account_id'];
				$_SESSION['type'] = $result['type'];
				$this->type = $result['type'];
				return true;
			}else{
				return false;
			}
		}
		public function delUser($id){
			$stmt = $this->db->deleteTuplaFromTablebyId('users', $id);
		}
		public function updateUser($object){
			$this->db->UpdateTableObjectbyId('users', $object);
		}
		public function newUser($object){
			$this->db->insertToTableObject('users', $object);
		}
		public function doLogout(){
			header("Location: logout.php");
			die();
		}
	}
	//-----------------------------------------------------------------------------------
	class userController{
		private $db;
		public function __construct(){
			$this->db = new Database();
		}
		public function getPswbyId($id){
			$sql = "SELECT
						psw
					FROM 
						users
					WHERE
						id=$id";
			try{
				$stmt = $this->db->runQuery($sql);
				$result = $stmt->fetch(PDO::FETCH_ASSOC);
				return $result['psw'];
			}
			catch(PDOException $exception){
				echo "Connection error: " . $exception->getMessage();
			}
		}
		public function getAllUsers(){
			return $this->db->selectAllFromThisAccount('users');
		}
	}
	//-----------------------------------------------------------------------------------
	class Map{
		public $id;
		public $name;
		public $slot;
		public $img;
		public $account_id;
		private $mapController;
		public function __construct($id,$name,$img,$slot,$account_id){
			$this->id = $id;
			$this->name = $name;
			$this->img = $img;
			$this->slot = $slot;			
			$this->account_id = $account_id;
		}
		public function delMap(){
			$this->mapController = new mapController();
			$this->mapController->delMapById($this->id);
		}
		public function updateMap(){
			
		}
		public function newMap(){

		}
		public function clearMap(){
			$this->mapController = new mapController();
			$this->mapController->clearMapByid($this->id);
		}
	}
	//-----------------------------------------------------------------------------------
	class mapController{
		private $db;
		private $itemController;
		public function __construct(){
			$this->db = new Database();
			$this->itemController = new itemController();
		}
		public function delMapById($id){
			$this->clearMapByid($id);
			$this->db->deleteTuplaFromTablebyId('maps', $id);
		}
		public function clearMapByid($id){
			// desvincular os 'ios' dos hardwares que estão vinculados aos itens de dentro deste mapa
			$itemController->deleteAllItensFromMapId($id); // deletar os itens desse mapa
			// deletar o arquivo de imagem
		}
		public function getMapById($id){
			return $this->db->selectTuplaByIdFromTable($id,'maps');
		}
		public function getAllMaps(){
			return $this->db->selectAllFromThisAccount('maps');
		}
		public function getActualMapId(){
			return $_SESSION['actual_map'];
		}
		public function updateMap($map){
			$this->db->UpdateTableObjectbyId('maps',objectToArray($map));
		}
	}
	class itemController{
		private $db;
		public function __construct(){
			$this->db = new Database();
		}
		public function getItensFromThisMap(){
			$sql = "SELECT 
						itens.*,
						item_types.name type_name 
					FROM itens 
					JOIN item_types ON item_types.id = itens.type 
					WHERE map_id=".$_SESSION['actual_map'];
			$stmt = $this->db->runQuery($sql);
			return $stmt->fetchAll(PDO::FETCH_ASSOC);
		}
		public function deleteAllItensFromMapId($map_id){
			$sql = "DELETE
					FROM
						itens
					WHERE
					map_id = ".$map_id;
			$stmt = $this->db->runQuery($sql);
		}
		public function saveItem($object){
			$this->db->UpdateTableObjectbyId('itens',$object);
		}
		public function createItem($object){
			$newid = $this->db->insertToTableObject('itens', $object);
			return $newid;
		}
		public function deleteItem($id){
			$this->db->deleteTuplaFromTablebyId('itens',$id);
		}
	}
	
	//-----------------------------------------------------------------------------------
	function objectToArray($object){ // transforma $object->key para $array[key]
		$array = [];
		foreach ($object as $key => $value) {
			$array[$key] = $value;
		}
		return $array;
	}
	function ObjecttoString($object){
		$str = "";
		$objectsize = count($object);
		foreach($object as $key=>$value){
			if($key == 'id'){ // se a chave for "id" não é enviada
				$objectsize--;
			}else{
				if(is_numeric($value)){// se for numero, não colocar aspas
					$str.=$key."=".$value;
				}else{
					$str.=$key."='".$value."'";
				}
				if($objectsize > 1){ // se for o ultimo não colocar ',' no final
					$objectsize--;
					$str.=", ";
				}
			}
		}
		return $str; // key='value', key='value', key='value'
	}
	function objectKeysToString($object){
		$str = "";
		$objectsize = count($object);
		foreach($object as $key=>$value){
			if($key == 'id'){ // se a chave for "id" não é enviada
				$objectsize--;
			}else{
				$str.=$key;
				if($objectsize > 1){ // se for o ultimo não colocar ',' no final
					$objectsize--;
					$str.=", ";
				}
			}
		}
		return $str;
	}
	function objectValuesToString($object){
		$str = "";
		$objectsize = count($object);
		foreach($object as $key=>$value){
			if($key == 'id'){ // se a chave for "id" não é enviada
				$objectsize--;
			}else{
				if(is_numeric($value)){// se for numero, não colocar aspas
					$str.=$value;
				}else{
					$str.="'".$value."'";
				}
				if($objectsize > 1){ // se for o ultimo não colocar ',' no final
					$objectsize--;
					$str.=", ";
				}
			}
		}
		return $str;
	}
?>