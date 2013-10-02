/*
 * 
 * TO DO:
 * Deal with slow starts, timeouts, and mouse movements before probe onset (either prompt, or control).
 * Randomize response side
*/

// Experiment stuff
var subject_nr = Math.floor(Math.random() * 99999999) + 1;
var sample_rate = 10;
var max_init_time = 800;
var max_response_time = 4000;
var early_start_msg = "Whoah, not so fast!\nPlease don't start moving until you see the final word.";
var late_start_msg = "Good, but remember, you're under time pressure.\n\nPlease try to start moving as soon\
 as you see the final word, even if you're not fully sure of your answer yet.";
var timeout_msg = "Oh no! You ran out of time!\n\nPlease try to answer more quickly.";
var timed_out = false
var property_type
var property_name
var text_list


// Create canvas
var canvas = document.getElementById('canvas1');
canvas.height = window.innerHeight *.9;
canvas.width = canvas.height*1.6; // 4:3 ration
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
var font_size = Math.round(h/25) //  Make relative
var pic_w = w * .2; // Again, looks ok.
var pic_h = pic_w*.75;

/* Stimuli classes */

// The icons we'll need
var target = new Icon('', (w*.5)-(pic_w*.5), (h*.3), 'no.png');
var resp1 = new Response('Yes', 10, 10, 'yes.png');
var resp2 = new Response('No', canvas.width-pic_w-10, 10, 'no.png');
var feedback = new Response('Feedback', (canvas.width*.5)-(pic_w*.5), (canvas.height*.5)-(pic_h*.5), 'no.png');
resp1.image = button_imgs[0];
resp2.image = button_imgs[1];
var prime_text = new Text('Prime text');
var probe_text = new Text('Probe text');
var button = new Button('next.png');
var clickables = new Array(resp1, resp2, button);



// Trial logic
function trial_stage0() { // This will be run automatically once the page has loaded.
	n = trial_order[trial];
	console.log('Trial number: ' + String(trial) + '; Stimuli number: ' + String(n))
	probe_text.text = probes[n];
	prime_text.text = primes[n];
	code = codes[n];
	trial++;
	xList = [];
	yList = [];
	tList = [];
	trial_stage1();
};

function trial_stage1(){
	//console.log('Stage 1')
	button.image.src = 'images/start.png'
	draw_me = Array(resp1, resp2, prime_text, button);
	button.action = function(){mousetrack_fixation(trial_stage2, 1500)}
	update_screen();
};

function trial_stage2() {
	clearInterval(homeInterval);
	draw_me = Array(resp1, resp2, probe_text);
	update_screen();
	resp1.onclick = function(){
		log_response(1)};
	resp2.onclick = function(){
		log_response(2)};
	start_time = Date.now()
	tracking_interval = setInterval(function(){track_mouse();}, sample_rate);
	response_timeout = setTimeout(function(){responseTimeout();}, max_response_time);
};

function check_if_late(maximum_init_time) {
	this.maximum_init_time = this.maximum_init_time || max_init_time // Revert to global
	var time_to_check = this.maximum_init_time/sample_rate
	return button.contains(xList[time_to_check], yList[time_to_check])
};

function responseTimeout() {
	alert(timeout_msg);
	timed_out = true;
	log_response(-1);
};
	
	
// Variables not to change, unless you know what you're doing.
var x;
var y;
var trial = 0;
var trial_order = shuffle(range(0, 48)); // only use first 24 trials.
var response_1;
var response_2;
var target;
var slow_start = false;
var response;
var n; 
xList = new Array();
yList = new Array();
tList = new Array();
// Canvas, etc
//var h = window.innerHeight * .9; // Canvas is 90% of screen height
//var w = h * 1.333; // Aspect ration 4:3
//var canvas = set_up_canvas(w, h);
//document.body.appendChild(canvas);
//var font_size = Math.round(h/30);



// Canvas functions
function log_response(resp) {
	clearInterval(tracking_interval);
	clearTimeout(response_timeout);
	//python_debug(); // For testing only
	//plot_last();
	var correct = true
	console.log(resp)
	if (code == 'aw') {
		if (resp == 2 ) {
			 correct = false
		 };
	}
	else {
		if (resp == 1 ) {
			 correct = false
		 };
	 };
	if (!correct){
		draw_me = Array(resp1, resp2, feedback);
	}
	else {
		draw_me = Array(resp1, resp2);
	};
	update_screen();
	if (check_if_late() &! timed_out){
		alert(late_start_msg)
	};
	timed_out = false
	rt = tList[tList.length-1];
	document.getElementById('timeBox').value = Date();
	document.getElementById('subjectBox').value = subject_nr;
	document.getElementById('trialBox').value = trial;
	document.getElementById('nBox').value = n;
	document.getElementById('responseBox').value = resp;
	document.getElementById('rtBox').value = rt;
	document.getElementById('widthBox').value = canvas.width;
	document.getElementById('heightBox').value = canvas.height;
	document.getElementById('xBox').value = xList;
	document.getElementById('yBox').value = yList;
	document.getElementById('tBox').value = tList;
	sendData("save_data.php");
	if (trial < trial_order.length){
			//console.log('Again!')
			click = false;
			//delay here?
			setTimeout(function(){trial_stage0()}, 500);
		}
	else{
		document.getElementById("endText").style.display = "Block";
		document.getElementById("canvas1").style.display = "None";
		canvas.height = 2;
		//end()
		//alert('End of demo')
	};
};



