<?php
	include 'common.php';
	$wronglogin = false;
	if(isset($_SESSION['id'])){ // se existe uma sessão aberta
		header("Location: home.php");
		die();
	}
	if(isset($_POST['email']) && isset($_POST['psw'])){ // se houve uma requisição de login
		$email = htmlentities($_POST['email']);
		$psw = htmlentities($_POST['psw']);
		$user = new User();
		$md5psw = md5($_POST['psw'].$sal.$_POST['email']);
		if($user->doLogin($email,$md5psw)){ // caso tenha resultado positivo do login
			header("Location: home.php");
			die();
		} else { //resultado negativo do login
			$wronglogin = true;
		}
	}else{
		
	}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8"/>
		<title>LARPHE</title>
		<link rel="stylesheet" type="text/css" href="styles/index.css"/>
		<script src="jquery-2.2.3.js"></script>
		<script src="index.js"></script>
	</head>
	<body id="body_index">
			<div id="logo">
				<img src="imagens/logo.png" alt="Logo Home Automation System">
			</div>
			<br>
			<div id="login">
				<h1 id="titulo">Login</h1>
				<form id="FormLogin" action="index.php" name="FormLogin" method="post" onsubmit="validate_form()">
					  <input name="email" id="email" type="email" placeholder="E-Mail" autofocus required autocomplete="off"><br>
					  <input name="psw" id="password" type="password" placeholder="Password" required><br>
					  <input id="LoginButton" onclick="admin()" type="submit" value="Login">
				</form>
				<?php
				if($wronglogin){
					echo '<p style="color: red; text-align: center;">Invalid E-Mail or Password!</p>';
				}
				?>
				<a href="#">Forgot your password?</a>
			</div>
		<footer>HAS | All rights reserved</footer>
	</body>
</html>