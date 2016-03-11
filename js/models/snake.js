/**
 * @authors Robert Donderer, Ruben La Biunda
 */

Snake = (function() {
	function Snake(radius, number_of_bodies){
        this.pos_x = ($('#stage').width() / 2);
        this.pos_y = ($('#stage').height() / 2);
		this.radius	= radius;
		this.bodyParts = number_of_bodies;
		this.body = this.assemble_body();
		//this.head_pos_x = this.snakeHead.attr('cx');
		//this.head_pos_y	= this.snakeHead.attr('cy');

}

    Snake.prototype.assemble_body = function() {
        var complete_body = [];
        complete_body.push(this.draw_head_part());
        for (var i = 0; i < this.bodyParts; i++) {
            complete_body.push(this.draw_body_part())
        }
        return complete_body;
    };

	Snake.prototype.draw_head_part = function(){
		stage.circle(this.pos_x, this.pos_y, this.radius).attr({
			fill : '#34e',
			stroke : '#aad',
			'stroke-width' : 2
		});
	};

    Snake.prototype.draw_body_part = function(){
			stage.circle(this.pos_x, this.pos_y, this.radius - 5).attr({
				fill : '#34e',
				stroke : '#aad',
				'stroke-width' : 2
			});
	};

    Snake.prototype.move_to = function(toX, toY){
		this.dx = toX - this.x_pos;
		this.dy = toY - this.y_pos;
		v_logicGame.moveTo(this.dx, this.dy, this.snakeHead);

		for (var i=0; i < this.body.length; i++){
			if(i == 0){
				this.body_move_to(this.snakeHead.attr('cx'),this.snakeHead.attr('cy'), i);
			}
			else{
				this.body_move_to(this.body[i-1].attr('cx'),this.body[i-1].attr('cy'), i);
			}
		}
	};

    Snake.prototype.body_move_to = function(toX, toY){
		this.dx = toX - this.x_pos;
		this.dy = toY - this.y_pos;

		// v_logicGame.follow(this.dx, this.dy, this.body);

	};

    Snake.prototype.add_bodypart = function(){
        this.body.push();
        return this.body
	};

    Snake.prototype.snake_movement = function() {
        dragSegment(0, mouseX, mouseY);
        var i;
        for(i = 0; i < x.length-1; i++) {
            dragSegment(i+1, x[i], y[i]);
        }
    };

    Snake.prototype.dragSegment = function(i, xin, yin) {
        dx = xin - x[i];
        dy = yin - y[i];
        angle = atan2(dy, dx);
        x[i] = xin - cos(angle) * segLength;
        y[i] = yin - sin(angle) * segLength;
        //stroke(23, 79, 4, 220);

        pushMatrix();
        translate(x[i], y[i]);
        rotate(angle);

        if ( i == x.length - 1 )
        {
            fill( c );
            noStroke();
            beginShape(TRIANGLES);
            vertex(0, 5);
            vertex(-2 * segLength, 0);
            vertex(0, -5);
            endShape();
        }

        if ( i == 0 )
        {
            // stroke(0, 255);
            noStroke();
            fill(0, 255);
            ellipse(segLength, -2, 3, 3);
            ellipse(segLength, 2, 3, 3);
            //point(segLength, -2);
            //point(segLength, 2);
        }

        popMatrix();
    };

    return Snake;
})();