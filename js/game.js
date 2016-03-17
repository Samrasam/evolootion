/**
 * @authors Robert Donderer, Ruben La Biunda
 */

Game = (function() {
    var mouseX = $('#stage').width() / 2,
        mouseY = $('#stage').height() / 2,
        padding = 14;

	function Game(data){
		this.score = data.score;
        this.timer = data.start_time;
        this.spawn_rate = data.spawn_rate;

        this.food = [];
        this.snake = new Snake(12, 0);
	}

	Game.prototype.start_game = function() {
        console.log('start game');
        this.start_spawn();
        this.mouse_move();
		this.redraw_interval = window.setInterval(this.redraw.bind(this), 1000/FPS);
		this.count_down_interval = window.setInterval(this.count_down.bind(this), 100);
	};

    Game.prototype.count_down = function(){
		if (this.timer == 0) {
			this.game_over();
		}
		else{
			this.timer -= 100;
		}
        $('#timer').text(this.timer/100);
	};

    Game.prototype.redraw = function() {
        this.snake.moveTo(mouseX, mouseY);
	};

    Game.prototype.game_over = function(){
        console.log("game over");
        // clear all intervals
        clearInterval(this.count_down_interval);
        clearInterval(this.spawn_food_interval);
        clearInterval(this.check_collision_interval);
        clearInterval(this.remove_food_interval);
        clearInterval(this.redraw_interval);

        // remove mousemove
        this.remove_mouse_move();

        // clear the stage
        this.food = [];

        stage.clear();
    };
	
	/////////////////////////////////////////////////////////////////////////////
	// event handlers
    Game.prototype.mouse_move = function(){
		$('#stage').mousemove(this.mouse_move_handler.bind(this));
	};

    Game.prototype.mouse_move_handler = function(event){
        var canvas     = $(stage.canvas);
        var offset      = canvas.offset();
        mouseX = event.pageX - offset.left;
        mouseY = event.pageY - offset.top;

        //this.snake.moveTo(mouseX, mouseY);
    };

    // removeMouseMove has to delete mouseMove-Events. apparently not in use.
    Game.prototype.remove_mouse_move = function(){
		$('#stage').unbind('mousemove', this.mouse_move_handler);
	};

    Game.prototype.start_spawn = function() {
        this.spawn_food_interval = window.setInterval(this.spawn_food.bind(this), this.spawn_rate);
        this.check_collision_interval = window.setInterval(this.check_collision.bind(this), 50);
        this.remove_food_interval = window.setInterval(this.remove_food.bind(this), 50);
    };

    Game.prototype.spawn_food = function() {
        var pos_x = Math.max(padding, Math.random() * $('#stage').width() - padding);
        var pos_y = Math.max(padding, Math.random() * $('#stage').height() - padding);
        var radius = Math.floor((Math.random() * 10) + 3);

        var food = new Food(pos_x, pos_y, radius);
        this.food.push(food);
    };

    Game.prototype.check_collision = function() {
        for(var i = 0; i < this.food.length; i++){
            var current_food = this.food[i];
            var delta_x = this.snake.body.items[0].attr('cx') - current_food.body.attr('cx');
            var delta_y = this.snake.body.items[0].attr('cy') - current_food.body.attr('cy');
            var delta = Math.sqrt(((delta_x * delta_x) + (delta_y * delta_y)));
            if(delta < this.snake.radius + current_food.radius){
                current_food.to_delete = true;
                this.timer += 1000;
                this.score += 1;

                // show score
                $('#score').text(this.score);
                this.snake.add_bodypart();
            }

        }
    };

    // clear food array
    Game.prototype.remove_food = function(){
        for (var i = 0; i < this.food.length; i++){
            if (this.food[i].to_delete){
                this.food[i].body.remove();
                this.food.splice(i,1);
            }
        }
    };

    return Game;
})();
