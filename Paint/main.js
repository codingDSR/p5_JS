var brushColor; 
var bgColor;
var drawSize;
var penStyle;
var paint;


function _(id){
	return document.getElementById(id);
}
function setup() {
	paint = createCanvas(innerWidth-250,innerHeight);

	brushColor = '#151718';
	bgColor = '#c8c8c8';
	drawSize = 3;
	penStyle = 'pencil';

	_('brushColor').value = brushColor;
	_('bgColor').value = bgColor;
	_('brush').checked = false;
	_('square').checked = false;
	_('eraser').checked = false;
	document.getElementsByTagName('canvas')[0].style.cursor = "crosshair";

	_('brushColor').onchange = function(){
		brushColor = _('brushColor').value;
	};
	_('bgColor').onchange = function(){
		bgColor = _('bgColor').value;
		document.body.style.background = bgColor;
	};
	_('sizeRange').onchange = function(){
		var size = map(_('sizeRange').value,2,20,4,20);
		drawSize = size;
	}

	_('pencil').onchange = function(){
		penStyle = 'pencil';
		_('brush').checked = false;
		_('square').checked = false;
		_('eraser').checked = false;
		document.getElementsByTagName('canvas')[0].style.cursor = "crosshair";
	}
	_('brush').onchange = function(){
		penStyle = 'brush';
		_('square').checked = false;
		_('pencil').checked = false;
		_('eraser').checked = false;
		document.getElementsByTagName('canvas')[0].style.cursor = "crosshair";
	}
	_('square').onchange = function(){
		penStyle = 'square';
		_('brush').checked = false;
		_('pencil').checked = false;
		_('eraser').checked = false;
		document.getElementsByTagName('canvas')[0].style.cursor = "crosshair";
	}
	_('eraser').onchange = function(){
		penStyle = 'eraser';
		_('brush').checked = false;
		_('pencil').checked = false;
		_('square').checked = false;
		document.getElementsByTagName('canvas')[0].style.cursor = "cell";
	}
	
	_('clearCanvas').onclick = function(ev){
		ev.preventDefault();
		if(confirm("Do you want to clear paint")){
			setup();
			document.body.style.background = '#c8c8c8';
		} else {
			return ;
		}
	}
	_('saveCanvas').onclick = function(ev){
		ev.preventDefault();
		saveCanvas(paint,'sketch','png');
		setup();
		document.body.style.background = '#c8c8c8';
	}

	window.onresize = function(){
		document.getElementsByTagName('canvas')[0].style.width = innerWidth-250;
		document.getElementsByTagName('canvas')[0].style.height = innerHeight;
	}
}

function mouseDragged(){
	fill(brushColor);
	stroke(brushColor);
	if(penStyle === 'brush'){
		ellipse(mouseX,mouseY,drawSize,drawSize);
	} else if(penStyle === 'pencil') {
		line(pmouseX,pmouseY,mouseX,mouseY);
	} else if(penStyle === 'square'){
		rect(mouseX,mouseY,drawSize/2,drawSize/2);
	} else if(penStyle === 'eraser'){
		stroke('#c8c8c8');
		fill('#c8c8c8');
		rect(mouseX,mouseY,drawSize/1.2,drawSize/1.2);
	}
}
