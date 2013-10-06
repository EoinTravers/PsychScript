function Loop(var_names, values, item, selection) {
	this.selection = selection || 'random';
	this.var_names = var_names;
	this.variables = {};
	for (var i = 0; i < var_names.length; i++) {
		this.variables[var_names[i]] = values[i];
	};
	this.item = item;
};

Loop.prototype.run_item = function(row) {
	for (var i = 0; i < this.var_names.length; i++) {
		var variable_name = this.var_names[i];
		var variable_value = this.variables[variable_name][row];
		window[variable_name] = variable_value;		
	};
	this.item();
};

Loop.prototype.iterate = function() {
	if (this.selection == 'random'){
		this.loop_order = generate_random_list(values[0].length)
	}
	else {// if (this.selection == 'sequential') {
		this.loop_order = range(0, values[0].length)
	};
	// Other options?
	for (var row = 0; row < this.loop_order.length; row++) {
		this.run_item(row);
	};
};
	
	
	
Loop.prototype.foo = function(){
	for (var i = 0; i < this.var_names.length; i++) {
		console.log(this.var_names[i])
	};
};
		
var variables = ['one', 'two']
var values = [[1,1], [2,2]]
function add_me() {
	alert(one + two)
};
var l = new Loop(variables, values, add_me);

// Other functions
function shuffle(array){ //Shuffle an array
    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [v1.0]
    for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
};

function range(start, end) { // Creates range of numbers from start to end (similar to Python)
    var ar = [];
    for (var i = start; i < end; i++) {
        ar.push(i);
    };
    return ar;
};

function generate_random_list(length){
    return shuffle(range(0, length));
};
