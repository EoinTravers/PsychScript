/*
 * Write text to screen.
 * Currently the most advanced Object-Oriented item
 */

var ShowText = Class.create({
  initialize: function() {
	//this.callback = callback;
	//~ this.text = text;
	//~ this.location_id = location_id;
	this.name = "ShowText";
	this.text = '';
	this.location_id  = '';
	this.color = ''
	this.font = '';
	this.size = '';
	this.current = {};
	// List of properties which will be checked for [variables], and substituted
	// as appropriate in the prepare phase.
	this.dynamic_variables = ['text', 'location_id', 'color', 'font', 'size']
  },
  prepare: function(){
	  console.log('Preparing' + this.name)
	  //console.log('___Text:' + this.text)

	  //console.log('______Changed to:' + this.new_text);
	  // Subsititue in [variables]
	  for(var i=0; i < this.dynamic_variables.length; i++){
		  var v = this.dynamic_variables[i];
		  this.current[v] = substitute_variables(this[v]);
		  console.log(v + ': ' + this[v]);
	  };
	  //this.text = substitute_variables(this.text);
	  //this.location_id = substitute_variables(this.location_id);
	  this.callback.prepare.bind(this.callback); // bind 'this' to GetClick,
	  // rather than inheriting from ShowText, as is the default.
	  this.callback.prepare();
  },
  run: function() {
	  console.log('Show Text')
	  var text_div = document.getElementById(this.location_id)
	  text_div.innerHTML = this.current.text;
	  text_div.style.color = this.current.color;
	  this.callback.run.bind(this.callback); // bind 'this' to GetClick,
	  // rather than inheriting from ShowText, as is the default.
	  this.callback.run();
  }
});
