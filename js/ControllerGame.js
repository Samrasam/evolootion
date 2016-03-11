/**
 * @authors Robert Donderer, Ruben La Biunda
 */

var ControllerGame = new Class({
	
	/////////////////////////////////////////////////////////////////////////////
	// constructor
	/////////////////////////////////////////////////////////////////////////////
	initialize : function(p_data, p_logicGame) {
		
		this.v_data 		= p_data;
		this.v_logicGame 	= p_logicGame;		
		
	},
	
	/////////////////////////////////////////////////////////////////////////////
	// methods
	/////////////////////////////////////////////////////////////////////////////	

	gamePlay : function() {
		console.log("controller-gamePlay");
		
		this.mouseMove();
		
		// 
		v_logicGame.gameStart();
		
		// ein Intervall das die redraw 25 mal in der Sekunde ausfuehrt.
		v_interval = window.setInterval(this.redraw, 1000/FPS);
		
		v_timeCheck = window.setInterval(this.countDown, 100); //Zeitcheck im Zehntel-Sekundentakt
	},
	
	countDown : function(){
		if (v_data.timer == 0) {
			// beendet den counter
			clearInterval(v_timeCheck);
			console.log("rufe logic.gameOver auf");
			v_logicGame.gameOver();
		}
		else{
			v_data.timer -= 100; //zieht pro durchlauf 1 Zehntel Sekunde ab
			
			// hiermit wird der timer auf dem GUI angezeigt. dafür greife ich auf den Knoten "timer" des DOM zu.
			document.getElementById('timer').innerHTML = v_data.timer;
		}
	},
	
	// updatet die canvas sobald aufgerufen 
	redraw : function(){
		v_snake.snakeMoveTo(v_data.v_mouseX, v_data.v_mouseY);
	},
	
	/////////////////////////////////////////////////////////////////////////////
	// Event Handler
	/////////////////////////////////////////////////////////////////////////////
	
	// fügt dem element "paper" (der canvas) ein neues mousemove-Event hinzu.
	mouseMove : function(){
		$('paper').addEvent('mousemove', this.mouseMoveHandler);
	},
	
	/* diese Funktion ist dafuer gedacht die mouseMove-Funktion nur
	 * 40 mal pro Sekunde auszufuehren um die Performance des Spiels durch
	 * den verringerten Event-Aufruf zu beschleunigen.
	 */
	// DIESE FUNKTION WIRD DERZEIT NICHT VERWENDET
	controlMouseMove : function(){
		MyInterval = window.setInterval(this.mouseMove, 40);
	},
	
	/*
	 * Die removeMouseMove soll, wie es der anglistische Name vermuten
	 * laesst, die mouseMove-Events wieder loeschen, 
	 * was derzeit jedoch nicht verwendet wird.
	 */
	// DIESE FUNKTION WIRD DERZEIT NICHT VERWENDET
	removeMouseMove : function(){
		console.log("removeMousMove");
		$('paper').removeEvent('mousemove', this.mouseMoveHandler);
	},
	
	// BERECHNUNG ZUM MAUSMOVE EVENT
	mouseMoveHandler : function(e){
		// Cursor-Koordinaten sind relativ zum paper
		var mouseX = e.page.x - $('paper').getPosition().x;
		var mouseY = e.page.y - $('paper').getPosition().y;
		
		// 
		v_data.v_mouseX = mouseX;
		v_data.v_mouseY = mouseY;
		
	}

});