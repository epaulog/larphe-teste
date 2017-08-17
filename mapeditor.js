var offset_data; //Global variable as Chrome doesn't allow access to event.dataTransfer in dragover
var global_id;
var default_size = 128;
var default_x = 100;
var default_y = 100;
var default_temp = 24;
var new_size;
var mouseX_menu = "";
var mouseY_menu = "";
var actual_map;
var percent_size;
var available_ios = new Array();
var save_item = new Object();
var map = document.getElementById("map");
//map.setAttribute("draggable","false");
map.addEventListener('dragover',drag_over,false); 
map.addEventListener('dragend',drop,false);
map.addEventListener('drop',drop,false);
var itens = new Array();
var drag_function = "";
var logo = document.getElementById("logo");
var offsettop = parseInt(logo.offsetHeight,10) + 2; // altura da imagem logo mais 2 da borda do header
var ItemController = new itemController();
var MapController = new mapController();
var timeSaveItem = {timer: null, item: { id: ""}};

function drag_start(event) {
	var iten = event.target;
	var iten_id = iten.id;
	select_id(iten_id);
	save_item = {};
	var posX = parseInt(iten.style.left,10);
	var posY = parseInt(iten.style.top,10);
	var mouseX = parseInt(event.clientX,10);
	var mouseY = parseInt(event.clientY,10);
    offset_data = (posX - mouseX)+','+(posY - mouseY);
	event.dataTransfer.setData("text/plain",offset_data);
	var drag_image = new Image();
	event.dataTransfer.setDragImage(drag_image,0,0); // nenhuma imagem 
}
function drag_over(event) { 
    var offset;
	var iten_id = global_id;
	var drag_item = $("#"+iten_id);
	var item_position = drag_item.position();
	var posX = parseInt(item_position.left,10);
	var posY = parseInt(item_position.top,10);
	var mouseX = parseInt(event.clientX,10);
	var mouseY = parseInt(event.clientY,10);
	var map_height = $('#img_map').height();
	var map_width = $('#img_map').width();
	try{
		offset = event.dataTransfer.getData("text/plain").split(',');
	}
	catch(erro){
		offset = offset_data.split(',');
	}
	if(offset == ""){ // caso o "dataTransfer.getData" no 'try' não tenha dado erro mas mesmo assim não carregou os dados na variável
		offset = offset_data.split(',');
	}
	save_item.id = global_id.split("_")[1];
	if(drag_function == "resize"){
		if((mouseY - posY) <= (mouseX - posX)){
			new_size = mouseX - posX + 5;
		}
		else{
			new_size = mouseY - offsettop - posY + 5;
		}
		if(new_size<20){ // limita tamanho minimo da peça em 50px
			new_size = 20;
		}
		drag_item.height(new_size);
		drag_item.width(new_size);
		var percent_size = ((new_size/map_width)*100)+"%";		
		save_item.size = ((new_size/map_width)*100);
	}
	else{ // drag normal
		var new_posX = mouseX + parseInt(offset[0],10);
		var new_posY = mouseY + parseInt(offset[1],10);
		
		if(new_posX < 0) new_posX = 0; // impede que a peça saia pra fora da tela
		if(new_posY < 0) new_posY = 0;
		if((new_posX+drag_item.width())  > map_width)  new_posX = map_width  - drag_item.width();
		if((new_posY+drag_item.height()) > map_height) new_posY = map_height - drag_item.height();
		
		drag_item.offset({top:new_posY+offsettop, left:new_posX});
	}
    event.preventDefault();
    return false;
} 
function drop(event) { 
    var offset;
	var iten_id = event.target.id;
	var drag_item = $("#"+iten_id);
	var item_position = drag_item.position();
	var posX = parseInt(item_position.left,10);
	var posY = parseInt(item_position.top,10);
	try{
		offset = event.dataTransfer.getData("text/plain").split(',');
	}
	catch(erro){
		offset = offset_data.split(',');	
	}
	if(offset == ""){
		offset = offset_data.split(',');
	}

	var map_height = $('#img_map').height();
	var map_width = $('#img_map').width();
	save_item.id = global_id.split("_")[1];
	if(drag_function == "resize"){

	}else{
		var percent_x = ((posX/map_width)*100)+"%";	
		var percent_y = ((posY/map_height)*100)+"%";
		save_item.pos_x = ((posX/map_width)*100);
    	save_item.pos_y = ((posY/map_height)*100);
	}
	
	drag_function = 0;
    event.preventDefault();
	if(timeSaveItem.item.id == global_id.split("_")[1]){
		clearTimeout(timeSaveItem.timer);
	} else {
		timeSaveItem.timer = setTimeout(function(){
	    	console.log(timeSaveItem.item.id);
	    	ItemController.SaveItem(timeSaveItem.item);
	    	timeSaveItem.item.id == "";
	    },3000);
	}
	timeSaveItem.item = save_item;
    //ItemController.SaveItem(timeSaveItem.item);
    //console.log(timeSaveItem.timer);    
    return false;
}
function load_itens(){
	map_height = $("#img_map").height();
	map_width = $("#img_map").width();
	for(i=0;i<itens.length;i++){
		var iten_id = "item_"+itens[i].id;
		var posX = ((map_width * parseFloat(itens[i].pos_x)) / 100) + "px";
		var posY = ((map_height * parseFloat(itens[i].pos_y)) / 100) + "px";
		var iten_size  = (map_width * parseFloat(itens[i].size)) / 100;
		create_item(iten_id,itens[i].type_name,posX,posY,iten_size,itens[i].status,itens[i].rotation);
		//create_item(iten_id,posX,posY,iten_size,iten_status,rotate)
	}	
}

function create(item_type){ // Criando novo Item
	map_height = $("#img_map").height();
	map_width = $("#img_map").width();
	var newItem = {};
	var percent_x = ((default_x/map_width)*100);	
	var percent_y = ((default_y/map_height)*100);
	var percent_size = ((default_size/map_width)*100);	
	newItem.pos_x = percent_x
	newItem.pos_y = percent_y;
	newItem.size = percent_size;
	newItem.status = "off";
	newItem.rotation = 0;
	newItem.map_id = actual_map;
	newItem.type = 1;
	if(item_type == "aconditioner"){
		newItem.temp = default_temp;
	}
	
	ItemController.CreateItem(newItem, function (id){
		create_item("item_"+id,item_type,default_x+"px",default_y+"px",default_size,"off",0);
		newItem.id = id;
		newItem.type_name = item_type;
		itens.push(newItem);
		select_id("item_"+id);
	});
}
function new_iten(item_type){
	var new_posX = mouseX_menu-(default_size/2);
	var new_posY = mouseY_menu-(default_size/2);
	
	map_height = $("#img_map").height();
	map_width = $("#img_map").width();
	var newItem = {};
	var percent_x = ((new_posX/map_width)*100);	
	var percent_y = ((new_posY/map_height)*100);
	var percent_size = ((default_size/map_width)*100);	
	newItem.pos_x = percent_x
	newItem.pos_y = percent_y;
	newItem.size = percent_size;
	newItem.status = "off";
	newItem.rotation = 0;
	newItem.map_id = actual_map;
	newItem.type = 1;
	if(item_type == "aconditioner"){
		newItem.temp = default_temp;
	}
	
	ItemController.CreateItem(newItem, function (id){
		create_item("item_"+id,item_type,new_posX+"px",new_posY+"px",default_size,"off",0);
		newItem.id = id;
		newItem.type_name = item_type;
		itens.push(newItem);
		select_id("item_"+id);
	});
}
function create_item(iten_id,item_type,posX,posY,iten_size,iten_status,rotate){
	var new_iten = document.createElement("div");
	var map = document.getElementById("map");
	map.appendChild(new_iten);
	new_iten.setAttribute("id",iten_id);
	new_iten.setAttribute("class",item_type+" "+item_type+"_"+iten_status);
	new_iten.setAttribute("draggable","true");
	new_iten.setAttribute("oncontextmenu","open_menu(event); return false;");
	new_iten.setAttribute("onclick","select_id(this.id)");
	new_iten.setAttribute("style","left: "+posX+"; top: "+posY+"; height:"+iten_size+"px; width:"+iten_size+"px; transform: rotate("+rotate+"deg);" );
	new_iten.addEventListener('dragstart',drag_start,false);
	new_iten.addEventListener("mousemove", mouseOver);
	new_iten.addEventListener("mouseout", mouseOut);
	var map_height = $('#img_map').height();
	var map_width = $('#img_map').width();
	var percent_x = ((posX/map_width)*100)+"%";	
	var percent_y = ((posY/map_height)*100)+"%";
	var percent_size = ((iten_size/map_width)*100)+"%";	
	
}
function copy_iten(){
	var item_type = global_id.split("_")[0];
	var iten = document.getElementById(global_id);
	var iten_id = new_id(item_type); // retorna um ID novo do tipo requerido
	itens.push(iten_id); // adiciona o new_iten id no array
	var iten_size = iten.offsetWidth;
	var posX = parseInt(iten.style.left,10) + iten_size;
	var posY = parseInt(iten.style.top,10);
	var rotate = localStorage.getItem(global_id+ "_rotate");
	var iten_status = localStorage.getItem(global_id+ "_status");
	create_item(iten_id,posX,posY,iten_size,iten_status,rotate);
	//localStorage.setItem(actual_map+"_itens",itens);
	if(iten_id.split("_")[0] == "aconditioner"){
		var temperature = localStorage.getItem(global_id+ "_temp");
		localStorage.setItem(iten_id + "_temp", temperature);
	}
	select_id(iten_id);	
}
function new_id(item_type){
	n_itens=1;
	while(localStorage.getItem(item_type+"_"+n_itens+"_x") != null){ //Equanto existir um item com o mesmo ID 
		n_itens++; // soma a variavel numérica
	}
	return item_type +"_"+ n_itens;
}
function mouseOver(event) {
	var iten = event.target;
	var posX = parseInt(iten.style.left,10);
	var posY = parseInt(iten.style.top,10);
	var iten_size = iten.offsetWidth;
	var mouseX = parseInt(event.clientX,10);
	var mouseY = parseInt(event.clientY,10) - offsettop;
	if((mouseX >= (posX + iten_size - 5)) && (mouseY >= (posY + iten_size - 5))){
		// se o mouse está no canto inferior direito de um item com flexibildade de 5px
		iten.style.cursor = "se-resize";
		drag_function = "resize";
	}
	else{
		iten.style.cursor = "default";
	}
	if((mouseX < (posX + iten_size - 5)) && (mouseY < (posY + iten_size - 5))){
		drag_function = 0;
	}
}
function mouseOut(e) {
	//drag_function = "";
}
function select_id(iten_id){
	$("#"+global_id).removeClass("selected");
	global_id = iten_id;
	$("#"+global_id).addClass("selected");
	if(iten_id == ""){
		$(".item_menu").hide();
	}else{
		$(".item_menu").show();		
	}
	document.getElementById("info").innerHTML = "Selected Iten: "+global_id;
	var menu = document.getElementById("context_menu");
	menu.style.display = "none";
	var map_context_menu = document.getElementById("map_context_menu");
	map_context_menu.style.display = "none";
}
function delete_iten(){
	var dm = document.getElementById(global_id);
	var map = document.getElementById("map");
	map.removeChild(dm);

	ItemController.DeleteItem(global_id.split("_")[1]);
	itens.splice(itens.indexOf(global_id), 1); // deleta o id do array.
	
	select_id("");
}
function rotate_iten(){
	var rotacao = document.getElementById(global_id)['style']['transform'].substring(7, 10);
	save_item = {};
	save_item.id = global_id.split("_")[1];
	rotacao = parseInt(rotacao,10);
	if(rotacao == null || rotacao == ""){
		rotacao = 90;
	}
	else{
		rotacao = parseInt(rotacao,10) + 90;
	}
	if(rotacao == 360){
		rotacao = 0;
	}
	save_item.rotation = rotacao;
	ItemController.SaveItem(save_item);
	var item = document.getElementById(global_id);
	item.style.transform = "rotate("+rotacao+"deg)";
}
function config_iten(){
	var $select = $("#config_popup select");
	$("#config_popup option").remove();
	$("#config_div").show('fast');
	$select.append("<option value='0'>N/A</option>");
	for(i=0;i<available_ios.length;i++){
		var controller_name = localStorage.getItem(available_ios[i].split("_")[0]+"_name");
		var out = available_ios[i].split("_")[1];
		$select.append("<option value="+available_ios[i]+">"+controller_name+" "+out+"</option>");
	}
	if(localStorage.getItem(global_id+"_out") != null && localStorage.getItem(global_id+"_out") != ""){
		$("option[value="+localStorage.getItem(global_id+"_out")+"]").attr('selected','selected');
	}
}
function save_config(){
	var output = $("#config_popup select").val();
	localStorage.setItem(global_id+ "_out",output);
	$("#config_div").hide('fast');
	select_id("");
}
function open_menu(event){
	iten_id = event.target.id;
	select_id(iten_id);
	item = document.getElementById(iten_id);
	document.getElementById("info").innerHTML = "Selected Iten: "+global_id;
	var menu = document.getElementById("context_menu");
	menu.style.display = "block";
	menu.style.left = event.clientX + "px";
	menu.style.top = event.clientY - offsettop + "px";
}
function clear_map(){
	var j = itens.length;
	if(confirm("Delete all itens?")){
		for(i=0;i<j;i++){
			select_id(itens[0]);
			delete_iten();
		}
	}
}
map.oncontextmenu = function(event){
	mouseX_menu = parseInt(event.clientX,10);
	mouseY_menu = parseInt(event.clientY,10) - offsettop;
	if(event.target.id == this.id){
		var context_menu = document.getElementById("context_menu");
		context_menu.style.display = "none";
		var map_context_menu = document.getElementById("map_context_menu");
		map_context_menu.style.display = "block";
		map_context_menu.style.left = mouseX_menu + "px";
		map_context_menu.style.top = mouseY_menu + "px";
	}	
	event.preventDefault();
}

function open_upload(){
	$("#upload_div").show('fast');
	$("#upload_popup form")[0].reset();
	//var oldImage = localStorage.getItem(actual_map+'_img');
	if(oldImage == null){ // se não tiver image no LocalStorage
		output_img.src = "imagens/noimage.png";
	}else{
		output_img.src = "data:image/png;base64," + oldImage;
	}
}
function editname(){
	var map = {};
	map.id = actual_map;
	map.name = $("#map_name").val();
	MapController.updateMap(map);
	//localStorage.setItem(actual_map+"_name",$("#map_name").val());
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
};
window.onload = function(){
	$("#map").click(function(e){ 
		if(e.target.id == "map"){
			select_id("");
		}
	});
	$(".menu").mouseover(function(){
		$(this).children(".menu_dropdown").slideDown('fast');
	});
	$(".menu").mouseleave(function(){
		$(this).children(".menu_dropdown").hide();
	});
	$(".map_menu").mouseover(function(){
		$(this).children(".map_menu_dropdown").css('display','inline-flex');
	});
	$(".map_menu").mouseleave(function(){
		$(this).children(".map_menu_dropdown").hide();
	});
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
}
$(document).ready(function(){
	MapController.getActualMap(function(map_id){
		actual_map = map_id;
	});
	
	var img = document.getElementById('img_map');
	if(img.src == "maps/noimage.png"){ // se não tiver image		
		$('#newItem_button').parent().hide();
		$('#map_newItem_button').parent().hide();
		$('.clearMap_button').parent().hide();
		
	}else{
		ItemController.LoadAllItens();
	}
	$(window).keydown(function(event){
		if(global_id != ""){
			var drag_item = $("#"+global_id);
			var iten_width = $("#"+global_id).width();
			var map_height = $("#img_map").height();
			var map_width = $("#img_map").width();
			var item_position = drag_item.position();
			var posX = parseInt(item_position.left,10);
			var posY = parseInt(item_position.top,10);
			if(event.keyCode == 46) { // delete
				delete_iten();
			}
			else if(event.keyCode == 40 && posY + iten_width < map_height) { // down
				drag_item.offset({top:posY + offsettop +1, left:posX});
			}
			else if(event.keyCode == 39 && posX + iten_width < map_width) { // right
				drag_item.offset({top:posY + offsettop, left:posX + 1});
			}
			else if(event.keyCode == 38 && posY > 0) { // up
				drag_item.offset({top:posY + offsettop -1, left:posX});
			}
			else if(event.keyCode == 37 && posX > 0) { // left
				drag_item.offset({top:posY + offsettop, left:posX - 1});
			}
			else if(event.keyCode == 32) { // space = rotate
				rotate_iten();
			}
		}
	});
});