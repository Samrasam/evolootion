var Enemy = (function() {
    function Enemy(radius) {
        this.radius = radius;
        this.padding = 14;
        this.body = this.draw_body();
    }

    Enemy.prototype.draw_body = function() {
        var body = stage.circle(this.x, this.y, this.radius).attr({
            fill : '#FF8000',
            stroke : '#99000',
            'stroke-width' : 2
        });
        return body;
    };

    Enemy.prototype.moveRandom = function() {
        var posX = Math.max(this.padding, Math.random() * $('#stage').width() - this.padding);
        var posY = Math.max(this.padding, Math.random() * $('#stage').height() - this.padding);
        var pos = {x: posX, y: posY, cx: posX, cy: posY};

        body.items[0].stop().animate(pos, 'backOut');
    };

    return Enemy;
});