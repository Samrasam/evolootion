/**
 * @authors Robert Donderer, Ruben La Biunda
 */

Game = (function() {
    var mouseX = null,
        mouseY = null,
        padding = 14;

	function Game(data){
		this.score = data.score;
        this.timer = data.start_time;
        this.spawn_rate = data.spawn_rate;

        this.food = [];
        this.snake = new Snake(12, 0);
	}

	Game.prototype.startGame = function() {
        console.log('start game');
        this.startIntervals();
        this.mouseMove();
    };

    Game.prototype.countDown = function(){
		if (this.timer <= 0) {
			this.gameOver();
		}
		else{
			this.timer -= 100;
		}
        $('#timer').text(this.timer/1000);
	};

    Game.prototype.redraw = function() {
        this.snake.moveTo(mouseX, mouseY);
	};

    Game.prototype.gameOver = function(){
        console.log("game over");
        this.clearIntervals();
        this.removeMouseMove();
        stage.clear();
    };
	
	/* ----------------------------------------------------
	 * event handler
	 * ---------------------------------------------------- */
    Game.prototype.mouseMove = function(){
		$('#stage').mousemove(this.mouseMoveHandler.bind(this));
	};

    Game.prototype.mouseMoveHandler = function(event){
        var canvas     = $(stage.canvas);
        var offset      = canvas.offset();
        mouseX = event.pageX - offset.left;
        mouseY = event.pageY - offset.top;
    };

    Game.prototype.removeMouseMove = function(){
		$('#stage').unbind('mousemove', this.mouseMoveHandler);
	};

    Game.prototype.startIntervals = function() {
        this.redrawInterval = window.setInterval(this.redraw.bind(this), 1000/FPS);
        this.countDownInterval = window.setInterval(this.countDown.bind(this), 100);

        this.spawnFoodInterval = window.setInterval(this.spawnFood.bind(this), this.spawn_rate);
        this.checkFoodCollisionInterval = window.setInterval(this.checkFoodCollision.bind(this), 50);
        this.removeFoodInterval = window.setInterval(this.removeFood.bind(this), 50);
    };

    Game.prototype.clearIntervals = function() {
        clearInterval(this.countDownInterval);
        clearInterval(this.spawnFoodInterval);
        clearInterval(this.checkFoodCollisionInterval);
        clearInterval(this.removeFoodInterval);
        clearInterval(this.redrawInterval);
    };

    Game.prototype.spawnFood = function() {
        var pos_x = Math.max(padding, Math.random() * $('#stage').width() - padding);
        var pos_y = Math.max(padding, Math.random() * $('#stage').height() - padding);
        var radius = Math.floor((Math.random() * 10) + 3);

        var food = new Food(pos_x, pos_y, radius);
        this.food.push(food);
    };

    Game.prototype.checkFoodCollision = function() {
        for(var i = 0; i < this.food.length; i++){
            var currentFood = this.food[i];
            var deltaX = this.snake.body.items[0].attr('cx') - currentFood.body.attr('cx');
            var deltaY = this.snake.body.items[0].attr('cy') - currentFood.body.attr('cy');
            var delta = Math.sqrt(((deltaX * deltaX) + (deltaY * deltaY)));
            if(delta < this.snake.radius + currentFood.radius){
                currentFood.to_delete = true;
                this.timer += 940;
                this.score += 1;

                // show score
                $('#score').text(this.score);
                this.snake.addBodyPart();
            }
        }
    };

    Game.prototype.checkEnemyCollision = function() {

    };

    Game.prototype.removeFood = function(){
        for (var i = 0; i < this.food.length; i++){
            if (this.food[i].to_delete){
                this.food[i].body.remove();
                this.food.splice(i,1);
            }
        }
    };

    return Game;
})();
