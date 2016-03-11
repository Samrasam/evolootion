/**
 * @authors Robert Donderer, Ruben La Biunda
 */
var FPS = 15;
var stage;

$(document).ready(function() {
	stage = Raphael("stage");
    //stage = $('stage');
    //bonsai.run(stage, {url: 'game.js', width: 980, height: 740});
	var data				= new Data();
	//var database_adapter	= new DatabaseAdapter(data);
	var evolootion	 		= new Game(data);

	$('#start').click(function() {
        evolootion.start_game()
    });
});