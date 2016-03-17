/**
 * @authors Robert Donderer, Ruben La Biunda
 */

// Singleton Pattern
var Snake = (function() {
	function Snake(radius, number_of_bodies){
        this.posX = ($('#stage').width() / 2);
        this.posY = ($('#stage').height() / 2);
		this.radius	= radius;
		this.bodyParts = number_of_bodies;
		this.body = this.assemble_body();
		//this.head_posX = this.snakeHead.attr('cx');
		//this.head_posY	= this.snakeHead.attr('cy');
}

    Snake.prototype.assemble_body = function() {
        var complete_body = stage.set();
        complete_body.push(this.draw_head_part());
        for (var i = 0; i < this.bodyParts; i++) {
            complete_body.push(this.draw_body_part())
        }
        return complete_body;
    };

	Snake.prototype.draw_head_part = function(){
		var head = stage.circle(
            this.posX,
            this.posY,
            this.radius
        ).attr({
			fill : '#34e',
			stroke : '#aad',
			'stroke-width' : 2
		});
        return head;
	};

    Snake.prototype.draw_body_part = function(){
        var body = stage.circle(
            this.body.items[this.body.items.length-1].attr('cx'),
            this.body.items[this.body.items.length-1].attr('cx'),
            this.radius - 5
        ).attr({
				fill : '#34e',
				stroke : '#aad',
				'stroke-width' : 2
			});
        return body;
	};

    Snake.prototype.add_bodypart = function(){
        this.body.items.push(this.draw_body_part());
        return this.body
	};

    Snake.prototype.moveTo = function(mouseX, mouseY) {

        // unit vector calculation
        var headX = this.body.items[0].attr('cx');
        var headY = this.body.items[0].attr('cy');
        var x = mouseX - headX;
        var y = mouseY - headY;
        var speed = this.radius;
        var magnitude = Math.sqrt(x * x + y * y);
        var newX = x / magnitude * speed;
        var newY = y / magnitude * speed;

        if (Math.abs(x) < 3 || Math.abs(y) < 3) {
            // do nothing
        }
        else {
            for (var i = 0, j = this.body.items.length; i < j; i++) {
                // head move to mouse WITH FIXED SPEED!!!
                if (i == 0) {
                    var posHead = {
                        x: headX + newX,
                        y: headY + newY,
                        cx: headX + newX,
                        cy: headY + newY
                    };

                    this.body.items[i].animate(posHead)
                }
                // body follow previous body WITH DISTANCE!!!
                else {
                    var previousPart = this.body.items[i-1];

                    var posBody = {
                        x: previousPart.attr('x'),
                        y: previousPart.attr('y'),
                        cx: previousPart.attr('cx'),
                        cy: previousPart.attr('cy')
                    };
                    this.body.items[i].animate(posBody)
                }
            }
        }
    };

    return Snake;
})();