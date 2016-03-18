// ES6

class Enemy {
    constructor(posX, posY, radius){
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.padding = 14;
        this.body = drawBody();
    }

    drawBody() {
        return stage.circle(this.posX, this.posY, this.radius).attr({
            fill : '#FF8000',
            stroke : '#99000',
            'stroke-width' : 2
        });
    }

    moveRandom() {
        const posX = Math.max(this.padding, Math.random() * $('#stage').width() - this.padding);
        const posY = Math.max(this.padding, Math.random() * $('#stage').height() - this.padding);
        const pos = {x: posX, y: posY, cx: posX, cy: posY};
        this.body.stop().animate(pos, 'backOut');
    }
}