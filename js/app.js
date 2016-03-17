/**
 * @authors Robert Donderer, Ruben La Biunda
 */
var FPS = 60;
var stage;

$(document).ready(function() {
	stage = Raphael("stage");

	$('#start').click(function() {
		var data = new Data();
		//var database_adapter = new DatabaseAdapter(data);
		var game = new Game(data);
		game.start_game().bind(game);
	})


});