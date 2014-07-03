/*
    This page is part of PsychScript
    Copyright (C) 2013 Eoin Travers etravers01@qub.ac.uk.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
 * This page consists of generic functions, that should be useful in a 
 * range of paradigms. As such, we would hope to shield the end user from
 * the actual code here, and just provide some idea of what functions should
 * be called in the main.js section of their own experiment.
*/


// Running variables - Defined here so the user doesn't have to deal with them.
/* Ideally, the user would define these themselves, and maybe it would
 * be better practice, but for now they're defined here, so that the experiment
 * will still work.
 */

var trial_number = 0;
var stimuli_number;
var start_time;
var response;
var rt;
var prime;
var probe;
var accepted_keys;
var feedback_delay;

// Functions
// Visuals

/* These are really just shortcuts - short oneliners to
 * replace longer, more complex oneliners, but at the expensive of
 * flexability.
 * 
 * TO DO - Document how users can create their own visual functions
 */
 
function hide_element(id){
    document.getElementById(id).style.display = 'None';
}
function show_element(id){
    document.getElementById(id).style.display = 'Block';
    //Should this be inline?
}

function show_text(text) {
    document.getElementById('probeText').innerHTML = text;
};
function show_above(text) {
    document.getElementById('textAboveProbe').innerHTML = text;
};
function show_below(text) {
    document.getElementById('textBelowProbe').innerHTML = text;
};


function show_image(locationID, src) {
    var this_image = document.getElementById(locationID)
    this_image.src = '../images/' + src;
    this_image.style.display = 'Block';
};
function hide_images(){
    // This was written for a specific experiment - needs to be made general purpose
    document.getElementById('img1').style.display = 'None';
    document.getElementById('img2').style.display = 'None';
    document.getElementById('img3').style.display = 'None';
};
function show_fixation(duration, flash, id) {
    /*Shows a fixation cross in element `id` for the given duration.
     * Dy default, shows for the whole duration, but can optionally
     * show blank, fixation, and blank again, for 1/3 of the duartion each.
     * If `id` is not given, it defaults to `probeText`, which should
     * be fine for most cases.
     */
    var flash = flash || false;
    var id = id || 'probeText';
    if (flash) {
    	var pause = duration / 3
		show_text('')
		setTimeout(function(){show_text('+')}, pause)
		setTimeout(function(){show_text('')}, pause*2)
    }
    else {
		show_text('+');
    };
};

// Response handling
function get_keyboard_response(keys_to_accept) {
    /* 'Turn on' the keyboard, so that, on a keystroke,
     * the experiment will check if the key is one of the ones
     * expected (if any are supplied, otherwise it will accept any key),
     * and log that key as the response.
     */
    accepted_keys = keys_to_accept
    document.onkeydown = function(event) {
	var key = String.fromCharCode(event.keyCode)
	if(accepted_keys == undefined) {
	    response = key
	    log_response()
	}
	else {
	    var key //= String.fromCharCode(event.keyCode)
	    if (accepted_keys.indexOf(key) != -1) {
		response = key
		log_response()
		//return response
	    }
	    else if (accepted_keys.indexOf(key.toLowerCase()) != -1) {
		// In case acccepted_keys were given in lowercase.
		response = key
		log_response()
		//return response
	    };
	};
    };
};

function deactivate_keyboard_response(){
    // Self explanatory really
    document.onkeydown = function(){}
};

function activate_response_buttons(list_of_button_ids) {
    // 'Turn on' all of the buttons id'd, so that on being
    // clicked, they call `log_response` with their value as
    // `response`.
    for (var i=0; i < list_of_button_ids.length; i++)  {
	var button = document.getElementById(list_of_button_ids[i]);
	console.log(i+button)
	button.onclick = function(){
	    response = this.innerHTML
	    log_response();
	};
    };
};

function deactivate_response_buttons(list_of_button_ids) {
    // Does what it says.
    for (var i=0; i < list_of_button_ids.length; i++)  {
	var button_id = list_of_button_ids[i]
	document.getElementById(button_id).onclick = function(){};
    };
};

// Experiment logic
function begin_experiment() {
    // Users can of course override these functions, but these are
    // useful defaults.
    create_logging_form(variables_to_log); // See function below   
    document.getElementById('instructions').style.display = "None"; // Hide instructions
    document.getElementById('experiment').style.display = "Inline"; // Show exp. body.
    trial_stage0() // Run first trial.
};

function end_experiment() {
	document.getElementById('experiment').style.display = "None";
	document.getElementById('debrief').style.display = "Inline";
};


// Logging
function create_logging_form(variables_list, formID) {
    /*
     * This takes a list of variables, and creates, within `formID`, 
     * a text box for each, id'd `variablenameBox`, and named `variablenameOut`
     * (this name is used by the logging script on the server).
     * After each trial, each variable in `variables_list` will be written
     * to it's appropriate box, and the form will be submitted to the server
     * via AJAX, by `log_response()`.
     */
    var formID = formID || 'responseForm'; // This shouldn't need to be changed. 
    var form = document.getElementById(formID);
    for(var i=0; i < variables_list.length; i++){
	var variable = variables_list[i]
	var label = document.createTextNode(variable);
	var inp = document.createElement("input");
	inp.setAttribute('id', variable+'Box');
	inp.setAttribute('name', variable+'Out');
	var line = document.createElement('br');
	form.appendChild(label);
	form.appendChild(inp);
	form.appendChild(line);
    };
};



function log_response() {
    rt = Date.now() - start_time;
    // If they exit, clear intervals and timeouts.
    try {clearInterval(tracking_interval);} catch(err){};
    try {clearTimeout(response_timeout);} catch(err){};
    feedback_delay = 0 // Leave at 0 until implemented
    if(error_feedback) {
	// Not fully implemented yet
	var correct = check_accuracy()
	console.log(correct)
	if (!correct) {
	    give_feedback()
	};
    };
    console.log('Logging response: '+ response)
    for (var i=0; i < variables_to_log.length; i++) {
	// Loop through `variables_to_log`, and write each
	// variable to the approriate text box.
	var variable_to_log = variables_to_log[i];
	var logging_box_id = variable_to_log + 'Box';
	console.log(logging_box_id)
	document.getElementById(logging_box_id).value = window[variable_to_log]
	// `window['variable'] is the only way I know of using a string of
	// a variables name in place of the actual variable.
    };
    sendData(data_address);
    setTimeout(function(){next_trial();}, feedback_delay)
};



function next_trial(){
    // Start next trial, if `trial_number` hasn't exceeded `number_of_trials`.
    // Bad things will happen if neither variable is defined.
    // `trial_number` is a built-in variable - no other label should be used.
    if (trial_number < number_of_trials) {
	trial_number++ 
	trial_stage0()
    }
    else {
	end_experiment();
    };
};

function sendData(address){ // POSTs data in responseForm to the address given.
    $.ajax({
	    type: "POST",
	    url: address, // I'm not sure this actually does anything,
	    // as the address is hard-coded in the html of `responseForm`.
	    data: $("#responseForm").serialize(), // serializes the form's elements.
	    success: function(data)
	    {
	       console.log('data sent')
	    }
    });
};
		
// The next two functions aren't fully implemented yet,
// but can be utilized at the user's own risk.
function check_accuracy() {
    var codes_index = list_of_codes.indexOf(code);
    var correct_response = correct_responses[codes_index]
    console.log('Correct')
    console.log(correct_response)
    console.log('Given')
    console.log(response)
    if (response == correct_response) {
	return true
    }
    else {
	return false
    };
};

function give_feedback() {
    console.log('Error: Blank feedback used')
    // This is the default function, which does nothing.
    // Override this to give feedback
};
		
//////////////////////////
// Miscellaneous	//
//////////////////////////

function shuffle(array){ //Shuffle an array
    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [v1.0]
    for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
};

function range(start, end) { 
    // Creates range of numbers from start to end (similar to Python)
    var ar = [];
    for (var i = start; i < end; i++) {
        ar.push(i);
    };
    return ar;
};

function generate_random_list(length){
    return shuffle(range(0, length));
};

if (!Array.prototype.indexOf) { 
    // Compatibility fix for IE. See http://stackoverflow.com/questions/143847/best-way-to-find-an-item-in-a-javascript-array#144172
    Array.prototype.indexOf = function (obj, fromIndex) {
        if (fromIndex == null) {
            fromIndex = 0;
        } else if (fromIndex < 0) {
            fromIndex = Math.max(0, this.length + fromIndex);
        }
        for (var i = fromIndex, j = this.length; i < j; i++) {
            if (this[i] === obj)
                return i;
        }
        return -1;
    };
}

function preload_images(image_names, directory) {
    // Can be used to load image files prior to start of experiment,
    // rather than for each trial.
    // This probably isn't the best way to achieve this though.
    var image_array = new Array();
    for (var i = 0; i < image_names.length; i++) {
	    var img = new Image()
	    img.src = directory + image_names[i]
	    image_array.push(img)
    };
    return image_array;
};


