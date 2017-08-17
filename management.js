var available_ios = new Array();
var controllers_list = new Array();
var users_list = new Array();
var selected_item;
var actual_user = localStorage.getItem("actual_user");
var user_type = localStorage.getItem(actual_user+"_type");

function novo_id(type){ // gera novo id que ainda não existe
	n_itens=1;
	while(localStorage.getItem(type+n_itens+"_name") != null){ //Equanto existir um item com o mesmo ID 
		n_itens++; // soma a variavel numérica
	}
	return type+n_itens;
}
function new_controller(event){
	event.preventDefault();
	var new_controller_name = $("#new_controller input[name='name']").val();
	var new_controller_IP = $("#new_controller input[name='IP']").val(); //IP:porta Exemplo = 192.168.1.100:80
	var new_controller_type = parseInt($("#new_controller select").val(),10); // numero de outputs
	var new_id = novo_id("controller");
	localStorage.setItem(new_id+"_name",new_controller_name);
	localStorage.setItem(new_id+"_IP",new_controller_IP);
	localStorage.setItem(new_id+"_type",new_controller_type);
	controllers_list.push(new_id); // adiciona o new_id no array
	localStorage.setItem("controllers_list",controllers_list);
	for(i=1;i<=new_controller_type;i++){
		available_ios.push(new_id+"_out"+i);
	}
	localStorage.setItem("available_ios",available_ios);
	$('#controllers_list>tbody').append("<tr><td>"+new_controller_name+"</td><td>"+new_controller_IP+"</td><td>"+new_controller_type+"</td></tr>");
	location.reload();
}
function new_user(event){
	event.preventDefault();
	$("#new_user input[name='action']").val('add_user');
	document.getElementById("new_user").submit();
}
function delete_controller(){
	$('#controllers_list>tbody tr')[selected_item].remove();
	var n_ios = parseInt(localStorage.getItem(controllers_list[selected_item]+"_type"),10);
	for(j=1;j<=n_ios;j++){
		available_ios.splice(available_ios.indexOf(controllers_list[selected_item]+"_out"+j),1);
	}
	localStorage.removeItem(controllers_list[selected_item]+"_name");
	localStorage.removeItem(controllers_list[selected_item]+"_IP");
	localStorage.removeItem(controllers_list[selected_item]+"_type");
	controllers_list.splice(selected_item,1);
	localStorage.setItem("controllers_list",controllers_list);
	localStorage.setItem("available_ios",available_ios);
	location.reload();
}
function edit_controller(){
	var controller_name = $("#edit_controller input[name='name']").val();
	var controller_IP = $("#edit_controller input[name='IP']").val();
	localStorage.setItem(controllers_list[selected_item]+"_name",controller_name);
	localStorage.setItem(controllers_list[selected_item]+"_IP",controller_IP);
	location.reload();
}
function delete_user(event){
	event.preventDefault();
	var Form = document.getElementById("edit_user");
	$("#edit_user input[name='action']").val('del_user');
	if(Form.checkValidity() == false){
		alert(Form.validationMessage);
	}else{
		Form.submit();
	}
}
function edit_user(event){
	event.preventDefault();
	var Form = document.getElementById("edit_user");
	$("#edit_user input[name='action']").val('edit_user');
	if(Form.checkValidity() == false){
		alert(Form.validationMessage);
	}else{
		Form.submit();
	}	
}
$(document).ready(function(){
	$('#controllers tbody tr').click(function(){
		$('.selected_item').removeClass('selected_item');
		$(this).addClass('selected_item');
		var list_index = $(this).index();
		selected_item = list_index;
		var selected_name = localStorage.getItem(controllers_list[list_index]+"_name");
		var selected_IP = localStorage.getItem(controllers_list[list_index]+"_IP");
		$('#new_controller').hide('fast');
		$('#edit_controller').show('fast');
		$("#edit_controller input[name='name']").val(selected_name);
		$("#edit_controller input[name='IP']").val(selected_IP);
	});
	$("#controllers .list").click(function(event){
		if(!($(event.target).parent().hasClass('selected_item'))){
			$('.selected_item').removeClass('selected_item');
			$("#edit_controller input[name='name']").val("");
			$("#edit_controller input[name='IP']").val("");
			$("#edit_controller select").val(1);
			$('#new_controller').show('fast');
			$('#edit_controller').hide('fast');
		}
	});
	$("#users .list").click(function(event){
		if(!($(event.target).parent().hasClass('selected_item'))){
			$('.selected_item').removeClass('selected_item');
			$("#edit_user input[name='name']").val("");
			$("#edit_user input[name='email']").val("");
			$("#edit_user select").val('admin');
			$('#new_user').show('fast');
			$('#edit_user').hide('fast');
		}
	});
	$('#users tbody tr').click(function(){ // seleciona e passa o usuario selecionado para o form de edição
		$('.selected_item').removeClass('selected_item');
		$(this).addClass('selected_item');
		selected_item = $(this).data('user_id'); // $("tr[data-user_id="+selected_item+"]")
		$tds = $(this).find('td');
		var selected_name = $tds[0].innerHTML;
		var selected_email = $tds[1].innerHTML;
		var selected_type = $tds[2].innerHTML;
		$('#new_user').hide('fast');
		$('#edit_user').show('fast');
		$("#edit_user input[name='name']").val(selected_name);
		$("#edit_user input[name='email']").val(selected_email);
		$("#edit_user input[name='id']").val(selected_item);
		$("#edit_user select").val(selected_type);
	});
});