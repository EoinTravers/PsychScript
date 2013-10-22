var ShowText = Class.create({
  initialize: function() {
	//this.callback = callback;
	//~ this.text = text;
	//~ this.location_id = location_id;
	this.name = "ShowText"
  },
  prepare: function(){
	  console.log('Preparing' + this.name)
	  //console.log('___Text:' + this.text)
	  this.new_text = substitute_variables(this.text);
	  //console.log('______Changed to:' + this.new_text);
	  this.location_id = substitute_variables(this.location_id);
	  this.callback.prepare.bind(this.callback); // bind 'this' to GetClick,
	  // rather than inheriting from ShowText, as is the default.
	  this.callback.prepare();
  },
  run: function() {
	  console.log('Show Text')
	  document.getElementById(this.location_id).innerHTML = this.new_text;
	  this.callback.run.bind(this.callback); // bind 'this' to GetClick,
	  // rather than inheriting from ShowText, as is the default.
	  this.callback.run();
  }
});
