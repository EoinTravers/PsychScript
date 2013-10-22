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
		this.items[this.items.length-1].callback = this.end_sequence;
		this.items[this.items.length-1].callback.prepare.bind(this);
	},
	end_sequence: function(){
		//this.name = 'end_sequence'
		console.log(this.name)
		// I don't do anything for now, but I have a method, .run(),
		// defined below.
	},
	prepare: function() {
		console.log('Preparing' + this.name)
		// Do I need to do anything here?
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
	console.log('End of Sequence')
};
