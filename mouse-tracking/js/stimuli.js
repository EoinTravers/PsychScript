// Trial stimuli
var probes = new Array(
	"bed", "responsibility", "paper", "play", 
	"dirt", "wanted", "apart", "boat", 
	"tea", "short", "stairs", "box", 
	"papers", "stop", "blank", "fridge", 
	"scarf", "problem", "tree", "drive", 
	"drink", "fading", "pile", "eat", 
	"nhite", "taull", "ovar", "speek", 
	"rayn", "nitemair", "fhlore", "humah", 
	"goat", "talent", "billboard", "father", 
	"college", "wrist", "ankle", "planet", 
	"efent", "lettor", "klothes", "cource", 
	"craud", "troubel", "rotton", "delite"
);

codes = new Array(
	"aw", "aw", "aw", "aw", 
	"aw", "aw", "aw", "aw", 
	"aw", "aw", "aw", "aw", 
	"aw", "aw", "aw", "aw", 
	"aw", "aw", "aw", "aw", 
	"aw", "aw", "aw", "aw", 
	"anw", "anw", "anw", "anw", 
	"anw", "anw", "anw", "anw", 
	"iaw", "iaw", "iaw", "iaw", 
	"iaw", "iaw", "iaw", "iaw", 
	"ianw", "ianw", "craud", "ianw", 
	"ianw", "ianw", "ianw", "ianw"
);

var buttons = new Array('yes.png', 'no.png', 'start.png', 'next.png');
var button_imgs = preload_images(buttons, 'images/')

var list_of_codes = new Array('common_word', 'rare_word','pseudo_word', 'consonants');
var correct_responses = new Array(1, 1, 2, 2);
