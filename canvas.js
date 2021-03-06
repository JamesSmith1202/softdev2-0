var picBox = document.getElementById('picBox');
var shape = document.getElementById('shape');
var canvas = document.getElementById('myCanvas');
var coords = document.getElementById('coords');
var clear = document.getElementById('clear');
var pic=new Array();
var selection = 0;
var mouseX;
var mouseY;
var radius = 10;
var context = canvas.getContext('2d');
var xPrev;
var yPrev;

var changePic = function(e){
    selection = picBox.options[picBox.selectedIndex].value;
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = pic[selection].width;
    canvas.height = pic[selection].height;
    context.drawImage(pic[selection],0,0);
}

var placeDot = function(e){
    var bounds = canvas.getBoundingClientRect();
    mouseX = e.pageX - bounds.left - scrollX;
    mouseY = e.pageY - bounds.top - scrollY;
    context.beginPath();
    if (xPrev != null){
	context.moveTo(xPrev, yPrev);
	context.lineTo(mouseX, mouseY);
	context.stroke();
    }
    context.beginPath()
    if(shape.selectedIndex == 0){
	context.arc(mouseX, mouseY, radius, 0, 2 * Math.PI, false);	
    }
    else{
	mouseX -= 10;
	mouseY -= 10;
	context.rect(mouseX, mouseY, 20, 20)
    }
    xPrev = mouseX;
    yPrev = mouseY;
    context.fillStyle = 'red';
    context.strokeStyle = 'black';
    context.lineWidth = 3;
    context.fill();
    context.stroke();
    coords.value = "["+mouseX+","+mouseY+"]";
}

var preloadImages = function(){
    pic[0]=new Image();
    pic[1]=new Image();
    pic[0].src="http://i0.kym-cdn.com/entries/icons/original/000/016/362/tumblr_nb7jgq9kcR1slfxluo1_1280.jpg";
    pic[1].src= "https://avatars0.githubusercontent.com/u/23638794?s=460&v=4";
    pic[0].onload = function(){
        changePic();
    }
}

var clearScreen = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(pic[selection],0,0);
    xPrev = null;
    yPrev = null;
}

window.onload = preloadImages;
canvas.addEventListener("click", placeDot);
picBox.addEventListener("change", changePic);
clear.addEventListener("click", clearScreen);
