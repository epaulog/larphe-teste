	class Database{
		private $dbservername = "localhost:3306";
		private $dbusername = "lucianothume";
		private $dbpassword = "12345";
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
