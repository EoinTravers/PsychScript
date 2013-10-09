// Some important variables we want to keep away from end users
var homeInterval

// Setup Functions



// Canvas functions and classes
// Set up canvas.
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

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
    if(e.offsetX) {
        mx = e.offsetX;
        my = e.offsetY;
    }
    else if(e.layerX) {
        mx = e.layerX;
        my = e.layerY;
    }
};
canvas.onmousedown = function(e){
	if(e.offsetX) {
        mx = e.offsetX;
        my = e.offsetY;
    }
    else if(e.layerX) {
        mx = e.layerX;
        my = e.layerY;
    }
    //console.log(String(mx)+' '+String(my))
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

function check_if_late(maximum_init_time) {
	// Returns true is the mouse was still over the Start button after 
	// maximum_init_time, false otherwise.
	this.maximum_init_time = this.maximum_init_time || max_init_time // Revert to global
	var time_to_check = this.maximum_init_time/sample_rate
	return button.contains(xList[time_to_check], yList[time_to_check])
};

function give_feedback() {
    // Mousetracking specific feedback: no.png if wrong.
    draw_me = Array(resp1, resp2, feedback);
    update_screen();
    feedback_delay = error_pause;
};

function python_debug() {
    document.getElementById('py_x').innerHTML = xList;
    document.getElementById('py_y').innerHTML = yList;
    document.getElementById('py_t').innerHTML = tList;
};

function mousetrack_fixation(duration, previous_function, next_function) {
	/* Flashes a fixation cross on and off for duration ms, and
	 * then executes next_function (usually the mouse tracking phase).*/
	var pause = fixation_length / 3
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
		//clearInterval(homeInterval);
		next_function()}, fixation_length);
	homeInterval = setInterval(function(){check_home(previous_function)}, 50);
};

//function check_home(next_function, duration){
function check_home(previous_function){
	// Raises and alert, and goes back to 'previous_function' uf
	// the mouse has left the button
	if(button.contains(mx, my) == false){
		// Stop the scheduled stimuli
		//
		clearTimeout(timer1);
		clearTimeout(timer2);
		clearTimeout(timer3);
		alert(early_start_msg);
		clearInterval(homeInterval);
		previous_function();
	};
};
