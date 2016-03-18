const Food = (function() {
    function Food (posX, posY, radius) {
        this.x = posX;
        this.y = posY;
        this.radius = radius;
        this.to_delete = false;
        this.body = this.drawBody();
    }

    Food.prototype.drawBody = function() {
        const body = stage.circle(this.x, this.y, this.radius).attr({
            fill : '#9d9d9d',
            stroke : '#5e5e5e',
            'stroke-width' : 2
        });
        return body;
    };

    return Food;
})();