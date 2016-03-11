Enemy = (function() {
    function Enemy (pos_x, pos_y, radius) {
        this.x = pos_x;
        this.y = pos_y;
        this.radius = radius;
        this.to_delete = false;
        this.body = this.draw_body();
    }

    Enemy.prototype.draw_body = function() {
        var body = stage.circle(this.x, this.y, this.radius).attr({
            fill : '#9d9d9d',
            stroke : '#5e5e5e',
            'stroke-width' : 2
        });
        return body;
    };

    return Enemy;
})();