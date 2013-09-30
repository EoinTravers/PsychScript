/*
 * Use the code on this page as a template for your own experiment
*/

// Settings you can vary
var ITI = 500 // Inter Trial Interval
var data_address = 'save_data.php' // Page to send results to
// Settings
var random_order = shuffle(range(0, questions.length));
var trial_number = 0;
var stim_number = random_order[trial_number];

// Experiment logic
function trial_stage0() {
	stim_number = random_order[trial_number];
	base_category = base_categories[stim_number];
	target_category = target_categories[stim_number];
	type_img = types[stim_number]
	probe = questions[stim_number];
	trial_stage1(ITI);
};

function trial_stage1(duration) {
	console.log('Trial number: ' + String(trial_number) + '; Stimuli number: ' + String(stim_number));
	var pause = duration / 3
	show_text('+');
	setTimeout("trial_stage2()", duration);
};

function trial_stage2() {
	start_time = (Date.now());
	show_text(probe);
	show_image('img1', base_category);
	show_image('img2', type_img);
	show_image('img3', target_category);
	activate_response_buttons();
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
