// Get all variables
var inputImg = document.getElementById('inputImg');
var map_img = new Image();
var output_img = document.getElementById('output');
var this_map = parseInt(localStorage.getItem('actual_map'));
//

function clear_map(){
	localStorage.removeItem("map"+this_map+"_img");
	location.reload(true);
}
function save_upload(){
	localStorage.setItem("map"+this_map+"_img", getBase64Image(map_img));
	location.reload(true);
}
inputImg.addEventListener('change', function() {
    var file = this.files[0];
    if (file.type.indexOf('image') < 0) {
        //res.innerHTML = 'invalid type';
        return;
    }
    var fReader = new FileReader();
    fReader.onload = function() {
        map_img.src = fReader.result;
		output_img.src = fReader.result;
		map_img.style.display = "none";
    };
    fReader.readAsDataURL(file);
});

function getBase64Image(map_img) {
    var canvas = document.createElement("canvas");
    canvas.width = map_img.width;
    canvas.height = map_img.height;
    
    var ctx = canvas.getContext("2d");
    ctx.drawImage(map_img, 0, 0);
    
    var dataURL = canvas.toDataURL("image/png");
    
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}