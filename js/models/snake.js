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
		this.body = this.assembleBody();
		//this.head_posX = this.snakeHead.attr('cx');
		//this.head_posY	= this.snakeHead.attr('cy');
}

    Snake.prototype.assembleBody = function() {
        var complete_body = stage.set();
        complete_body.push(this.drawHeadPart());
        for (var i = 0; i < this.bodyParts; i++) {
            complete_body.push(this.drawBodyPart())
        }
        return complete_body;
    };

	Snake.prototype.drawHeadPart = function(){
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

    Snake.prototype.drawBodyPart = function(){
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

    Snake.prototype.addBodyPart = function(){
        this.body.items.push(this.drawBodyPart());
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
                if (i == 0) {
                    var posHead = {
                        x: headX + newX,
                        y: headY + newY,
                        cx: headX + newX,
                        cy: headY + newY
                    };

                    this.body.items[i].stop().animate(posHead)
                } else {
                    var previousPart = this.body.items[i-1];

                    var posBody = {
                        x: previousPart.attr('x'),
                        y: previousPart.attr('y'),
                        cx: previousPart.attr('cx'),
                        cy: previousPart.attr('cy')
                    };
                    this.body.items[i].stop().animate(posBody)
                }
            }
        }
    };

    return Snake;
})();