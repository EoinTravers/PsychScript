/*
 * A key difference between Python and JavaScript is that the latter uses scopes
 * differently: this. doesn't work quite the same as self.
 * I'm using Prototype.js as a building block for OO PsychScript because
 * it allows the easy creation of flexible classes, and, crucially, because
 * it allows us to overcome the problem of inherited 'this' scopes.
 * 
 * In order to execute objects in the experiment one after another, including
 * waiting for user input, we need to use callbacks: each function/object 
 * concludes by calling the next one.
 * In this case, ShowText runs with GetClick as its callback, and getclick 
 * has the dummy function log_response as its callback.  However, normally,
 * when GetClick is called from within ShowText, 'this' refers to ShowText,
 * and so we have not access to properties of GetClick (like 'response_button_ids').
 * 
 * Happily, using Prototype's bind() method, 
 */


var ShowText = Class.create({
  initialize: function(callback, text, location_id) {
	this.callback = callback;
	this.text = text;
	this.location_id = location_id;
  },
  run: function(message) {
	  document.getElementById(this.location_id).innerHTML = this.text;
	  this.callback.run.bind(this.callback); // bind 'this' to GetClick,
	  // rather than inheriting from ShowText, as is the default.
	  this.callback.run();
  }
});

var GetClick = Class.create({
  initialize: function(callback, response_button_ids) {
	window['response'] = undefined;
	this.callback = callback;
	this.response_button_ids = response_button_ids;
  },
  run: function() {
	  for (var i=0; i < this.response_button_ids.length; i++)  {
		var button = document.getElementById(this.response_button_ids[i]);
		button.onclick = function(){
				var response_time = Date.now() - window['start_response_interval'];
				window['response_time'] = response_time;
				window['response'] = this.innerHTML // Set button text as response
				/* TODO: using this.innerHTML is good when button contains text, but
				 * wouldn't be appropriate in all cases (like when the button is an image).
				 * Need to implement a more flexible method */
				ignore_clickbuttons();
				window['callback']() // Executes the next function (i.e. response logging)
			};
		};
	}
});


var resp_bs = ['resp1', 'resp2'];
text = new ShowText(click, 'Hello sir!', 'probe_text');
click = new GetClick(log_response, resp_bs);
