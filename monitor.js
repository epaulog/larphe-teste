var actual_map;
var change_window;
var global_id;
var offsettop = parseInt(logo.offsetHeight,10);
var temp_menu = document.getElementById("temp_menu");
var itens = [];
var maps = [];
function create_old(iten_id,item_type,posX,posY,iten_size,iten_status,rotate){
	//var classe = iten_id.split("_")[0];
	var new_iten = document.createElement("div");
	var map = document.getElementById("map");
	map.appendChild(new_iten);
	new_iten.setAttribute("id",iten_id);
	new_iten.setAttribute("class",item_type+" "+item_type+"_"+iten_status);
	new_iten.setAttribute("draggable","false");
	new_iten.setAttribute("onclick","change_status(this.id)");
	new_iten.setAttribute("oncontextmenu","open_menu(event); return false;");
	new_iten.setAttribute("style","left: "+posX+"; top: "+posY+"; height:"+iten_size+"px; width:"+iten_size+"px; transform: rotate("+rotate+"deg);" );
}
function change_status(iten_id){

	var save_item = {};
	save_item.id = iten_id.split("_")[1];
	var iten = document.getElementById(iten_id);
	var classe = iten.getAttribute("class").split("_");
	var reverse = (classe[1] == "on" ? "off" : "on");
	save_item.status = reverse;
	ItemController.SaveItem(save_item);
	iten.setAttribute("class",classe[0]+"_"+reverse);
	var out = localStorage.getItem(iten_id+"_out");
	if((out != null) && (out != "") && (out != 0)){
		var controller = out.split('_')[0];
		var output = out.split('_')[1];
		var IP = localStorage.getItem(controller+"_IP");	
		WebSocketTest(IP,reverse);
	}
}
function open_menu(event){
	iten_id = event.target.id;
	global_id = iten_id;
	if(iten_id.split("_")[0] == "aconditioner"){
		temp_menu.style.left = event.clientX + "px";
		temp_menu.style.top = event.clientY - offsettop + "px";
		temp_menu.style.display = "block";
		var temperature = localStorage.getItem(iten_id+ "_temp");
		var monitor_temp = document.getElementById("temp_monitor");
		var input_temp = document.getElementById("temperature");
		input_temp.value = temperature;
		monitor_temp.innerHTML = temperature+"°C";
	}
	else{
		temp_menu.style.display = "none";
	}
}
function change_temp(){
	var input_temp = document.getElementById("temperature");
	var monitor_temp = document.getElementById("temp_monitor");
	monitor_temp.innerHTML = input_temp.value+"°C";
	localStorage.setItem(global_id + "_temp",input_temp.value);
}
window.onresize = function(){
	var window_height = $("#map").height();
	var window_width = $("#map").width();
	var map_height = $("#img_map").height();
	var map_width = $("#img_map").width();
	if((window_height / map_height) > (window_width / map_width)){
		$("#img_map").width("100%");
		$("#img_map").height("");
	}else{
		$("#img_map").height("100%");
		$("#img_map").width("");
	}
	map_height = $("#img_map").height();
	map_width = $("#img_map").width();
	var map = document.getElementById("map");
	for(i=0;i<itens.length;i++){
		var iten_id = "item_"+itens[i].id;
		$('#'+iten_id).remove();
	}
	load_itens();
}

window.onload = function(){
	var window_height = $("#map").height();
	var window_width = $("#map").width();
	var map_height = $("#img_map").height();
	var map_width = $("#img_map").width();
	if((window_height / map_height) > (window_width / map_width)){
		$("#img_map").width("100%");
		$("#img_map").height("");
	}else{
		$("#img_map").height("100%");
		$("#img_map").width("");
	}
	map_height = $("#img_map").height();
	map_width = $("#img_map").width();
	
};

var ItemController = new itemController();
function load_itens(){
	map_height = $("#img_map").height();
	map_width = $("#img_map").width();
	for(i=0;i<itens.length;i++){
		var iten_id = "item_"+itens[i].id;
		var posX = ((map_width * parseFloat(itens[i].pos_x)) / 100) + "px";
		var posY = ((map_height * parseFloat(itens[i].pos_y)) / 100) + "px";
		var iten_size  = (map_width * parseFloat(itens[i].size)) / 100;
		create_old(iten_id,itens[i].type_name,posX,posY,iten_size,itens[i].status,itens[i].rotation);
	}	
}

$(document).ready(function(){
	$('#map').click(function(){
		temp_menu.style.display = "none";
	});
	$('#map').contextmenu(function(event){
		event.preventDefault();
	});
	ItemController.LoadAllItens(); // Arrumar = não chamar se for um mapa novo (sem imagem)
});

function WebSocketTest(IP,command){
	if ("WebSocket" in window){
		// Let us open a web socket
		var ws = new WebSocket("ws://"+IP+"/");
			
		ws.onopen = function(){
			// Web Socket is connected, send data using send()
			ws.send(command);
		};
		
		ws.onerror = function(evt){
			console.log("Error: "+evt.data+"<br>");
		};
		
		ws.onmessage = function (evt){ 
			var received_msg = evt.data;
			console.log("Message received: "+received_msg+"<br>");
		};
			
		ws.onclose = function(){ 
		};
	}	
	else{
		// The browser doesn't support WebSocket
		alert("WebSocket NOT supported by your Browser!");
	}
}
