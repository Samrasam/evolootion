/**
 * @authors Robert Donderer, Ruben La Biunda
 */

var Data = new Class({
	
	/////////////////////////////////////////////////////////////////////////////
	// constructor
	/////////////////////////////////////////////////////////////////////////////
	
	initialize : function(){
				 
		// default Werte der Variablen beim initialisieren
		this.v_snakeX			= 0;
		this.v_snakeY			= 0;
		this.v_snakeRadius		= 15;
		this.v_bodyParts		= 3;
		
		/* startzeit welche waehrend der Laufzeit herunter gezaehlt wird 
		 * und durch fressen von Objekten verlaengert werden kann.	
		 */
		this.v_gameTime			= 10000;	
		
		this.v_enemyArr 		= new Array();
		this.v_enemyRadius		= 10;
		this.v_spawnRate		= 1300;
		
		// Kollisionsabfrage wird alle 10 Millisekunden ausgefuehrt.
		this.v_collisionQuest	= 10;
		
		this.v_gameMode			= false;

		this.v_score			= 0;
		
		this.v_mouseX			= 0;
		this.v_mouseY			= 0;
		
		// getter und setter
		this.__defineSetter__("score", this.setScore);
	    this.__defineGetter__("score", this.getScore);
	    
	    this.__defineSetter__("gameMode", this.setGameMode);
	    this.__defineGetter__("gameMode", this.getGameMode);
	    
	    this.__defineSetter__("timer", this.setTimer);
	    this.__defineGetter__("timer", this.getTimer);
	},

	/////////////////////////////////////////////////////////////////////////////
	// setter- and getter-methods
	/////////////////////////////////////////////////////////////////////////////
	
	setGameMode: function(m) {
		console.log("Setting gameMode(Data):" + m);
		this.v_gameMode = m;
	},
	getGameMode: function() {
		// console.log("gameMode is being accessed (Data)");
		return this.v_gameMode;
	},
	
	setScore: function(s) {
		 // console.log("Setting score(Data):" + s);
		 this.v_score = s;
	},
	getScore: function() {
		// console.log("score is being accessed (Data)");
		return this.v_score;
	},
	
	setTimer: function(t) {
		 // console.log("Setting timer(Data):" + t);
		 this.v_gameTime = t;
	},
	getTimer: function() {
		// console.log("timer is being accessed (Data)");
		return this.v_gameTime;
	},

//	Attributes : {
//		// X-POSITION DER SCHLANGE
//		get snakeX() { 
//			return this.v_snakeX; 
//		},  
//	    set snakeX(snX) { 
//			this.v_snakeX = snX;
//	    },
//	    
//	    // Y-POSITION DER SCHLANGE
//	    get snakeY() {
//	    	return this.v_snakeY;
//	    	},  
//	    set snakeY(p_snakeY) {
//	    	this.v_snakeY = p_snakeY;
//	      },
//	    
//	    // MAUS X
//	    get mouseX()
//	      { return this.v_mouseX; },  
//	    set mouseX(p_mouseX) 
//	      { this.v_mouseX = p_mouseX;
//	        this.changed();
//	      },
//	    
//	    // MAUS Y
//	    get mouseY()
//	      { return this.v_mouseY; },  
//	    set mouseY(p_mouseY) 
//	      { this.v_mouseY = p_mouseY;
//	        this.changed();
//	      },
//
//	}

});