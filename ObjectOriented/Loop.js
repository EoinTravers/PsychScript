var Loop = Class.create({
	initialize: function(){
		this.cycles = 3;
		this.item // a sequence
		this.order = "random";
		this.variables = {} // A dict of lists.
		//this.variable_names = []
		this.iteration = 0;
	},
	prepare: function(){
		this.running_order = generate_random_list(3);
		//this.item.prepare.bind(this.item);
		//this.item.prepare();
	},
	run: function(){
		console.log("Iter: " + this.iteration);
		this.cycle = this.running_order[this.iteration];
		this.iteration++;
		console.log("Cycle: " + this.cycle);
		for(var var_name in this.variables){
			var this_var = this.variables[var_name]
			window[var_name] = this_var[this.cycle]
			console.log("Value of variable " + var_name + " set to " + window[var_name])
		};
		for(var var_name in this.variables){
			console.log(window[var_name])
		};
		this.item.prepare.bind(this.item);
		this.item.run.bind(this.item);
		this.item.prepare();
		this.item.run()	;
	}
});
