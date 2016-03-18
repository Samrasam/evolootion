/**
 * @authors Robert Donderer, Ruben La Biunda
 */

const Snake = (function() {
	function Snake(radius, number_of_bodies){
        this.posX = ($('#stage').width() / 2);
        this.posY = ($('#stage').height() / 2);
		this.radius	= radius;
		this.bodyParts = number_of_bodies;
		this.body = this.assembleBody();
}

    Snake.prototype.assembleBody = function() {
        const complete_body = stage.set();
        complete_body.push(this.drawHeadPart());
        for (var i = 0; i < this.bodyParts; i++) {
            complete_body.push(this.drawSection())
        }
        return complete_body;
    };

	Snake.prototype.drawHeadPart = function(){
		const head = stage.circle(
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

    Snake.prototype.drawSection = function(){
        const body = stage.circle(
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
        this.body.items.push(this.drawSection());
        return this.body
	};

    Snake.prototype.moveTo = function(mouseX, mouseY) {

        // unit vector calculation
        const headX = this.body.items[0].attr('cx');
        const headY = this.body.items[0].attr('cy');
        const x = mouseX - headX;
        const y = mouseY - headY;
        const speed = this.radius;
        const magnitude = Math.sqrt(x * x + y * y);
        const newX = x / magnitude * speed;
        const newY = y / magnitude * speed;

        if (Math.abs(x) < 3 || Math.abs(y) < 3) {
            // do nothing
        }
        else {
            this.body.items.forEach(function (body, index, array) {
                if (index == 0) {
                    const posHead = {
                        x: headX + newX,
                        y: headY + newY,
                        cx: headX + newX,
                        cy: headY + newY
                    };
                    return body.stop().animate(posHead)
                } else {
                    const previousPart = array[index-1];
                    const posBody = {
                        x: previousPart.attr('x'),
                        y: previousPart.attr('y'),
                        cx: previousPart.attr('cx'),
                        cy: previousPart.attr('cy')
                    };
                    return body.stop().animate(posBody)
                }
            });
        }
    };

    return Snake;
})();