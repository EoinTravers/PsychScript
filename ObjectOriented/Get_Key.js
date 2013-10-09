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
		console.log('key down')
		var key = String.fromCharCode(event.keyCode)
		var response_time = Date.now()
		var accepted_keys = window['keys_to_accept']
		console.log(accepted_keys)
		if (window['accept_all_keys']) {
			console.log(key)
			window['response'] = key;
			window['response_time'] = response_time;
			//return {response: key, response_time: response_time};
		}
		else {
			if (accepted_keys.indexOf(key) != -1) {
				console.log(key)
				window['response'] = key;
				window['response_time'] = response_time;
				//return {response: key, response_time: response_time};
			};
		};
	};
	return check_for_response();
};

var check_for_response = function(){
	if (!window['response']) {
		setTimeout("check_for_response()", 100)
	}
	else {
		alert(window['response'])
		return true
	};
};
