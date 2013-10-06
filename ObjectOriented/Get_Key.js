function Get_Key(keys_to_accept) {
	window['keys_to_accept'] = keys_to_accept || undefined;
	if (window['keys_to_accept'] == undefined) {
		window['accept_all_keys'] = true;
	}
	else {
		window['accept_all_keys'] = false;
	};
	window['response'] = undefined;
	document.onkeydown = function(event) {
		var key = String.fromCharCode(event.keyCode)
		var response_time = Date.now()
		var accepted_keys = window['keys_to_accept']
		if (window['accept_all_keys']) {
			window['response'] = key;
			window['response_time'] = response_time;
			//return {response: key, response_time: response_time};
		}
		else {
			if (accepted_keys.indexOf(key) != -1) {
				window['response'] = key;
				window['response_time'] = response_time;
				//return {response: key, response_time: response_time};
			};
		};
	};
	this.check_for_response();
};

Get_Key.prototype.check_for_response = function(){
	if (!window['response']) {
		setTimeout(this.check_for_response(), 100)
	}
	else {
		return response
	};
};
