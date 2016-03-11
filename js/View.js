/**
 * @author Robert Donderer
 */

var View = new Class({
	
	/////////////////////////////////////////////////////////////////////////////
	// constructor
	/////////////////////////////////////////////////////////////////////////////
	
	initialize : function(p_dataGUI, p_controllerGUI, p_controllerGame) {
		
		this.v_dataGUI			= p_dataGUI;
		this.v_controllerGUI	= p_controllerGUI;
		this.v_controllerGame	= p_controllerGame;
		
		
		this.hoverMe = function(p){
			p.hover(this.f_in, this.f_out);
		};
		
		unhoverMe = function(p){
			p.unhover(this.f_in, this.f_out);
		},
		
		// hiermit faded der Button nur aus und wird versteckt, die hover-funktion bleibt jedoch erhalten. Dies führt zu Fehlern.
//		hideMe = function(e){
//			var anim = Raphael.animation({opacity : 0}, 1000);
//			e.animate(anim);
//		};
		
		this.f_in = function(){
			 this.attr({fill: "red"});
		};
		
		// beim verlassen der Maus wird der in g gespeicherte glow effekt wieder entfernt
		this.f_out = function(){
			this.attr({fill: "#fff"});
		};
		
		//erstellung des menues im constructor
		this.showMenu();
	},

	/////////////////////////////////////////////////////////////////////////////
	// methods
	/////////////////////////////////////////////////////////////////////////////
	
	showMenu : function(){

		menuWrapper = paper.rect(300, 150, 200, 250, 10).attr({
			fill : '#123',
			stroke : '#000'
		});
		
		startText = paper.text(400, 220, "Spielen").attr({
			"font-size" : 20,
			"font-family" : "Arial, Helvetica, sans-serif"
		});
		
		buttonStart = paper.rect(325, 180, 150, 75, 10).attr({
			fill : '#fff',
			stroke : '#000',
			'stroke-width' : 2,
			opacity : 0.1
		});
			
		buttonStart.click(function(event){
			// wird nicht verwendet, da die Buttons ohnehin gelöscht werden und somit auch nicht mehr hoverable sind.
//			unhoverMe(buttonStart);			
//			unhoverMe(buttonScore);

			menuWrapper.remove();
			startText.remove();
			buttonStart.remove();
			hsText.remove();
			buttonScore.remove();
			
			v_controllerGame.gamePlay();

		});
		
		this.hoverMe(buttonStart);
		
		hsText = paper.text(400, 330, "Highscore").attr({
			"font-size" : 20,
			"font-family" : "Arial, Helvetica, sans-serif"
		});
		
		buttonScore = paper.rect(325, 290, 150, 75, 10).attr({
			fill : '#fff',
			stroke : '#000',
			'stroke-width' : 2,
			opacity: 0.1
		});
		
		buttonScore.click(function(){
			menuWrapper.remove();
			startText.remove();
			buttonStart.remove();
			hsText.remove();
			buttonScore.remove();
			
			v_controllerGame.highScore();
		});
		
		this.hoverMe(buttonScore);
	},
	
	
	
	createEnd : function() {
			//gameEnd.style.visibility = "visible";
	}
	
});