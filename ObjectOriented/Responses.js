function Get_Key(callback, keys_to_accept) {
	// Global variables
	window['start_response_interval'] = Date.now();
	window['callback'] = callback;
	window['keys_to_accept'] = keys_to_accept || '';
	//~ if (window['keys_to_accept'] == undefined) {
		//~ window['accept_all_keys'] = true;
	//~ }
	//~ else {
		//~ window['accept_all_keys'] = false;
	//~ };
	window['response'] = undefined;
	window.onkeydown = function(event) {
		// This code will execute when the user presses a key.
		var key = String.fromCharCode(event.keyCode);
		//console.log(key);
		var accepted_keys = window['keys_to_accept'];
		if (accepted_keys.length == 0) {
			// Accept any key
			var response_time = Date.now() - window['start_response_interval'];
			window['response'] = key;
			window['response_time'] = response_time;
			ignore_keypresses() // Prevents subsequent keys being recorded.
			window['callback']() // Executes the next function (i.e. response logging)
		}
		else {
			// As above, but only accepts keys defined in 'keys_to_accept' / accepted_keys
			if (accepted_keys.indexOf(key) != -1 || accepted_keys.indexOf(key.toLowerCase()) != -1) {
				var response_time = Date.now() - window['start_response_interval'];
				window['response'] = key;
				window['response_time'] = response_time;
				ignore_keypresses();
				window['callback']();
			};
		};
	};
};

function ignore_keypresses(){
	window.onkeydown = function(event) {};
};

function Get_Clickbutton(callback, list_of_button_ids) {
	// Make sure button ids are provided. Throw error otherwise.
	if typeof(list_of_button_ids) == 'undefined' {
		throw 'PsychScript Error: Get_Clickbutton() called without list ids for response buttons';
	};
	window['response'] = undefined;
	window['callback'] = callback;
    for (var i=0; i < list_of_button_ids.length; i++)  {
		var button = document.getElementById(list_of_button_ids[i]);
		button.onclick = function(){
			var response_time = Date.now() - window['start_response_interval'];
			window['response_time'] = response_time;
			window['response'] = this.innerHTML // Set button text as response
			window['callback']() // Executes the next function (i.e. response logging)
		};
	};
    window['start_response_interval'] = Date.now(); // Start timer
};
	

function log_response() {
	// Temporary function, for testing
	alert(String(response) + String(response_time));
};

