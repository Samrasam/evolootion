/**
 * @authors Robert Donderer, Ruben La Biunda
 */

var LogicGame = new Class({
	
	/////////////////////////////////////////////////////////////////////////////
	// constructor
	/////////////////////////////////////////////////////////////////////////////
	
	initialize : function(p_dataGame, p_serviceGame) {
		
		this.v_dataGame = p_dataGame;
		this.v_serviceGame = p_serviceGame;
		
	},
	
	/////////////////////////////////////////////////////////////////////////////
	// logic-snake-methods
	/////////////////////////////////////////////////////////////////////////////

	/*
	 * Die moveTo-Funktion bewegt raphael-objekte, berechnet aber nichts.
	 * Die Verschiebungsdaten werden von der snakeMoveTo berechnet & uebergeben.
	 */
	moveTo : function(toX, toY, object){
		
		this.dx = toX;
		this.dy = toY;
		
		var anim = Raphael.animation({'cx' : this.dx, 'cy' : this.dy}, 250);
		object.animate(anim);
	},
	
	/*
	 * Diese Funktion wird von allen bodyParts angesprochen und fuehrt
	 * die letztendlich sichtbare Animation auf der canvas aus.
	 * 
	 * *bis auf den Timer identisch mit moveTo
	 */
	follow : function(toX, toY, object){
		this.dx = toX;
		this.dy = toY;
		
		var anim = Raphael.animation({'cx' : this.dx, 'cy' : this.dy}, 50);
		object.animate(anim);
	},

	/////////////////////////////////////////////////////////////////////////////
	// logic-gameMode-methods
	/////////////////////////////////////////////////////////////////////////////
	
	/* 
	 * Die gamestart-Funktion wird nach dem Klick auf den "Game Start"-Button
	 * von dem conroller aufgerufen, resettet alle relevanten Spielelemente
	 * und initialisiert den Avatar sowie die Gegner
	 */
	gameStart : function() {
		console.log("gameStart");
		
		// setzten des spielmodus auf true
		v_data.gameMode = true;
		
		// (zurueck-)setzen des Score
		v_data.score = 0;
		
		/* 
		 * initialisieren des Avatars mit der in der Data abgefragten 
		 * Position, dem Radius und der default-Anzahl der Koerperteile.
		 */
		v_snake = new Snake(v_data.v_snakeX, v_data.v_snakeY, v_data.v_snakeRadius, v_data.v_bodyParts);
				
		// initialisieren der Spanwrate von Gegnern
		this.startSpawn();
	},
	
	gameOver: function(){
		v_data.gameMode = false;
		console.log("game over");
		// alert( v_snake.toSource() );
		alert("Dein Punktestand: " + v_data.v_score);
		
		// alle objekte auf der Buehne MUESSEN noch geloescht werden!!!
	},
	
	/////////////////////////////////////////////////////////////////////////////
	// logic-enemy-methods
	/////////////////////////////////////////////////////////////////////////////
	
	// Intervalle für die collision-Detection
	startSpawn : function() {
		spawnEnemyInterval 		= setInterval(this.spawnEnemy, v_data.v_spawnRate);
		collisionDetetection 	= setInterval(this.checkSnakeCollision, v_data.v_collisionQuest);
		clearMyArray 			= setInterval(this.clearArrays, v_data.v_collisionQuest);
	},
	
	spawnEnemy : function() {
		
		var posX = Math.random() * paper.width;
		var posY = Math.random() * paper.height;
		
			if(v_data.gameMode == true){
				var enemy = paper.circle(posX, posY, v_data.v_enemyRadius).attr({
					fill : '#B00',
					stroke : '#F00',
					'stroke-width' : 2
				});
				enemy.toDelete = false;
				/* mit jedem Aufruf dieser Funktion wird dem Array v_enemyArr
				 * ein neues Element des Typs enemy hinten angehängt.
				 */
				v_data.v_enemyArr.push(enemy);	
			}
			else return;
	},
	
	checkSnakeCollision : function(){
		for(var i = 0; i<v_data.v_enemyArr.length; i++){
			var currentEnemy = v_data.v_enemyArr[i];
			
			var deltaX = v_snake.snakeHead.attr('cx') - currentEnemy.attr('cx');
			var deltaY = v_snake.snakeHead.attr('cy') - currentEnemy.attr('cy');
			
			var delta = Math.sqrt(((deltaX * deltaX) + (deltaY * deltaY)));
			
			/*
			 * wenn die Entfernung der beiden Objekte zueinander kleiner 
			 * ist als die Länge beider Radien muss eine collision
			 * statt gefunden haben.
			 */ 
			if(delta < v_snake.snakeHead.attr('r') + currentEnemy.attr('r')){
				currentEnemy.toDelete = true;
				
				v_data.score += 1;
				
				// hiermit wird der Score ausgegeben bzw. auf dem GUI angezeigt werden.
				document.getElementById('score').innerHTML = v_data.score;
				
				v_data.v_gameTime = v_data.v_gameTime + 700;
				
				// wird leider nicht erhoeht, da die body parts bisher nur einmal beim init abgerufen werden. 
				//v_snake.v_bodyParts += 1;
			};
			
		};
	},
	
	// Bereinigen des Gegner-Arrays
	clearArrays : function(){
		var i=0;
		while (i<v_data.v_enemyArr.length) {
			if (v_data.v_enemyArr[i].toDelete){
				v_data.v_enemyArr[i].remove();
				v_data.v_enemyArr.splice(i,1);
			}
			else
				i++;
		}
	}
	
	/////////////////////////////////////////////////////////////////////////////
	// end of class
	/////////////////////////////////////////////////////////////////////////////
	
});