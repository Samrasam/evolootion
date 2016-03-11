/**
 * @authors Robert Donderer, Ruben La Biunda
 */

var Snake = new Class({
	
	/////////////////////////////////////////////////////////////////////////////
	// constructor
	/////////////////////////////////////////////////////////////////////////////
	
	initialize : function(x, y, r, b){
		this.x_pos	= x;
		this.y_pos	= y;
		this.radius	= r;
		this.bodyParts = b;
		this.body = new Array();

		// Vorlage fuer die Koerperteile der snake
		
		for (var i=0; i < this.bodyParts; i++){
						
			this.snakeBody = paper.circle(this.x_pos, this.y_pos, this.radius - 5).attr({
				fill : '#34e',
				stroke : '#aad',
				'stroke-width' : 2
			});		
			this.body.push(this.snakeBody);
			
		};
		
		// Vorlage für den Kopf
		this.snakeHead = paper.circle(this.x_pos, this.y_pos, this.radius).attr({
			fill : '#34e',
			stroke : '#aad',
			'stroke-width' : 2
		});
		
		this.x_pos 	= this.snakeHead.attr('cx');
		this.y_pos	=  this.snakeHead.attr('cy');
		
},
	
	// berechnet das delta für die moveTo, bewegt aber nichts (siehe moveTo)
	snakeMoveTo : function(toX, toY){
		//console.log("SnMoTo toX: " + toX);
		this.dx = toX - this.x_pos;
		this.dy = toY - this.y_pos;
		//console.log("v_data.v_snakeX " + v_data.v_snakeX);
		v_logicGame.moveTo(this.dx, this.dy, this.snakeHead);
		
		for (var i=0; i < this.body.length; i++){
			if(i == 0){
				this.bodyMoveTo(this.snakeHead.attr('cx'),this.snakeHead.attr('cy'), i);
			}
			else{
				this.bodyMoveTo(this.body[i-1].attr('cx'),this.body[i-1].attr('cy'), i);
			}
		}
	},
	
	bodyMoveTo : function(toX, toY, i){
		this.dx = toX - this.x_pos;
		this.dy = toY - this.y_pos;
		
		v_logicGame.follow(this.dx, this.dy, this.body[i]);
				
	}
});