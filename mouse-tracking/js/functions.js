// Setup Functions
function preload_images(image_names, directory) {
	var image_array = new Array();
	for (var i = 0; i < image_names.length; i++) {
		var img = new Image()
		img.src = directory + image_names[i]
		image_array.push(img)
	};
	return image_array;
};


// Canvas functions and classes

// Classes
// Text
var Text = function(text, scale, y) {
	this.text = text || 'No text given';
	this.scale = scale || 1;
	this.y = y || canvas.height * .5;
};
Text.prototype.draw = function() {
	draw_text(this.text, canvas.width*.5, this.y, font_size*this.scale);
};

//Images (generic)
var Icon = function(label, x, y, img_url) {
	this.x = x || 0;
	this.y = y || 0;
	this.w = pic_w;
	this.h = pic_h;
	this.label = label;
	this.image = new Image();
	//this.image.src = 'images/' + img_url || 'images/no.png'; // should just use the url given
	this.image.src = img_url;
}
Icon.prototype.draw = function() {
	ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
}
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
	this.label = label;
	this.image = new Image();
	this.image.src = img_url;
}
Response.prototype = Object.create(Icon.prototype)
Response.prototype.onclick = function(){
};

// Button image
var Button = function(img_url) {
	this.h = h*.05;
	this.w = this.h * 2;
	this.x = (w*.5)-(this.w*.5); // relative to canvas.width?
	this.y = h-this.h;
	this.image = new Image();
	this.image.src = img_url;
	this.label = img_url.slice(0,-4);
	this.action = function(){pass()};// This function will change throughout the trial
};
Button.prototype = Object.create(Icon.prototype)
Button.prototype.onclick = function(){ // Dynamically change this.action() to modify function of the button.
	this.action();
};

// Functions
var draw_me = new Array();
function update_screen(){
	draw_blank();
	for(var i = 0; i < draw_me.length; i++){
		draw_me[i].draw();
	};
};

function draw_text(text_input, x, y, font_size, color) {
	// Splits text across multiple lines, using '\n'.
	this.text_input = this.text_input || 'No text given';
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
	ctx.fillStyle="GhostWhite";
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

function plot_last(){ // Plots the mouse data from the last trial.
	for (var i=0;i<xList.length;i++)
	{
		ctx.fillStyle="red";
		ctx.fillRect(xList[i], yList[i], 10, 10);
	};
};

function pass() {
	console.log('pass')
};

// Mouse handling
document.onmousemove = function(e){
    mx = e.pageX - canvas.offsetLeft
    my = e.pageY - canvas.offsetTop
    //$('#x').html(mx); // For debugging - Disable for speed
	//$('#y').html(my); // For debugging
};
canvas.onmousedown = function(e){
    mx = e.pageX - canvas.offsetLeft
    my = e.pageY - canvas.offsetTop
    //onsole.log(String(mx)+' '+String(my))
    for(var i = 0; i < clickables.length; i++){
		if(clickables[i].contains(mx, my)){
			clickables[i].onclick()
		};
    };
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

function mousetrack_fixation(next_function, duration) {
	/* Flashes a fixation cross on and off for duration ms, and
	 * then executes next_function (usually the mouse tracking phase).*/
	var pause = duration / 3
	prime_text.text = '';
	draw_me = Array(resp1, resp2, prime_text);
	update_screen();
    timer1 = setTimeout(function(){
		prime_text.text = '+';
		update_screen();
		}, pause);
	timer2 = setTimeout(function(){
		prime_text.text = '';
		update_screen();
		}, pause*2);
	timer3 = setTimeout(function(){
		clearInterval(homeInterval);
		next_function()}, duration);
	homeInterval = setInterval(function(){check_home(next_function, duration)}, 50);
};

function check_home(next_function, duration){
	if(button.contains(mx, my) == false){
		// Stop the scheduled stimuli
		clearInterval(homeInterval);
		clearTimeout(timer1);
		clearTimeout(timer2);
		clearTimeout(timer3);
		alert(early_start_msg);
		mousetrack_fixation(next_function, duration);
	};
};

//~ var ctx
//~ // Create the canvas
//~ function set_up_canvas(w, h)  {
	//~ // Caution: This will return a canvas object, but not the context.
	//~ // Use as follows:
	//~ //	var canvas = set_up_canvas(200, 150);
	//~ //	var ctx = canvas.getContext("2d");
	//~ var canvas = document.getElementById('canvas1')
	//~ canvas.style.marginLeft = "auto";
	//~ canvas.style.marginRight = "auto";
	//~ canvas.style.display = "Block";
	//~ canvas.width = w;
	//~ canvas.height = h;
	//~ //canvas.offsetLeft = window.innerWidth *.25; // is this right?
	//~ ctx = canvas.getContext("2d");
	//~ return(canvas)
//~ };
