function Sequence(items, run_if_array){
	this.items = items;
	this.run_if = run_if_array;
};

Sequence.prototype.run = function() {
	for (var i = 0; i < this.items.length; i++) {
		// implement this later:
		//if (this.run_if[i])
		this.items[i].run()
	};
};
