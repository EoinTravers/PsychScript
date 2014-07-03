/*
 * Use the code on this page as a template for your own experiment
*/

var debug_mode = true // Set as true to show extra information, false to run experiment normally.
var error_feedback = false // Do we show feedback when participants make a mistake?

// Miscelaneous variables
var ITI = 500 // Inter Trial Interval - Duration of fixation cross
var number_of_trials = 40

/*
 * This list handles data logging, and defines 
 * the variables to be logged after each trial.
 * At the start of the experiment, a hidden form 
 * is generated, with a text box for each of these variables,
 * id'd 'variablenameBox'.
 * After each trial, the value of each variable is written
 * inside it's respective text box, and the whole form
 * is submitted to the server for logging.
 */
var variables_to_log = new Array('paradigm', 'experiment_start_time', 'subject_nr', 'trial_number', 'stimuli_number', 'probe', 'code', 'response', 'rt');
var data_address = 'save_data.php' // URL to send results to.

/*
 * Define the variables themselves.
 * Some of them get values set now, others will be updated throughout the experiment.
 */
var paradigm = 'click_button';
var experiment_start_time = Date();
var subject_nr = Math.floor(Math.random() * 99999999) + 1; // Pick a random number between 1 and 99999999
var trial_number = 0;
var probe
var code
var response
var rt
var stimuli_number

// Generate random list from 0 to 39.
// This is the order in which the stimuli will be presented.
var random_order = generate_random_list(number_of_trials);


// Experiment logic - Adjust this as needed
/*
 * Experiment Logic
 * These are the functions which actually control the flow of the experiment.
 * For most paradigms, you'll mostly just need to modify these functions.
 * 
 * There can be any number of stages (functions) per trial, but as a
 * general rule of thumb, you should have a new function every time you 
 * need to either have a pause in the trial:
 * 	`setTimeout(function(){trial_stage3()}, 2000)`
 * or need to wait for participant input.
 */
if(debug_mode){
	// If debug_mode is set to true, show the otherwise 'invisible'
	// text boxes where the variables are written to before sending to the
	// server.
	// Useful for developing.
    document.getElementById('hidden_div').style.display = 'Inline'
};

function trial_stage0() {
	// "Turn off" the buttons
    deactivate_response_buttons(['yesButton', 'noButton']);
    /* Set up stimuli for this trial 
     * Chose the next stimuli_number from the random list
     * `trial_number` is automatically incremented every trial, so that
     * this will automatically iterate through the random_order.*/
    stimuli_number = random_order[trial_number];
    // Get `probe` and `code` from their respective lists, using
    // whatever stimuli number we're on.
    probe = probes[stimuli_number];
    code = codes[stimuli_number];
    // Show a fixation cross for the duration set for `ITI`
    show_fixation(ITI, flash=true); //`true` to flash cross, `false` to show it constantly
    // Execute `trial_stage1` once the fixation is over (i.e. delay it by
    // the duration of ITI)
    setTimeout(function(){trial_stage1()}, ITI);
};

function trial_stage1() {
    start_time = (Date.now()); // Start a timer
    show_text(probe); // Show the probe text
    /* "Turn on" the response buttons.
     * From here, clicking either button specified below will execute
     * `log_response`, with the value of the button.*/
    activate_response_buttons(['yesButton', 'noButton']);
	/*
	* `log_response` will write the value of all the variables in the list
	* `variables_to_log` (line 4) to their resptive text boxes.
	* Then, trial_number will be incremented by 1 (for obvious reasons),
	* and then `trial_stage0()` will be called again.
	* This loop will continue until trial_number exceeds whatever the
	* value of `number_of_trials` is, after which `end_experiment()`
	* will execute.
	* By default, `end_experiment` hides the <div> labelled "experiment",
	* and shows the one labelled "debrief".
	*/
};

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
