var Logger = Class.create({
	initialize: function(variables_to_log){
		this.variables_to_log = variables_to_log;
		window['variables_to_log'] = variables_to_log;
		this.name = "Logger";
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
	prepare: function() {
		console.log('Preparing' + this.name)
		// Do I need to do anything here?
		this.callback.prepare.bind(this.callback); // bind 'this' to GetClick,
		// rather than inheriting from ShowText, as is the default.
		this.callback.prepare();
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
		this.callback.run();
	}
});
