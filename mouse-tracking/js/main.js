// Experiment stuff
// Parameters
var sample_rate = 10;
var max_init_time = 800;
var max_response_time = 4000;
var early_start_msg = "Whoah, not so fast!\nPlease don't start moving until you see the final word.";
var late_start_msg = "Good, but remember, you're under time pressure.\n\nPlease try to start moving as soon\
 as you see the final word, even if you're not fully sure of your answer yet.";
var timeout_msg = "Oh no! You ran out of time!\n\nPlease try to answer more quickly.";
var number_of_trials = probes.length
var data_address = 'save_data.php'

var error_feedback = true
// If using error_feedback, you need to define the possible codes, and 
// the correct response for each.
var list_of_codes = new Array('common_word', 'rare_word','pseudo_word', 'consonants');
var correct_responses = new Array(1, 1, 2, 2);


// Variables to record
var experiment_start_time = Date();
var subject_nr = Math.floor(Math.random() * 99999999) + 1; // Pick a random number between 1 and 99999999
var probe
var code
var response
var rt
var xList = new Array(); // Mouse tracking coordinates (x, y, and time)
var yList = new Array();
var tList = new Array();
var trial_number // Trials in chronological order
var stimuli_number // ID of the stimuli used in this trial
var w // Canvas dimensions
var h

// List of variables to record
var variables_to_log = new Array(
	'experiment_start_time', 'subject_nr', 'probe', 'code', 'response', 'rt', 
	'xList', 'yList', 'tList', 'trial_number', 'stimuli_number', 'w', 'h'
	);
// The HTML IDs of the text boxes where each variable will be recorded. (see #DOCUMENTATION#)
// These MUST be in the same order as variables_to_log, above.
var logging_box_ids = new Array(
	"timeBox", "subjectBox", "probeBox", "codeBox", "responseBox", "rtBox", "xBox",
	"yBox", "tBox", "trialBox", "stimuliBox", "widthBox", "heightBox"
	);


//  Canvas settings
canvas.height = window.innerHeight *.9;
canvas.width = canvas.height*1.6; // Aspect ratio
w = canvas.width;
h = canvas.height;
var font_size = Math.round(h/25) //  Size of text, relative to screen
var pic_w = w * .2; // Default dimensions of icons.
var pic_h = pic_w*.75;

// Some important variables. Do not change.
var trial_order = shuffle(range(0, number_of_trials));
var timed_out = false
var slow_start = false;
var mx;
var my;
var draw_me = new Array(); // A list of things to draw when the screen is updated.


/* Stimuli classes */

// The icons we'll need
/*
 * Here, we create the objects that participants interact with in the experiment,
 * in based on some templates.
 * An Icon is the most basic kind of image: it is pic_w wide, pic_h tall, and does nothing.
 * Here, we create one Icon, called target, which can appear in the middle of the screen.
 * Icons need 4 parameters: a label, the x coordinate of their left edge, the y coordinate
 * of their top edge, and and URL of the image they show.
 * Here, we label the Icon 'Target', place it half way across the screen (minus half it's width,
 * so that it actually ends up in the middle), similarly center it vertically, and give it
 * the image stored in 'images/no.png'.
 * Although we won't be using this Icon in the Lexical Decision Task, we will use an identical one,
 * called Feedback, to display a Cross when participants give a wrong answer.
 * 
 * We will also create our two Responses, resp1 and resp2.
 * Responses work exactly like Icons, except that they can be made execute a function when clicked.
 */ 
var target = new Icon('Target', (w*.5)-(pic_w*.5), (h*.5), 'images/no.png');
var feedback = new Icon('Feedback', (canvas.width*.5)-(pic_w*.5), (canvas.height*.5)-(pic_h*.5), 'images/no.png');
var resp1 = new Response('Yes', 10, 10, 'images/yes.png');
var resp2 = new Response('No', canvas.width-pic_w-10, 10, 'images/no.png');
//resp1.image = button_imgs[0];
//resp2.image = button_imgs[1];
/* Another kind of object is Text.
 * All we do now is create the objects, and give them their default text.
 * Later, we can change this text, and show it onscreen.
 * Finally, a Button is like an Icon, but smaller, and always shown in the
 * bottom center of the screen.
 */
var prime_text = new Text('Click START to begin.'); 
// Our prime in this case is just the fixation cross, but you must always create it.
var probe_text = new Text('Probe text');
var button = new Button('images/next.png');
// clickables is a list of objects which, when clicked on, will do something
// (activate their 'action').
var clickables = new Array(resp1, resp2, button);



// Trial logic
function trial_stage0() {
	// Set up variables for the trial to come
	stimuli_number = trial_order[trial_number];
	console.log('Trial number: ' + String(trial_number) + '; Stimuli number: ' + String(stimuli_number))
	probe = probes[stimuli_number];
	probe_text.text = probe
	code = codes[stimuli_number];
	trial_number++; // Increase trial_number by one, to keep track.
	// Clear the mouse data.
	xList = [];
	yList = [];
	tList = [];
	// Proceed to the next stage.
	trial_stage1();
};

function trial_stage1(){
	button.image.src = 'images/start.png'
	draw_me = Array(resp1, resp2, prime_text, button);
	// Set the button to, when clicked, show a fixation for 1500ms, then
	// run trial stage 2.
	button.action = function(){mousetrack_fixation(trial_stage2, 1500)}
	update_screen();
	// Nothing will now happen until the button is clicked.
};

function trial_stage2() {
	clearInterval(homeInterval); // DO NOT REMOVE
	// While the fixation is showing, moving the mouse will reset the trial
	// to the start. clearInterval prevents this.
	draw_me = Array(resp1, resp2, probe_text); // Show the probe_text.
	update_screen();
	// Make the response buttons do something.
	resp1.onclick = function(){
		response = 1
		log_response()};
	resp2.onclick = function(){
		response = 2
		log_response()};
	// Start the timer - ALWAYS DO THIS
	start_time = Date.now()
	// Schedule the mouse to be recorded every 'sample_rate' ms (defined avove)
	tracking_interval = setInterval(function(){track_mouse();}, sample_rate);
	// Set the trial to time out after 'max_response_time' ms (again, defined above)
	// Note, you must set some timeout, although you can make it as long as you wish.
	response_timeout = setTimeout(function(){responseTimeout();}, max_response_time);
};

function responseTimeout() { // Consider moving to functions?
	// What to do if trial times out.
	// By default, shows timeout_msg in a popup window, and records a response of -1
	alert(timeout_msg);
	//timed_out = true;
	response = -1
	log_response();
};
