var GetClick = Class.create({
	initialize: function(response_button_ids) {
		window['response'] = undefined;
		this.response_button_ids = response_button_ids;
		this.name = "GetClick"
	},
	prepare: function() {
		// Do I need to do anything here?
		console.log('Preparing' + this.name)
		this.callback.prepare.bind(this.callback); // bind 'this' to GetClick,
		// rather than inheriting from ShowText, as is the default.
		this.callback.prepare();
	},
	run: function() {
		console.log('Get Click')
		window['response_callback'] = this.callback.run.bind(this.callback);
		window['response_button_ids'] = response_button_ids
		for (var i=0; i < this.response_button_ids.length; i++)  {
			var button = document.getElementById(this.response_button_ids[i]);
			button.onclick = function(){
				window['response_time'] = Date.now() - window['start_response_interval'];
				window['response'] = this.innerHTML // Set button text as response
				/* TODO: using this.innerHTML is good when button contains text, but
				 * wouldn't be appropriate in all cases (like when the button is an image).
				 * Need to implement a more flexible method */
				ignore_clickbuttons();
				window['response_callback']() // Executes the next function (i.e. response logging)
			};
		};
		window['start_response_interval'] = Date.now();
	}
});
