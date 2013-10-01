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
var accepted_keys


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
	setTimeout("show_text('+');", pause)
	setTimeout("show_text('');", pause*2)
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
	    var key
	    if (accepted_keys.indexOf(key) != -1) {
		response = key
		log_response()
	    }
	    else if (accepted_keys.indexOf(key.toLowerCase()) != -1) {
		// In case acccepted_keys were given in lowercase.
		response = key
		log_response()
	    };
	};
    };
};

function activate_response_buttons(list_of_button_ids) {
    for (var i=0; i < list_of_button_ids.length; i++)  {
	var button = document.getElementById(list_of_button_ids[i]);
	console.log(i+button)
	button.onclick = function(){
	    response = this.innerHTML
	    log_response(response);
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
	document.getElementById('instructions').style.display = "None";
	document.getElementById('experiment').style.display = "Inline";
	trial_stage0(trial_number)
};

function end_experiment() {
	document.getElementById('experiment').style.display = "None";
	document.getElementById('debrief').style.display = "Inline";
};

// Logging

function log_response(response) {
    console.log('Logging response: '+ response)
    rt = Date.now() - start_time;
    for (var i=0; i < variables_to_log.length; i++) {
	var logging_box_id = logging_box_ids[i];
	var variable_to_log = variables_to_log[i];
	console.log(logging_box_id)
	document.getElementById(logging_box_id).value = window[variable_to_log]
    };
    //sendData(data_address);
    next_trial();
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
function shuffle(o){ //Shuffle an array
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function range(start, end) { // Creates range of numbers from start to end (similar to Python)
    var foo = [];
    for (var i = start; i <= end-1; i++) {
        foo.push(i);
    }
    return foo;
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
