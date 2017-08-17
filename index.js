var input_button = document.getElementById("LoginButton");
function validate_form(){
	//event.preventDefault();
	var input_email = document.getElementById("email").value;
	var input_psw = document.getElementById("password").value;
	var validation = false;
}
function admin(){
	var input_email = document.getElementById("email").value;
	var input_psw = document.getElementById("password").value;
	if(input_email == "admin" && input_psw != ""){
		event.preventDefault();
		document.getElementById("FormLogin").submit();
	}
}

$(document).ready(function(){
	$("input[name='email']").val('');
	$("input[name='psw']").val('');
});

