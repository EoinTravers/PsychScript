/*
 * 
*/

var debug = false;

// Create canvas
//var canvas = document.getElementById('canvas1'); //  Do this in functions file
canvas.height = window.innerHeight *.95;
canvas.width = canvas.height*1.6; // 4:3 ration
var ctx = canvas.getContext('2d');

// Visual settings
var w = canvas.width;
var h = canvas.height;
var font_size = Math.round(h/25) //  Make relative
var pic_w = w * .2; // Again, looks ok.
var pic_h = pic_w*.75;

// Timing settings
var sample_rate = 10;
var max_init_time = 800;
var max_response_time = 3000;
var fixation_length = 500;


// Experiment variables
var timed_out = false
var property_type
var property_name
var stimuli;
var text_list
var resp;
var response;
if (typeof(localStorage) == 'undefined') {
	var subject_nr = 1000000000000+Math.floor(Math.random() * 99999999) + 1;
	var sona = 10101;
}
else {
var subject_nr = localStorage.subject_nr || 1000000000000+Math.floor(Math.random() * 99999999) + 1;
var sona = localStorage.sona || 10101;
};

var xList = new Array();
var yList = new Array();
var tList = new Array();


// Misc
var response_images;
var homeInterval;
var trial_order = shuffle(range(0, targets.length));
var trial = 0;
var response_1;
var response_2;
var target;
var slow_start = false;
var mx
var my
var current_stage = 0

// The stimuli classes we'll need
var main_text = new Text(text1)
var sub_text = new Text(hint1, .7, canvas.height*.5);
var fix_text = new Text("+", 2, canvas.height*.5);
var target = new Icon('Target', (w*.5)-(pic_w*.5), (h*.3), 'Bears.png');
var resp1 = new Response('Cow', 10, 10, 'Cow.png');
var resp2 = new Response('Bear', canvas.width-pic_w-10, 10, 'Bears.png');
var button = new Button('next.png');

//Overwrite
canvas.onmousedown = function(e){
    if(e.button==2) {// Right click: Bad news!
		console.log('right click')
		
		 //clear_timers();
	}
	else{		
	    console.log(String(mx)+' '+String(my))
	    for(var i = 0; i < clickables.length; i++){
			if(clickables[i].contains(mx, my)){
				clickables[i].onclick()
			};
	    };
	};
};


// When the canvas is clicked, PS will check if the mouse landed on any of
// the items in this array, and execute their .onclick() function.
var clickables = new Array(resp1, resp2, button);
// The contents of this array will be draw whenever update_screen() is called.
var draw_me = new Array();


// Trial logic
function start_trial(trial_number) { // This will be run automatically once the page has loaded.
	// Use this function to define the variables used in this trial.
	// Hack - Clear check_home, if it's not cleared already
	current_stage = 0
	clear_timers();
	stimuli = trial_order[trial_number]; // Next number from randomised list#
	target.label = targets[stimuli].slice(0, -4);
	target.image = target_imgs[stimuli];

	// Empry the mouse data lists from previous trial.
	xList = [];
	yList = [];
	tList = [];
	// Wait a few ms, to make sure everything's finished.
	//setTimeout(function(){trial_stage1();}, 50);
	trial_stage1();
};

function trial_stage1(){
	current_stage = 1
	// Show some text + images, then wait for click on button.
	console.log('Stage 1')
	button.image.src = '../images/start.png'
	draw_me = Array(resp1, resp2, sub_text, button);
	sub_text.text = "Click Start"
	button.action = function(){trial_stage2()}
	update_screen();
	button.draw(); // I shouldn't need to do this.
};

function trial_stage2(){
	current_stage = 2
	// More text, wait for another button click.
	console.log('Stage 2 - Fixation')
	draw_me = Array(resp1, resp2, fix_text);
	update_screen();
	homeInterval = setInterval(function(){check_home()}, 200);
	timer = setTimeout(function(){
		clearInterval(homeInterval);
		trial_stage3();
	}, fixation_length);
};

function check_home(){
	if(button.contains(mx, my) == false){
		// Stop the scheduled stimuli
		clearInterval(homeInterval);
		clearTimeout(timer);
		early_start();
		trial_stage1();
	};
};

function early_start(){
	// Hack - Clear check_home, if it's not cleared already
	if(typeof homeInterval !== "undefined"){
		clearInterval(homeInterval);
	}
	alert(early_start_msg);
};

function trial_stage3() {
	current_stage = 3
	draw_me = Array(resp1, resp2, target);
	update_screen();
	resp1.onclick = function(){
		resp = 1
		log_response(1)
	};
	resp2.onclick = function(){
		resp = 2
		log_response(2)
	};
	start_time = Date.now()
	tracking_interval = setInterval(function(){track_mouse();}, sample_rate);
	response_timeout = setTimeout(function(){responseTimeout();}, max_response_time);
};

var response_map = function(resp) {
	if (resp == 1) {
		return resp1.label
	}
	else if (resp == 2) {
		return resp2.label
	}
	else if (resp == -1) {
		return 'timeout'
	};
};
	

function log_response(resp) {
	resp1.onclick = function(){
	};
	resp2.onclick = function(){
	};
	clearInterval(tracking_interval);
	clearTimeout(response_timeout);
	//python_debug(); // For testing only
	if(debug){
		plot_last();
	}
	else{
		draw_blank()
	};
	if (check_if_late() &! timed_out){
		alert(late_start_msg)
	};
	timed_out = false
	rt = tList[tList.length-1];
	response = response_map(resp)
	document.getElementById('timeBox').value = Date();
	document.getElementById('subjectBox').value = subject_nr;
	document.getElementById('sonaBox').value = sona;
	document.getElementById('trialBox').value = trial;
	document.getElementById('stimuliBox').value = stimuli;
	document.getElementById('responseBox').value = response;
	document.getElementById('respBox').value = resp;
	document.getElementById('rtBox').value = rt;
	document.getElementById('widthBox').value = canvas.width;
	document.getElementById('heightBox').value = canvas.height;
	document.getElementById('xBox').value = xList;
	document.getElementById('yBox').value = yList;
	document.getElementById('tBox').value = tList;
	sendData("save_data.php");
	do_next();
};

function do_next(){
	plot_last();
	trial++;
	if (trial < trial_order.length){
			if (trial == Math.floor(trial_order.length/2)) {
				alert("You're halfway through this part of the experiment\nGood job!")
			};
			console.log('Again!')
			setTimeout(function(){start_trial(trial)}, 500);
		}
	else{
		document.getElementById("endText").style.display = "Inline";
		document.getElementById("canvas1").style.display = "None";
		canvas.height = 2;
		//end()
		//alert('End of demo')
	};
};
