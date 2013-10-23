var Sequence = Class.create({
	initialize: function(){
		this.items = new Array();
		this.name = "Sequence";
	},
	add_item: function(item){
		this.items.push(item)
	},
	set_callbacks: function(){
		for(var i = 0; i < this.items.length-1; i++){
			this.items[i].callback = this.items[i+1];
			this.items[i].callback.run.bind(this.items[i].callback);	
		};
		this.items[this.items.length-1].callback = this.callback;
		//~ this.items[this.items.length-1].callback.bind(this.callback);
		//~ this.items[this.items.length-1].callback.run.bind(this);
		//this.items[this.items.length-1].callback.bind(this);
	},
	end_sequence: function(){
		this.name = 'end_sequence'
		this.that = this
		console.log(this.name)
		// I don't do anything for now, but I have a method, .run(),
		// defined below.
	},
	callback: function(){
		console.log('Loop again!');
		this.prepare = function(){};
		this.run = function(){console.log('and again!')};
	},
	prepare: function() {
		console.log('Preparing' + this.name)
		// Do I need to do anything here?
		this.set_callbacks();
		this.items[0].prepare();
	},
	run: function(){
		this.items[0].run()
	}
});

Sequence.prototype.end_sequence.prepare = function() {
		// Now that everything's prepared, run the sequence
		console.log('Sequence Prepared')
};
Sequence.prototype.end_sequence.run = function(){
	// I need to be bound to the Sequence itself, not to 'end_sequence'
	console.log('End of Sequence')
	console.log(this)
	console.log(this.this)
	console.log(this.that)
	console.log(this.name);//.that.name);
};
