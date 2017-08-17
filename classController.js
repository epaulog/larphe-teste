var mapController = function(){
	this.getActualMap = function(callback){
		$.ajax({
			dataType: "json",
			method: "post",
			url: "mapController.php",
			data:{action: "getActualMap"},
			success: function(dado) {
				console.log(dado);
				if(callback && typeof(callback) == 'function'){ 
					callback(dado);
				}
			},
			error: function(msg, msg2, msg3){

				console.log(msg);
				console.log(msg2);
				console.log(msg3);
			}
		});
	}
	this.updateMap = function(map, callback){
		$.ajax({
			dataType: "json",
			method: "post",
			url: "mapController.php",
			data:{action: "updateMap", map: map},
			success: function(dado) {
				console.log(dado);
				if(callback && typeof(callback) == 'function'){ 
					callback(dado);
				}
			},
			error: function(msg, msg2, msg3){
				console.log(msg);
				console.log(msg2);
				console.log(msg3);
			}
		});
	}
}// classe MapController

var itemController = function(){
	itens = [];
	this.LoadAllItens = function(){
		$.ajax({
			dataType: "json",
			method: "post",
			url: "itens.php",
			data:{action: "read_itens"},
			success: function(dado) {
				itens = dado;
				load_itens();
			},
			error: function(msg, msg2, msg3){
				itens = [];
				console.log(msg);
				console.log(msg2);
				console.log(msg3);
			}
		});
	}
	this.EraseAllItens = function(){

	}
	this.DeleteItem = function(item_id){
		$.ajax({
			dataType: "json",
			method: "post",
			url: "itens.php",
			data:{action: "del_item", id: item_id},
			success: function(dado) {
				console.log(dado);
			},
			error: function(msg, msg2, msg3){
				itens = [];
				console.log(msg);
				console.log(msg2);
				console.log(msg3);
			}
		});
	}
	this.SaveItem = function(item){
		var json_item = JSON.stringify(item);
		$.ajax({
			dataType: "json",
			method: "post",
			url: "itens.php",
			data:{action: "save_item", item: json_item},
			success: function(dado) {
				console.log(dado);
			},
			error: function(msg, msg2, msg3){
				itens = [];
				console.log(msg);
				console.log(msg2);
				console.log(msg3);
			}
		});
	}
	this.CreateItem = function(item, callback){
		var json_item = JSON.stringify(item);
		$.ajax({
			dataType: "json",
			method: "post",
			url: "itens.php",
			data:{action: "create_item", item: json_item},
			success: function(dado) {
				console.log(dado);
				if(callback && typeof(callback) == 'function'){ 
					callback(dado.id);
				}
			},
			error: function(msg, msg2, msg3){
				itens = [];
				console.log(msg);
				console.log(msg2);
				console.log(msg3);
			}
		});
	}
}// classe ItemController