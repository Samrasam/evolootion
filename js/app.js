/**
 * @authors Robert Donderer, Ruben La Biunda
 */
var FPS = 60;
var stage;

$(document).ready(function() {
	stage = Raphael("stage");
	var data = null,
		game = null;

	var stopHandler = function(event, element) {
		game.gameOver();
		data = null;
		game = null;
		$(element).unbind(event).text("Start Game");
		$(element).on("click", function(event){startHandler(event, this)});
	};

	var startHandler = function(event, element) {
		data = new Data();
		game = new Game(data);
		game.startGame();
		$(element).unbind(event).text("Stop Game");
		$(element).on("click", function(event){stopHandler(event, this)});
	};

	$(".start").on("click", function(event) {
		startHandler(event, this)
	});

});