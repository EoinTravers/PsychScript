/*
 * Use the code on this page as a template for your own experiment
*/

// Settings you can vary
var ITI = 500 // Inter Trial Interval
var number_of_trials = 40
var data_address = '../save_data.php' // Page to send results to.
var logging_box_ids = new Array('paradigmBox', 'timeBox', 'subjectBox', 'trialBox', 'stimuliBox', 'probeBox', 'codeBox', 'responseBox', 'rtBox');
var variables_to_log = new Array('paradigm', 'experiment_start_time', 'subject_nr', 'trial_number', 'stimuli_number', 'probe', 'code', 'response', 'rt');
var debug_mode = true // Set as true to show extra information, false to run experiment normally.
var error_feedback = false

// Variables to log
var paradigm = 'press_key';
var experiment_start_time = Date();
var subject_nr = Math.floor(Math.random() * 99999999) + 1; // Pick a random number between 1 and 99999999
var trial_number = 0;
var stimuli_number
var probe
var code
var response
var rt

// Do not change
var random_order = generate_random_list(number_of_trials);
var stim_number = random_order[trial_number];

// Experiment logic - Adjust this as needed
if(debug_mode){
    document.getElementById('hidden_div').style.display = 'Inline'
};

function trial_stage0() {
	deactivate_keyboard_response();
    stimuli_number = random_order[trial_number];
    probe = probes[stimuli_number];
    code = codes[stimuli_number];
    show_fixation(ITI);
    setTimeout(function(){trial_stage1()}, ITI);
};

function trial_stage1() {
    start_time = (Date.now());
    show_text(probe);
    get_keyboard_response('YN');
};
