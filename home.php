<?php 
	$actual_page = "home";
	include 'header.php';
	unset($_SESSION['actual_map']);
	$mapController = new mapController();
	$maps_list = [];
	$maps_list = $mapController->getAllMaps();
?>
	<link rel="stylesheet" type="text/css" href="styles/maps.css">
	<article>
		<div id="maps">
			<?php
				$count_maps = count($maps_list);
				$i_maps = 0;
				for($i=1;$i<=6;$i++){
					echo '<div class="mapWindow">';
					if($i == $maps_list[$i_maps]['slot']){
						echo '<a href="map.php?actual_map='.$maps_list[$i_maps]['id'].'">';
						echo '<img src="maps/'.$maps_list[$i_maps]["img"].'" class="map_img" alt="Map Image" title="'.$maps_list[$i_maps]["name"].'">';
						echo '</a>';
						echo '<div class="close_map" title="Delete"></div>';
						echo '<div class="name_map" title="Map Name">'.$maps_list[$i_maps]["name"].'</div>';
						if($i_maps < $count_maps -1){
							$i_maps++;
						}
					}else{
						echo '<a href="map.php?slot='.$i.'">';
						echo '<img src="imagens/add_map.png" class="map_img" alt="Map Image" title="New Map">';
						echo '</a>';
						echo '<div class="close_map" title="Delete"></div>';
						echo '<div class="name_map" title="Map Name"></div>';
					}
					echo '</div>';					
				}
			?>
		</div>
	</article>
	<footer>Maps</footer>
</body>
</html>
<script src="maps.js"></script>