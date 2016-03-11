/**
 * @authors Robert Donderer, Ruben La Biunda
 */

Game = (function() {

	function Game(data){
		this.score = data.score;
        this.timer = data.start_time;
        this.spawn_rate = data.spawn_rate;
        this.enemies = [];
	}

	Game.prototype.start_game = function() {
        console.log('start game');
        this.snake = new Snake(20, 0);
        this.start_spawn();
        this.mouse_move();
		//interval = window.setInterval(this.redraw, 1000/FPS);
		window.setInterval(this.count_down, 100);
	};

    Game.prototype.game_over = function(){
        console.log("Dein Punktestand: " + this.score);
        // the stage has to be cleared
        this.enemies = [];
    };

    Game.prototype.count_down = function(){
		if (timer == 0) {
			clearInterval(time_check);
			game_over();
		}
		else{
			this.timer -= 100;
		}
	};

    Game.prototype.redraw = function(mouse_x, mouse_y){
		this.snake.move_to(mouse_x, mouse_y);
	};
	
	/////////////////////////////////////////////////////////////////////////////
	// event handlers
	/////////////////////////////////////////////////////////////////////////////
    Game.prototype.mouse_move = function(){
		$('#stage').mousemove(this.mouse_move_handler);
	};

    Game.prototype.mouse_move_handler = function(event){
        var offset = $(this).offset();
        var mouse_x = event.pageX - offset.left;
        var mouse_y = event.pageY - offset.top;
    };

    // removeMouseMove has to delete mouseMove-Events. apparently not in use.
    Game.prototype.remove_mouse_move = function(){
		console.log("remove_mouse_move");
		$('#stage').removeEvent('mousemove', this.mouse_move_handler);
	};

    Game.prototype.move_to = function(to_x, to_y, object){
        this.dx = to_x;
        this.dy = to_y;
        var anim = Raphael.animation({'cx' : this.dx, 'cy' : this.dy}, 250);
        object.animate(anim);
    };

    Game.prototype.start_spawn = function() {
        window.setInterval(this.spawn_enemy(this.enemies), this.spawn_rate);
        window.setInterval(this.checkSnakeCollision(this.enemies), 100);
        window.setInterval(this.remove_enemies(this.enemies), 100);
    };

    Game.prototype.spawn_enemy = function(enemies) {
        var pos_x = Math.random() * $('#stage').width();
        var pos_y = Math.random() * $('#stage').height();

        var enemy = new Enemy(pos_x, pos_y, 10);
        enemies.push(enemy);
        return enemies;
    };

    Game.prototype.checkSnakeCollision = function(enemies){
        for(var i = 0; i < enemies.length; i++){
            var current_enemy = enemies[i];
            console.log(this.snake);
            var delta_x = this.snake.pos_x - current_enemy.x;
            var delta_y = this.snake.pos_y - current_enemy.y;
            var delta = Math.sqrt(((delta_x * delta_x) + (delta_y * delta_y)));
            console.log(delta_x, delta_y);
            if(delta < this.snake.radius + current_enemy.radius){
                current_enemy.to_delete = true;
                this.timer += 700;
                this.score += 1;

                // hiermit wird der Score ausgegeben bzw. auf dem GUI angezeigt werden.
                $('#score').innerHTML = this.score;
                this.snake.add_bodypart();
            }

        }
    };

    // clear enemy array
    Game.prototype.remove_enemies = function(enemies){
        for (var i = 0; i < enemies.length; i++){
            if (enemies[i].to_delete){
                enemies[i].remove();
                enemies.splice(i,1);
            }
        }
        return enemies;
    };

    return Game;
})();