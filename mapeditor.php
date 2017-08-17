<?php 
	$actual_page = "map";
	include 'header.php';
	$mapController = new mapController();
	if (isset($_SESSION["actual_map"])) {
		$thisMap = $mapController->getMapById($_SESSION["actual_map"]);
		if($thisMap['account_id'] == $_SESSION['account_id']){
			
		}else{
			header("Location: home.php");
			die();
		}
	}else{
		if(isset($_GET["slot"])){
			if($_GET["slot"] >= 1 && $_GET["slot"] <= 6){
				$thisMap = new Map(null, "", "noimage.png", $_GET["slot"], $_SESSION['account_id']);
				$thisMap = objectToArray($thisMap); // transforma $object->key para $array[key]
			}
		}else{
			header("Location: home.php");
			die();
		}
	}
?>
	<link rel="stylesheet" type="text/css" href="styles/style.css">
	<article>
		<div id="map">
			<?php echo '<img id="img_map" src="maps/'.$thisMap['img'].'">';?>
			<div class="menu" >
				<div id="newItem_button" class ="menu_title " title="New Item"></div>
				<div id="newItem_menu" class="menu_dropdown">	
					<div id="newLampButton"
						class="newItemButton lamp_on"
						onclick="create('lamp');"
						title="Lamp">
					</div>
					<div id="newSocketButton"
						class="newItemButton socket_on"
						onclick="create('socket');"
						title="Electric Socket">
					</div>
					<div id="newAconditionerButton"
						class="newItemButton aconditioner_on"
						onclick="create('aconditioner');"
						title="Air Conditioner">
					</div>
				</div>
			</div>
			<div class="menu item_menu" >
				<div class="menu_title copyItem_button" title="Duplicate Item" onclick="copy_iten()"></div>
			</div>
			<div class="menu item_menu">
				<div class="menu_title rotateItem_button" title="Rotate Item" onclick="rotate_iten()"></div>
			</div>
			<div class="menu item_menu">
				<div class="menu_title configItem_button" title="Config Item" onclick="config_iten();"></div>
			</div>
			<div class="menu item_menu">
				<div class="menu_title deleteItem_button" title="Delete Item" onclick="delete_iten()"></div>
			</div>
			<div class="menu">
				<div class="menu_title clearMap_button" title="Clear Map" onclick="clear_map()"></div>
			</div>
			<div class="menu">
				<div id="uploadMap_button" class="menu_title" title="Upload Map Background" onclick="open_upload()"></div>
			</div>
			<div id="done_button" title="Editing done">
				<?php echo '<a href="map.php?actual_map='.$thisMap["id"].'"></a>' ?>
			</div>
			<div id="map_context_menu" style="left:0; top:0;">
				<div class="map_menu">
					<div id="map_newItem_button" class ="map_menu_title" title="New Item"></div>
					<div class="map_menu_dropdown" style="display: inline-flex">
						<div class="map_newItemButton lamp_on" onclick="new_iten('lamp')" title="Lamp"></div>
						<div class="map_newItemButton socket_on" onclick="new_iten('socket')" title="Socket"></div>
						<div class="map_newItemButton aconditioner_on" onclick="new_iten('aconditioner')" title="Air Conditioner"></div>				
					</div>			
				</div>
				<div class="map_menu">
					<div class="map_menu_title clearMap_button" title="Clear Map" onclick="clear_map()"></div>
				</div>
				<div class="map_menu">	
					<div id="uploadMap_button" class="map_menu_title" title="Upload Map Background" onclick="open_upload()"></div>
				</div>
			</div>
			<div id="context_menu" class="menu_dropdown" style="left:0; top:0;">
				<div class="map_menu">
					<div class ="map_menu_title copyItem_button" title="Copy Item" onclick="copy_iten()"></div>
					<div class ="map_menu_title rotateItem_button" title="Rotate Item" onclick="rotate_iten()"></div>
					<div class ="map_menu_title configItem_button" title="Config Item" onclick="config_iten()"></div>
					<div class ="map_menu_title deleteItem_button" title="Delete Item" onclick="delete_iten()"></div>
				</div>
			</div>
			<p id="info" style="visibility: hidden;">Selected Item:</p>
			<input id="map_name" type="text" onchange="editname()" onclick="select_id('')" title="Map Name" placeholder="Insert Map Name" value = <?php echo '"'.$thisMap['name'].'"'; ?> >
		</div>
		<div id="config_div" class="popup_background">
			<div id="config_popup">
				<label>Controller Output 
				<select>
				</select>
				</label><br>
				<button onclick="$('#config_div').hide('fast');">Cancel</button>
				<button onclick="save_config()">Save</button>
			</div>
		</div>
		<div id="upload_div" class="popup_background">
			<div id="upload_popup">
				<form><input type="file" id="inputImg" accept=".png,.jpg"/></form>
				<br>
				<img src="" id="output" style="width: auto; max-width:400px; max-height: 300px;"/>
				<br>
				<!--<img src="" id="tableBanner"/>-->
				<button onclick="$('#upload_div').hide('fast');">Cancel</button>
				<button onclick="save_upload();">Save</button>
				<input type="button" onclick="clear_map()" value="Clear This Background Map"/>
			</div>
		</div>
	</article>
	<footer>Map Editor</footer>
</body>
</html>
<script src="classController.js"></script>
<script src="mapeditor.js"></script>
<script src="upload.js"></script>

