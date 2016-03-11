/**
 * @authors Robert Donderer, Ruben La Biunda
 */

/////////////////////////////////////////////////////////////////////////////
// global variables
/////////////////////////////////////////////////////////////////////////////

// Raphael-canvas
var paper;

var FPS = 15;

var v_snake = null;

/////////////////////////////////////////////////////////////////////////////
// main-function
/////////////////////////////////////////////////////////////////////////////
window.addEvent('domready', function() {
	// Zeichenflaeche definieren (Div-Element, Breite, Hoehe)
	paper = Raphael("paper", 800, 600);

	//Konstruktoraufrufe
	this.v_data				= new Data();
	this.v_serviceGame		= new ServiceGame(this.v_data);
	this.v_logicGame 		= new LogicGame(this.v_data, this.v_serviceGame);
	this.v_logicSnake 		= new LogicSnake(this.v_data, this.v_serviceGame);
	this.v_controllerGame	= new ControllerGame(this.v_data, this.v_logicGame);
	this.v_view				= new View(this.v_data, this.v_controllerGUI, this.v_controllerGame);	
});