$(document).ready(function(){

});
$(window).load(function(){
	$(".close_map").click(function(){
		var this_map = $(this).parent().index() + 1;
		localStorage.setItem("actual_map",this_map);
		var old_itens = localStorage.getItem("map"+this_map+"_itens");
		if((old_itens != null) && (old_itens != "")){
			var itens = old_itens.split(",");
			for(i=0;i<itens.length;i++){
				var iten_id = itens[i];
				localStorage.removeItem(iten_id + "_x");
				localStorage.removeItem(iten_id + "_y");
				localStorage.removeItem(iten_id + "_status");
				localStorage.removeItem(iten_id + "_size");
				localStorage.removeItem(iten_id + "_rotate");
				localStorage.removeItem(iten_id + "_out");
				if(iten_id.split("_")[0] == "aconditioner"){
					localStorage.removeItem(iten_id + "_temp");
				}
			}
		}
		localStorage.removeItem("map"+this_map+"_itens");
		localStorage.removeItem('map'+this_map+'_img');
		localStorage.removeItem('map'+this_map+'_name');
		var img = document.getElementById('map'+this_map+'_img');
		//img.src = "imagens/add_map.png";
		location.reload();		
	});
});