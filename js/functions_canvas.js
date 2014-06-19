var canvas = document.getElementById('canvas');

/* Stimuli classes */
// Text
var Text = function(text, scale, y) {
	this.text = text || 'No text given';
	this.font_size = font_size*scale || font_size
	this.y = y || canvas.height * .25;
	this.x = canvas.width*.5
};
Text.prototype.draw = function() {
	draw_text(this.text, this.x, this.y, this.font_size);
};

//Images (generic)
var Icon = function(label, x, y, img_url) {
	this.x = x || 0;
	this.y = y || 0;
	this.w = pic_w;
	this.h = pic_h;
	this.label = label
	this.image = new Image()
	this.image.src = '../images/' + img_url || '../images/Cows.png';
}
Icon.prototype.draw = function() {
	ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
};
Icon.prototype.contains = function(mx, my) {
	return	(this.x <= mx) && (this.x + this.w >= mx) &&
		(this.y <= my) && (this.y + this.h >= my);
};

// Response images
var Response = function(label, x, y, img_url) {
	this.x = x || 0;
	this.y = y || 0;
	this.w = pic_w;
	this.h = pic_h;
	this.label = label
	this.image = new Image()
	this.image.src = '../images/' + img_url || '../images/Cows.png';
}
Response.prototype = Object.create(Icon.prototype)
Response.prototype.onclick = function(){
	console.log("You've clicked "+this.label);
	//track_mouse = false;
	//rt = Date.now() - start_time
	//console.log(rt / xList.length)
	//plot_last();
};
// Button image
var Button = function(img_url) {
	this.h = pic_h * .5;
	this.w = this.h;
	this.x = (w*.5)-(this.w*.5); // relative to canvas.width?
	this.y = h-this.h;
	this.image = new Image();
	this.image.src = '../images/' + img_url || '../images/next.png';
	this.label = img_url.slice(0,-4);
	this.action = function(){pass()};// This function will change throughout the trial
};
Button.prototype = Object.create(Icon.prototype)
Button.prototype.onclick = function(){
	console.log("You clicked the home button")
	this.action();
};

// document functions (continuously handly mouse events)
var click = false; // Tracks if mouse is down or not.
$(document).mousedown(function() {
   click = true;
}).mouseup(function() {
    click = false;  
});

jQuery(document).ready(function(){ // Handle mouse movements
	$(document).mousemove(function(e){
	mx = Math.round(e.pageX - $('canvas').offset().left)
	my = Math.round(e.pageY- $('canvas').offset().top)
	});
})
canvas.onmousedown = function(e){
    if(e.button==2) {// Right click: Bad news!
		console.log('right click')
	};	
    console.log(String(mx)+' '+String(my))
    for(var i = 0; i < clickables.length; i++){
		if(clickables[i].contains(mx, my)){
			clickables[i].onclick()
		};
    };
};

function update_screen(){
	draw_blank();
	for(var i = 0; i < draw_me.length; i++){
		draw_me[i].draw();
	};
};

var ctx
// Create the canvas
function set_up_canvas(w, h)  {
	// Caution: This will return a canvas object, but not the context.
	// Use as follows:
	//	var canvas = set_up_canvas(200, 150);
	//	var ctx = canvas.getContext("2d");
	var canvas = document.getElementById('canvas1')
	canvas.style.marginLeft = "auto";
	canvas.style.marginRight = "auto";
	canvas.style.display = "Block";
	canvas.width = w;
	canvas.height = h;
	//canvas.offsetLeft = window.innerWidth *.25; // is this right?
	ctx = canvas.getContext("2d");
	return(canvas)
};

// Canvas functions
// These are convenience functions, specific to the mouse tracking paradigm
function pass() {
	console.log('pass')
};

function draw_text(text_input, x, y, font_size, color) {
	// Splits text across multiple lines, using '\n'.
	ctx.textAlign = 'center';
	ctx.font= String(font_size)+"px Arial"
	ctx.fillStyle= color || 'black';
	text_lines = text_input.split('\n');
	height = y
	for(var i = 0; i < text_lines.length; i ++) {
		ctx.fillText(text_lines[i], x, height);
		height = height + font_size
	};
};

function draw_blank() {
	ctx.fillStyle=background_color;
	ctx.fillRect(0,0,w,h)
};

function draw_responses() {
	resp1.draw(ctx);
	resp2.draw(ctx);
	button.draw(ctx);
};

function draw_button() {
	button.draw(ctx);
};

function track_mouse() { //N.B Declare var start_time = Date.now() immediately before running.
	t = Date.now() - start_time;
	xList.push(mx)
	yList.push(my)
	tList.push(t) // Instantiate faster?
};

function python_debug() {
	document.getElementById('py_x').innerHTML = xList;
	document.getElementById('py_y').innerHTML = yList;
	document.getElementById('py_t').innerHTML = tList;
};

// Animate Text

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function move(time, target_x, target_y, target_font) {
	start_time = Date.now()
	d_time = time
	//
	start_x = property_hint.x
	d_x = target_x - start_x
	//
	start_y = property_hint.y
	d_y = target_y - start_y
	//
	start_font = property_hint.font_size
	d_font = target_font - start_font
	animloop()
};


function animate_text(text, show_time, move_time){
	property_hint = new Text(text, 7, h*.6)
	draw_blank();
	property_hint.draw()
	setTimeout(function(){move(move_time, w*.5, h*.05, font_size)}, show_time)
};	
	
var property_hint	
var incr
var distance
var start_time
var d_time
var start_x
var d_x
var start_y
var d_y	

function animloop(){
	time_progress = (Date.now() - start_time) / d_time
	property_hint.x = start_x + (d_x * time_progress)
	property_hint.y = start_y + (d_y * time_progress)
	property_hint.font_size = start_font + (d_font * time_progress)
	draw_blank()
	property_hint.draw()
	  if(time_progress < .99){
			requestAnimFrame(animloop);
	  }
	  else{
		  console.log('Arrived!')
	  };  
};
// place the rAF *before* the render() to assure as close to
// 60fps with the setTimeout fallback.

