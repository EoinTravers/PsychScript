function Get_Key(callback, keys_to_accept) {
	this.callback = callback
	this.keys_to_accept = keys_to_accept
};

Get_Key.prototype.run = function(){
	// Global variables
	window['start_response_interval'] = Date.now();
	window['callback'] = this.callback;
	window['keys_to_accept'] = this.keys_to_accept || '';
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

function Get_Clickbutton(callback, response_button_ids) {	
	// Make sure button ids are provided. Throw error otherwise.
	//~ if (typeof(response_button_ids) == 'undefined') {
		//~ throw 'PsychScript Error: Get_Clickbutton() called without list ids for response buttons';
	//~ };
	this.callback = callback;
	this.response_button_ids = response_button_ids || alert(response_button_ids)
	this.name = 'Get_Clickbutton';
};

Get_Clickbutton.prototype.run = function(){
	window['response'] = undefined;
	window['callback'] = this.callback;
	window['response_button_ids'] = this.response_button_ids;
	//var response_button_ids = this.response_button_ids;
	console.log(this.name);
    for (var i=0; i < this.response_button_ids.length; i++)  {
		var button = document.getElementById(this.response_button_ids[i]);
		button.onclick = function(){
			var response_time = Date.now() - window['start_response_interval'];
			window['response_time'] = response_time;
			window['response'] = this.innerHTML // Set button text as response
			/* TODO: using this.innerHTML is good when button contains text, but
			 * wouldn't be appropriate in all cases (like when the button is an image).
			 * Need to implement a more flexible method */
			ignore_clickbuttons();
			window['callback']() // Executes the next function (i.e. response logging)
		};
	};
    window['start_response_interval'] = Date.now(); // Start timer
};

function ignore_clickbuttons() {
	this.list_of_button_ids = window['response_button_ids'];
	for (var i=0; i < this.list_of_button_ids.length; i++)  {
		var button = document.getElementById(list_of_button_ids[i]);
		button.onclick = function(){};
	};
};

function log_response() {
	// Temporary function, for testing
	alert('Response: ' + String(response) +'\nRT: '+ String(response_time));
};
var click = new Get_Clickbutton(log_response, new Array('resp1', 'resp2')); 
var key = new Get_Key(log_response, 'abc');

