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
var keys_pressed = [];
var trial_number = 0;
var stimuli_number;
var random_order = shuffle(range(0, probes.length-1)); 

// Running variables
var start_time;
var response;
var rt;
var probe;
// Variables to save
var responses = [];
var accuracies = [];
var reaction_times = [];

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

// Response handling
document.addEventListener("keydown", process_keypress, false);
function process_keypress(e) {
	var keyCode = e.keyCode;
	keys_pressed.push(String.fromCharCode(keyCode))
};

function get_key(){ // TODO: Accept only certain keys.
	if (keys_pressed.length == 0) {
		setTimeout("get_key();", 5)
	}
	else {
		var key = keys_pressed[0]
		console.log(keys_pressed[0]);
		keys_pressed = [];
		response = key; // Important: var response must be declared beforehand!
		rt = ((Date.now()) - start_time);
		log_response();
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

/*//The end user should have access to there fuctions, so they're defined in main.js
function trial_stage0(trial_number) {
	stimuli_number = random_order[trial_number]
	probe = probes[stimuli_number];
	trial_stage1(ITI);
};

function trial_stage1(duration) {
	var pause = duration / 3
	show_text('');
	setTimeout("show_text('+')", pause);
	setTimeout("show_text('')", (pause*2));
	setTimeout("trial_stage2()", duration);
};

function trial_stage2() {
	keys_pressed = [];
	start_time = (Date.now());
	show_text(probe);
	get_key()
};
*/ 
function log_response() {
	document.getElementById('timeBox').value = Date();
	document.getElementById('trialBox').value = trial_number;
	document.getElementById('stimuliBox').value = stimuli_number;
	document.getElementById('probeBox').value = probe;
	document.getElementById('responseBox').value = response;
	document.getElementById('rtBox').value = rt;
	//sendData(data_address);
	next_trial();
};

function next_trial(){
	//log_data();
	if (trial_number < probes.length-1) {
		trial_number++
		console.log('trial_number')
		console.log(trial_number)
		trial_stage0(trial_number)
	}
	else {
		//end()
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

