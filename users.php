<?php
include 'header.php';
$actual_page = "users";
$edit_user_error = "";
$list_user = [];
$user = new User();
$userController = new userController();
if(isset($_POST['action'])){ // se foi enviado alguma action
	switch($_POST['action']){
		case 'del_user':
			$user->delUser($_POST['id']);
			break;
		case 'add_user':
			$newuser = [];
			$newuser['user'] = $_POST['email'];
			$newuser['psw'] = md5($_POST['psw'].$sal.$_POST['email']);
			$newuser['type'] = $_POST['type'];
			$newuser['account_id'] = $_SESSION['account_id'];
			$newuser['name'] = $_POST['name'];
			$user->newUser($newuser);
			break;
		case 'edit_user':
			// buscar no banco o psw do id do usuario
			$psw = $userController->getPswbyId($_POST['id']);
			$md5psw = md5($_POST['psw'].$sal.$_POST['email']);
			// verificar se o o 'old_psw' é igual ao psw do banco
			if($psw == $md5psw){ // se for igual enviar o update
				$edituser = [];
				$edituser['id'] = $_POST['id'];
				$edituser['psw'] = md5($_POST['newpsw'].$sal.$_POST['email']);
				$edituser['type'] = $_POST['type'];
				$edituser['user'] = $_POST['email'];
				$edituser['name'] = $_POST['name'];
				$user->updateUser($edituser);
			}else{ // se estiver errado dar echo de mensagem dentro do form
				$edit_user_error = "<script>alert('Old password is wrong!');</script>";
			}
			break;	
	}
	// recarregar a pagina após um "action"
	/*header("Location: users.php");
	die();*/
}
$list_user = $userController->getAllUsers();
?>
	<link rel="stylesheet" type="text/css" href="styles/management.css">
	<article>
		<div id="users">
			<div class='list'>
				<h3>Users List</h3>
				<table id="users_list">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th> 
							<th>Type</th>
						</tr>
					</thead>
					<tbody>
						<?php
							foreach($list_user as $user){
								echo '<tr data-user_id='.$user['id'].'>';
								echo '<td>'.$user['name'].'</td>';
								echo '<td>'.$user['user'].'</td>';
								echo '<td>'.$user['type'].'</td>';
								echo '</tr>';							
							}
						?>
					</tbody>
				</table>
			</div>
			<div class='form'>
				<form id="new_user" action="users.php" method="post" autocomplete="off">
					<h3>Register New User</h3>
					<label>Name:<input type="text" name="name" placeholder="Name"  required></label><br>
					<label>Email:<input type="email" name="email" placeholder="Email" required></label><br>
					<label>Password:<input type="password" name="psw" placeholder="Password" required></label><br>
					<label>Permission Type:
					<select name="type">
						<option value="admin">Admin</option>
						<option value="viewer">Viewer</option>
					</select></label><br>
					<div class="buttons">
						<button type="submit" name="action" value="add_user">Add New User</button>
					</div>
				</form>
				<form id="edit_user" action="users.php" method="post"  autocomplete="off">
					<h3>Edit User</h3>
					<label>Name:<input type="text" name="name" placeholder="Name" required></label><br>
					<label>Email:<input type="email" name="email" placeholder="Email" required></label><br>
					<label>Password:<input type="password" name="psw" placeholder="Old Password" required></label><br>
					<label>New or Confirm Password:<input type="password" name="newpsw" placeholder="New Password" required></label><br>
					<label>Permission Type:
					<select name="type">
						<option value="admin">Admin</option>
						<option value="viewer">Viewer</option>
					</select></label><br>
					<input type="text" name="id" style="display: none;">
					<div class="buttons">
						<button type="submit" name="action" value="edit_user">Save Edit</button>
						<button type="submit" name="action" value="del_user">Delete</button>
					</div>
				</form>
				<?php
					echo $edit_user_error;
				?>
			</div>
		</div>
	</article>
	<footer>Users</footer>
</body>
</html>
<script src="management.js"></script>