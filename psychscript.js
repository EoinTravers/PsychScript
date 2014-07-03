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

// Don't change anything below this line.
// Trial variables
var trial_number = 0;
var stimuli_number;
// Running variables - Defined here so the user doesn't have to deal with them.
var start_time;
var response;
var rt;
var prime;
var probe;
var accepted_keys;
var feedback_delay;

// Functions
// Visuals
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
	document.getElementById('img1').style.display = 'None';
	document.getElementById('img2').style.display = 'None';
	document.getElementById('img3').style.display = 'None';
};
function show_fixation(duration, flash) {
    flash = flash || false
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
	document.onkeydown = function(){}
};

function activate_response_buttons(list_of_button_ids) {
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
    for (var i=0; i < list_of_button_ids.length; i++)  {
	var button_id = list_of_button_ids[i]
	document.getElementById(button_id).onclick = function(){};
    };
};


// Experiment logic
function begin_experiment() {
	create_logging_form("responseForm", variables_to_log)
	document.getElementById('instructions').style.display = "None";
	document.getElementById('experiment').style.display = "Inline";
	trial_stage0()
};

function end_experiment() {
	document.getElementById('experiment').style.display = "None";
	document.getElementById('debrief').style.display = "Inline";
};


// Logging
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

function log_response() {
    rt = Date.now() - start_time;
    // If they exit, clear intervals and timeouts.
    try {clearInterval(tracking_interval);} catch(err){};
    try {clearTimeout(response_timeout);} catch(err){};
    feedback_delay = 0
    if(error_feedback) {
	var correct = check_accuracy()
	console.log(correct)
	if (!correct) {
	    give_feedback()
	};
    };
    console.log('Logging response: '+ response)
    for (var i=0; i < variables_to_log.length; i++) {
	var variable_to_log = variables_to_log[i];
	var logging_box_id = variable_to_log + 'Box';
	console.log(logging_box_id)
	document.getElementById(logging_box_id).value = window[variable_to_log]
    };
    sendData(data_address);
    setTimeout(function(){next_trial();}, feedback_delay)
};

function give_feedback() {
    console.log('Error: Blank feedback used')
    // This is the default function, which does nothing.
    // Override this to give feedback
};

function next_trial(){
    if (trial_number < probes.length-1) {
	trial_number++
	trial_stage0(trial_number)
    }
    else {
	end_experiment();
    };
};

function sendData(address){ // POSTs data in responseForm to the address given.
    $.ajax({
	    type: "POST",
	    //url: "save_data.php",
	    url: address,
	    data: $("#responseForm").serialize(), // serializes the form's elements.
	    success: function(data)
	    {
	       console.log('data sent')
	    }
    });
};
		
// Other functions
function shuffle(array){ //Shuffle an array
    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [v1.0]
    for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
};

function range(start, end) { // Creates range of numbers from start to end (similar to Python)
    var ar = [];
    for (var i = start; i < end; i++) {
        ar.push(i);
    };
    return ar;
};

function generate_random_list(length){
    return shuffle(range(0, length));
};

if (!Array.prototype.indexOf) { // Compatibility fix for IE. See http://stackoverflow.com/questions/143847/best-way-to-find-an-item-in-a-javascript-array#144172
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
	var image_array = new Array();
	for (var i = 0; i < image_names.length; i++) {
		var img = new Image()
		img.src = directory + image_names[i]
		image_array.push(img)
	};
	return image_array;
};

function create_logging_form(formID, variables_list) {
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
