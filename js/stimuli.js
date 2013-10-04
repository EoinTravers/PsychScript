var probes = [
	'backgrounds', 'widespread', 'dropping', 'workshop', 'stressed',
	'maintain', 'judgement', 'commands', 'courtyard', 'variance',
	'unfrocked', 'smoothies', 'bootlegged', 'croquettes', 'toothpastes',
	'stovepipe', 'lockstitch', 'passbooks', 'poolroom', 'hunchbacks',
	'boachers', 'unvaunts', 'stootied', 'twinking', 'resursed', 
	'forecorns', 'choremate', 'glaggers', 'dampbeat', 'trooting', 
	'gbjrvcpzdm', 'tbjcvh', 'bwrqlfv', 'whbpjnz', 'phvwkgfnjc', 
	'nbrlptw', 'bsrgvtq', 'kwpqcl', 'cqglhwnrjs', 'wtxnbkfz'
	];

codes = [
	'common_word', 'common_word', 'common_word', 'common_word', 'common_word',
	'common_word', 'common_word', 'common_word', 'common_word', 'common_word',
	'rare_word', 'rare_word', 'rare_word', 'rare_word', 'rare_word',
	'rare_word', 'rare_word', 'rare_word', 'rare_word', 'rare_word',
	'pseudo_word', 'pseudo_word', 'pseudo_word', 'pseudo_word', 'pseudo_word',
	'pseudo_word', 'pseudo_word', 'pseudo_word', 'pseudo_word', 'pseudo_word',
	'consonants', 'consonants', 'consonants', 'consonants', 'consonants',
	'consonants', 'consonants', 'consonants', 'consonants', 'consonants'
	];

var buttons = new Array('yes.png', 'no.png', 'start.png', 'next.png');
var button_imgs = preload_images(buttons, '../images/')

// If using error_feedback, you need to define the possible codes, and 
// the correct response for each.
var list_of_codes = new Array('common_word', 'rare_word','pseudo_word', 'consonants');
var correct_responses = new Array(1, 1, 2, 2);
