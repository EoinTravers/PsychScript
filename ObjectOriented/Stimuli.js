function Show_Text(callback, text, location_id) {
	window['callback'] = callback; // Use global or local?
	//this.callback = callback;
	this.text = text;
	this.location_id = location_id;
};

Show_Text.prototype.run = function(){
	document.getElementById(this.location_id).innerHTML = this.text;
	// Global variables
	window['callback']();
	//or ... // this.callback();
};

function Show_Image(callback, src, location_id) {
	//window['callback'] = callback; // Use global or local?
	this.callback = callback;
	this.src = src;
	this.location_id = location_id;
	this.name = 'Show_Image';
};

Show_Image.prototype.run = function(){
	document.getElementById(this.location_id).src = this.src;
	// Global variables
	//window['callback']();
	new this.callback();
};

var i = new Show_Image(click.run, 'http://panicdots.com/wp-content/uploads/2013/08/panic-dots-logo.png', 'probe_image');

