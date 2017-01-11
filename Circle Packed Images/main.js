var circles = [];
var img;
var loadedImage = false;

function setup(){
	createCanvas(465,600);
}

function draw(){
	background(50);
	if(loadedImage){
		for(var i=0;i<50;i++){
			var obj = genCircle();
			if(obj !== null){
				circles.push(obj);
			} else {
				i--;
			}
		}	
		for(var i=0;i<circles.length;i++){
			if(circles[i].isGrowing){
				if(circles[i].checkBoundry()){
					circles[i].isGrowing = false;
				} else {
					for(var j=0;j<circles.length;j++){
						if(circles[i]!=circles[j]){
							var d = dist(circles[i].x,circles[i].y,circles[j].x,circles[j].y);
							if(d < circles[i].r+circles[j].r){
								circles[i].isGrowing = false;
							}
						}
					}
				}
			}
			circles[i].grow();
			circles[i].display();
	}
}
} 
function Circle(posX,posY,r_,g_,b_,a_) {
	this.x = posX;
	this.y = posY;
	this.r =1;

	this.red = r_;
	this.green = g_;
	this.blue = b_;
	this.alpha = a_;

	this.isGrowing = true;
	this.grow = function(){
		if(this.isGrowing){	
			this.r+=0.1;
		}
	}

	this.checkBoundry = function(){
		 if(this.x+this.r>width||this.x-this.r<0||this.y+this.r>height||this.y-this.r<0) {
		 	return true;
		 } else {
		 	return false;
		 }
	}
	
	this.display = function(){
		noStroke();
		fill(this.red,this.green,this.blue,this.alpha);
		ellipse(this.x,this.y,this.r*2,this.r*2);
	}
}


function genCircle() {
	var x = Math.trunc(random(img.width));
	var y = Math.trunc(random(img.height));
	var valid = true;
	for(var i=0;i<circles.length;i++){
		var d = dist(x,y,circles[i].x,circles[i].y);
		if(d<circles[i].r){
			valid = false;
			break;
		}
	}
	if(valid){
		var index = (x+y*img.width)*4;

		var r = img.pixels[index+0];
		var g = img.pixels[index+1];
		var b = img.pixels[index+2];
		var a = img.pixels[index+3];

		return new Circle(x,y,r,g,b,a);
	} else {
		return null;
	}
}

var imageLoader = document.getElementById('filePhoto');
imageLoader.addEventListener('change', handleImage, false);
function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        img = loadImage(event.target.result,function(){
  			img.loadPixels();
  			loadedImage = true;
  			resizeCanvas(img.width,img.height);
  			document.getElementsByTagName('canvas')[0].style.display = "block";
  			document.getElementsByClassName('uploader')[0].style.display = "none";
  		});
    }
    reader.readAsDataURL(e.target.files[0]);
}
document.getElementsByClassName('uploader')[0].style.lineHeight = innerHeight-10+'px';