/*
 * A key difference between Python and JavaScript is that the latter uses scopes
 * differently: this. doesn't work quite the same as self.
 * I'm using Prototype.js as a building block for OO PsychScript because
 * it allows the easy creation of flexible classes, and, crucially, because
 * it allows us to overcome the problem of inherited 'this' scopes.
 * 
 * In order to execute objects in the experiment one after another, including
 * waiting for user input, we need to use callbacks: each function/object 
 * concludes by calling the next one.
 * In this case, ShowText runs with GetClick as its callback, and getclick 
 * has the dummy function log_response as its callback.  However, normally,
 * when GetClick is called from within ShowText, 'this' refers to ShowText,
 * and so we have not access to properties of GetClick (like 'response_button_ids').
 * 
 * Happily, using Prototype's bind() method, 
 */


var ShowText = Class.create({
  initialize: function(text, location_id) {
	//this.callback = callback;
	this.text = text;
	this.location_id = location_id;
  },
  run: function(message) {
	  console.log('Show Text')
	  document.getElementById(this.location_id).innerHTML = this.text;
	  this.callback.run.bind(this.callback); // bind 'this' to GetClick,
	  // rather than inheriting from ShowText, as is the default.
	  this.callback.run();
  }
});

var GetClick = Class.create({
	initialize: function(response_button_ids) {
		window['response'] = undefined;
		//this.callback = callback;
		this.response_button_ids = response_button_ids;
	},
	run: function() {
		console.log('Get Click')
		window['response_callback'] = this.callback.run.bind(this.callback);
		for (var i=0; i < this.response_button_ids.length; i++)  {
			var button = document.getElementById(this.response_button_ids[i]);
			button.onclick = function(){
				window['response_time'] = Date.now() - window['start_response_interval'];
				window['response'] = this.innerHTML // Set button text as response
				/* TODO: using this.innerHTML is good when button contains text, but
				 * wouldn't be appropriate in all cases (like when the button is an image).
				 * Need to implement a more flexible method */
				ignore_clickbuttons();
				window['response_callback']() // Executes the next function (i.e. response logging)
			};
		};
		window['start_response_interval'] = Date.now();
	}
});

var GetKey = Class.create({
	initialize: function(accepted_keys){
		window['response'] = undefined;
		//this.callback = callback;
		//window['response_callback'] = this.callback.run;
		this.response_button_ids = response_button_ids;
		
	},
	run: function(){
		console.log('Get Key')
		window['accepted_keys'] = this.accepted_keys || '';
		window.onkeydown = function(event) {
			// This code will execute when the user presses a key.
			var key = String.fromCharCode(event.keyCode);
			//console.log(key);
			var accepted_keys = window['accepted_keys'];
			if (accepted_keys.length == 0) {
				// Accept any key
				window['response_time'] = Date.now() - window['start_response_interval'];
				window['response'] = key;
				ignore_keypresses() // Prevents subsequent keys being recorded.
				window['response_callback']() // Executes the next function (i.e. response logging)
			}
			else {
				// As above, but only accepts keys defined in 'keys_to_accept' / accepted_keys
				if (accepted_keys.indexOf(key) != -1 || accepted_keys.indexOf(key.toLowerCase()) != -1) {
					window['response_time'] = Date.now() - window['start_response_interval'];
					window['response'] = key;
					ignore_keypresses();
					window['response_callback']();
				};
			};
		};
		window['start_response_interval'] = Date.now();
	}
});

var Logger = Class.create({
	initialize: function(variables_to_log){
		this.variables_to_log = variables_to_log;
		window['variables_to_log'] = variables_to_log;
	},
	create_form: function(){
		console.trace()
		var form = document.createElement("form");
			form.setAttribute('id', 'logging_form');
		var vars = this.variables_to_log;
		for(var i = 0; i < vars.length; i++){
			var this_variable = vars[i];
			var title = document.createTextNode(this_variable+': ');
			var box = document.createElement("input");
				box.setAttribute('id', this_variable+'_form');
				box.setAttribute('name', this_variable);
			var line_break = document.createElement('br');
			form.appendChild(title);
			form.appendChild(box);
			form.appendChild(line_break);
		};
		document.body.appendChild(form);
	},
	run: function(){
		console.log('Log Responses')
		if(document.getElementById('logging_form') == null) {
			// No logging form exists, create one
			this.create_form()
		}
		// Log data to form
		var vars = this.variables_to_log;
		for(var i = 0; i < vars.length; i++){
			var this_variable = vars[i];
			var log_to = document.getElementById(this_variable+'_form');
			log_to.value = window[this_variable];	
		};
	}
});

var Sequence = Class.create({
	initialize: function(){
		this.items = new Array();
	},
	add_item: function(item){
		this.items.push(item)
	},
	set_callbacks: function(){
		for(var i = 0; i < this.items.length-1; i++){
			console.log(i)
			this.items[i].callback = this.items[i+1];
			this.items[i].callback.run.bind(this.items[i].callback);	
		};
		this.items[this.items.length-1].callback = this.end_sequence();
	},
	end_sequence: function(){
		alert('End of Sequence')
	},
	run: function(){
		this.items[0].run()
	}
});
var ConsoleLog = Class.create({
	initialize: function(items){
	},
	log: function(){
		var message  = window['message'];
		console.log(message);
	}
});	

text = new ShowText('Click a response!', 'probe_text');
text2 = new ShowText('Use your keyboard!', 'probe_text');
key = new GetKey('abc');
click = new GetClick(response_button_ids);
logger = new Logger(['response', 'response_time']);
seq = new Sequence();
seq.add_item(text);
seq.add_item(click);
seq.add_item(logger);
seq.set_callbacks();

// Set Callbacks
//~ text.callback = click;
//~ key.callback = logger;
//~ text2.callback = key;
//~ click.callback = logger;
var start_response_interval
var response
var response_time
var response_callback

var response_button_ids = ['resp1', 'resp2'];
var log_response = function(){
	out = 'Response: '+window['response']+'\nRT: '+window['response_time'];
	alert(out);
};





