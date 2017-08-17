<?php
	include 'common.php';
	$maps_list = [];
	$itemController = new itemController();
	$itens_list = [];
	if(isset($_POST['action'])){
		switch($_POST['action']){
			case "read_itens":
				$itens_list = $itemController->getItensFromThisMap();
				die(json_encode($itens_list));
				break;
			case "save_item":
				$item = json_decode($_POST['item']);
				$itemController->saveItem(objectToArray($item));
				die(json_encode($item));
				break;
			case "create_item":
				$item = json_decode($_POST['item']);
				$item->id = $itemController->createItem(objectToArray($item));
				die(json_encode($item));
				break;
			case "del_item":
				$id = $_POST['id'];
				$itemController->deleteItem($id);
				die(json_encode($id));
				break;

				
		}	
	}
?>