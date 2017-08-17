<?php
$actual_page = "controllers";
include 'header.php';
?>
	<link rel="stylesheet" type="text/css" href="styles/management.css">
	<article>
		<div id="controllers">
			<div class='list'>
				<h3>Controllers List</h3>
				<table id="controllers_list">
					<thead>
						<tr>
							<th>Name</th>
							<th>IP</th> 
							<th>Type</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
			<div class='form'>
				<form id="edit_controller" >
					<h3>Edit Controller</h3>
					<label>Name:<input type="text" name="name" placeholder="Name" autocomplete="off" required></label><br>
					<label>IP:port:<input type="text" name="IP" placeholder="IP:port" required></label><br>
					<div class="buttons">
						<button onclick="edit_controller()">Save</button>
						<button onclick="delete_controller()">Delete</button>				
					</div>
				</form>
				<form id="new_controller" onsubmit="new_controller(event);">
					<h3>Insert New Controller</h3>
					<label>Name:<input type="text" name="name" placeholder="Name" autocomplete="off" required></label><br>
					<label>IP:port:<input type="text" name="IP" placeholder="IP:port" required></label><br>
					<label>Type:
					<select>
						<option value="1">1 output</option>
						<option value="2">2 outputs</option>
						<option value="4">4 outputs</option>
					</select></label><br>
					<div class="buttons">
						<input type="submit" value="Add New Controller">
					</div>
				</form>
			</div>
		</div>
	</article>
	<footer>Controllers</footer>
</body>
</html>
<script src="management.js"></script>