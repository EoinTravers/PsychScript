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
var paradigm = 'click_button';
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
    deactivate_response_buttons(['yesButton', 'noButton']);
    stimuli_number = random_order[trial_number];
    probe = probes[stimuli_number];
    code = codes[stimuli_number];
    show_fixation(ITI);
    setTimeout("trial_stage1()", ITI);
};

function trial_stage1() {
    start_time = (Date.now());
    show_text(probe);
    activate_response_buttons(['yesButton', 'noButton']);
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
