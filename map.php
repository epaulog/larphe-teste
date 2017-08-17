<?php 
	$actual_page = "map";
	include 'header.php';
	$mapController = new mapController();
	if (isset($_GET["actual_map"])) {
		$thisMap = $mapController->getMapById($_GET["actual_map"]);
		if($thisMap['account_id'] == $_SESSION['account_id']){
			$_SESSION['actual_map'] = $thisMap["id"];
		}else{
			header("Location: home.php");
			die();
		}
	}else{
		if(isset($_GET["slot"])){
			if($_GET["slot"] >= 1 && $_GET["slot"] <= 6){
				header("Location: mapeditor.php?slot=".$_GET["slot"]);
			}else{
				header("Location: home.php");	
			}
		}else{
			header("Location: home.php");
		}
		die();
	}
	$itens_list = [];
	/*
	<div id="item_2" class="lamp lamp_off" draggable="false"
	onclick="change_status(this.id)" oncontextmenu="open_menu(event); return false;"
	style="left: 18.9892051030422%; top: 114.9400299850075px; height:19.68204121687929px; width:19.68204121687929px; transform: rotate(0deg);">
	</div>*/

?>	
	<link rel="stylesheet" type="text/css" href="styles/style.css">
	<article>
		<div id="map">

			<?php echo '<img id="img_map" src="maps/'.$thisMap['img'].'">';?>
			<div id="edit_button" title="Edit Map">
				<a href="mapeditor.php"></a>
			</div>
			<div id="temp_menu" style="left:0; top:40;">
				<div id="temp_monitor">24°C</div>
				<input id="temperature" type="range" oninput="change_temp()" min="17" max="30"/>
			</div>
			<div id="map_name"><?php echo $thisMap['name']; ?></div>
		</div>
	</article>
	<footer>Map Monitor</footer>
</body>
<script src="classController.js"></script>
<script src="monitor.js"></script>
</html>

