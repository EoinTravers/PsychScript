// Trial stimuli
var primes = new Array(
	"He was tired and went to ____", "John felt sorry, but the accident was not his ___", "The teacher wrote the problem on the ____", "Shuffle the cards before you ____", 
	"The pigs wallowed in the ____", "They went as far as they ____", "The derelict house will be torn____", "The captain wanted to stay with the sinking ___", 
	"He liked lemon and sugar in his ____", "They weren't finished, and time was running ____", "She was tired from running up the ____", "The new shoes were still in their ____", 
	"Mark went out for the morning ____", "He couldn't get the computer to ____", "Suddently, the screen went _____", "There was a message on the ____", 
	"Don't go out without a ____", "Finally, Jack could see what was the ____", "Her view was blocked by a ____", "A Mercedes is the best car you can ____", 
	"He hoped the visitors would have enough to ____", "Lisa kept going, even though the light was ____", "He left the paper on top of the ____", "The whole family was ready to ____", 
	"Most cats see well at ____", "Sharon dried the dishes with a ____", "Jean was glad that the affair was____", "The whole town came to hear the mayor ____", 
	"The game was called off when it began to ___", "Karen awoke after a bad ____", "The movers put the sofa down on the bare ___", "Betty had no sense of ____", 
	"He scraped the cold food from his ____", "The pizza was too hot to  ____", "She called her husband at his ____", "The wealthy child attended a private ____", 
	"The crime rate has gone up this ____", "The child was born with a rare ____", "The squirrel stored some nuts in the ____", "John poured himself a glass of ____", 
	"Her new shoes were the wrong ____", "The lawyer knew that his client was  ____", "The dog chased the cat up the ____", "The doctor said that his leg was ____", 
	"John must keep his dog on a ____", "Try not to slam the door when you ____", "They said the power would be off all ___", "I don't know what all the trouble was ____"
);

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

