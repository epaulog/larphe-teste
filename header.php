<?php
	include 'common.php';
	//$class_selected = 'class="menu_selected"';
	$db = new Database();
	if(!(isset($_SESSION['id']))){ // se nao existe uma sessao aberta
		header("Location: index.php");
		die();
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Home Automation System</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="user-scalable=no"/>
	<link rel="stylesheet" type="text/css" href="styles/header.css">
	<script src="jquery-2.2.3.js"></script>  
</head>
<body>
	<header>
		<div class="shadowed" id="logo">
			<a href="home.php"></a>
		</div>
		<div id="rightheader">
			<div id="userinfo">
				<div id="logout" title="Logout">
					<a href="logout.php"></a>
				</div>
				<div id="username">
					<?php echo utf8_encode($_SESSION['name']); ?>
				</div>
			</div>
			<nav>
				<a href="about.php" title="About Us">About Us</a>
				<a href="contact.php" title="Talk to Us">Talk to Us</a>
				<?php
				if($_SESSION['type'] == 'admin'){
					echo '<a href="controllers.php" title="Controllers">Controllers</a>';
					echo '<a href="users.php" title="Users">Users</a>';
				}
				?>
				<a href="home.php"  title="Home">Home</a>
			</nav>
		</div>
		<!--<script src="header.js"></script>-->
	</header>