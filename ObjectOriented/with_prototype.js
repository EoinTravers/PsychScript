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
var global_var_from_string = function(string){
	var dot_index = string.indexOf('.')
	if(dot_index == -1) {
		// Simple top-level variable, carry on.
		return(window[string])
	}
	else {
		var root = window
		while(dot_index != -1){		
			var head_name = string.slice(0, dot_index);
			var root = root[head_name]
			string = string.slice(dot_index+1, string.length)
			dot_index = string.indexOf('.')
		};
		return(root[string])
	};
};

var parse_for_variables = function(string) {
	var open_bracket = string.indexOf('[');
	if (open_bracket == -1) {
		// No square brackets in string, return -1
		return(-1)
	}
	else {
		var close_bracket = string.indexOf(']');
		if(close_bracket == -1){
			// Throw error if no close bracket found
			throw "Variable declaration started ('['), but not finished (']')"
		};
		// Return what's in between the square brackets: the variable name.
		return string.slice(open_bracket+1, close_bracket)
	};
};	

var substitute_variables = function(string) {
	var vars = []
	var full_string = string
	// Search through the string, identifying variables within square brackets, and
	// add them to the list vars.
	while(true) {
		this_var = parse_for_variables(string);
		if (this_var == -1){
			break
		};
		vars.push(this_var);
		string = string.slice(string.indexOf(this_var)+this_var.length+1, string.length)
		//console.log(string);
	};
	//console.log(vars);
	// Replace every variable name within square brackets with it's value in the window.
	for(var i=0; i < vars.length; i++){
		//~ console.log(vars[i])
		//~ console.log(window[vars[i]])
		//if (typeof vars[i] == 'undefined'){throw "Variable " + vars[i] + " is not defined"};
		full_string = full_string.replace(vars[i], window[vars[i]]);
		console.log(full_string)
	};
	// Strip out brackets
	full_string = full_string.replace(/[[\]]/g,'')
	return full_string
};

var p = "[probe]";
var probe = 'Foo'
s = 'one[two]three[four]five'
var two = '2'
var four = '4'


var response_button_ids = ['resp1', 'resp2'];




text2 = new ShowText('Use your keyboard!', 'probe_text');
key = new GetKey('abc');


text = new ShowText();
text.text = '[probe]';
text.location_id = 'probe_text';
text.color = '[color]';

click = new GetClick();
click.response_button_ids = ['resp1', 'resp2'];

logger = new Logger();
logger.variables_to_log = ['response', 'response_time', 'probe', 'loop.cycle', 'loop.iteration'];
seq = new Sequence();
seq.add_item(text);
seq.add_item(click);
seq.add_item(logger);
//seq.set_callbacks();

loop = new Loop();
loop.variables = {
	'probe' : ['One', 'Two', 'Three'],
	'color' : ['red', 'green', 'blue']
};
loop.item = seq


var start_response_interval
var response
var response_time
var response_callback
var probe





