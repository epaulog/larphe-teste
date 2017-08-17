<?php
	include 'common.php';
	$maps_list = [];
	$mapController = new mapController();
	if(isset($_POST['action'])){
		switch($_POST['action']){
			case "getActualMap":
				$map_id = $mapController->getActualMapId();
				die(json_encode($map_id));
			break;
			case "updateMap":
				$mapController->updateMap($_POST['map']);
				die(json_encode(""));
			break;
		}
	}
?>