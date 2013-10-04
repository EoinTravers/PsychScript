#PsychScript 
## A HTML5/Javascript library for online behavioural experiments.
------------------------------

PsychScript is intended to make the process of creating and running psychology experiments online much less bewildering.
It consists of the following:
 - JavaScript functions which abstract away as much of the difficult programming as possible
 - HTML templates to create the structure of many standard paradigms.
 - CSS to make it all look pretty.
 - The necessary server-side code (PHP) to save responses to a database.

------------------------------

The idea is to allow users' to write one line of PsychScript to make the experiment do what they want it to, rather than a dozen of JavaScript.

For example, collecting a keyboard response, which previously would have looked something this:

```javascript
var accepted_keys = new Array('a', 'b', 'c');
var response
document.onkeydown = function(event) {
    var key = String.fromCharCode(event.keyCode)
	if (accepted_keys.indexOf(key) != -1) {
		response = key
	}
	else if (accepted_keys.indexOf(key.toLowerCase()) != -1) {
		// In case acccepted_keys were given in lowercase.
		response = key
	};
};

```

PsychScript allows us to achieve the same with:
```javascript
var response = get_keyboard_response('abc');
```
A definite improvement!


---------------------

###Demos
To see some of PsychScript in action, check out the following demos:
 - [Keyboard Response](http://www3.qub.ac.uk/researchingreasoning/psychscript/keyboard_response/)
 - [Click Response](http://www3.qub.ac.uk/researchingreasoning/psychscript/click_response/)
 - [Mouse-tracking](http://www3.qub.ac.uk/researchingreasoning/psychscript/mouse_tracking/)


---------------------

###Progress

Please note that this project is in development, and is **not yet ready for use**.

However, there are a number of templates which are fully functional, specifically versions of the classic lexical decision task, using either keyboard responses, onscreen buttons, or (in Beta) mouse-tracking.
There will be online demos of these features available in the near future.

---------------------

###Contribute
This is a project for everyone, and all contributions are welcome.

The immediate problems to be solved include:
 - Abstracting as much code as possible away from the end user, while still allowing flexibility through the passing of arguments to functions.
 - Making it easier to create HTML as required by the experimenter (hopefully using existing open tools).
 - Testing and benchmarking, especially with regard to timing accuracy.
 - Creating templates for more common paradigms.

Looking further ahead, it might be nice someday to include the following:
 - A GUI for building experiments (like [OpenSesame](http://osdoc.cogsci.nl) or EPrime)
 - Mobile support
 - A [Behavior Research Methods](http://www.springer.com/psychology/cognitive+psychology/journal/13428) paper?
