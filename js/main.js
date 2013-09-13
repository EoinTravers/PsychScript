/*
 * Use the code on this page as a template for your own experiment
*/

// Settings you can vary
//Stimuli
var probes = ['one', 'two', 'three', 'four'];
var correct_responses = ['Y', 'N', 'Y', 'N'];

// Settings
var ITI = 1500 // Inter Trial Interval
var data_address = 'save_data.php' // Page to send results to.

// Experiment logic
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
	get_key() // Waits for keypress, records response, accuracy and rt, logs response, proceeds to next trial.
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
