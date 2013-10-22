var GetKey = Class.create({
	initialize: function(accepted_keys){
		window['response'] = undefined;
		this.name = "GetKey"
		
	},
	prepare: function() {
		// Do I need to do anything here?
		console.log('Preparing' + this.name)
		this.callback.prepare.bind(this.callback); // bind 'this' to GetClick,
		// rather than inheriting from ShowText, as is the default.
		this.callback.prepare();
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
