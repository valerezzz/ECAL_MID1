var LineDemo = function(ctx, w, h) {
    this.w   = w;
    this.h   = h;
    this.ctx = ctx;

    this.lines = [];
    this.resolution = 30;
}

LineDemo.prototype = {

    update: function() {
        for(var i = this.lines.length - 1; i > 0; i--) {
            this.lines[i].update();
            if(this.lines[i].isDead()) {
                this.lines.splice(i, 1);
            }
        }
    },

    draw: function(data, dataWave) {
        this.addLines(data);
        this.update();

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.w, this.h);

        for(var i = 0, l = this.lines.length; i < l; i++) {
            this.lines[i].draw();
        }

        // this.ctx.fillStyle   = "transparent";
        // this.ctx.strokeStyle = "white";
        // this.ctx.beginPath();
        // for(var i = 0, l = dataWave.length; i < l; i++) {
        //     if(i == 0) this.ctx.moveTo(0, dataWave[i] / 255 * this.h);
        //     else this.ctx.lineTo(this.w / l * i, dataWave[i] / 255 * this.h);
        // }
        // this.ctx.stroke();
    },

    addLines: function(data) {
        for(var i = 0, l = data.length - 200; i < l; i += this.resolution) {
            if(data[i] > 0) {
                this.lines.push(new Line(0, this.h - i / l * this.h, this.w / 2, this.h - i / l * this.h, this.h / (l / this.resolution), data[i], this.ctx));
            }
        }
    }

}

var Line = function(x, y, destX, destY, h, data, ctx) {
    this.x1 = x;
    this.y1 = y;
    this.x2 = x;
    this.y2 = y;
    this.destX = destX;
    this.destY = destY;
    this.h     = h;
    var color  = data;
    this.color = "rgb(" + color + "," + color + "," + color + ")";
    this.life  = 0;
    this.speed = data / 255 * 0.9 + 0.1;
    this.ctx   = ctx;
    this.dead  = false;
}

Line.prototype = {

    update: function() {
        this.x1 += (this.destX - this.x1) * this.speed;
        this.y1 += (this.destY - this.y1) * this.speed;
        if(this.life > 1) {
            this.x2 += (this.destX - this.x2) * this.speed;
            this.y2 += (this.destY - this.y2) * this.speed;
        }

        if(this.x2 > this.destX - 1 && this.x2 < this.destX + 1 &&
           this.y2 > this.destY - 1 && this.y2 < this.destY + 1) {
            this.dead = true;
        }

        this.life++;
    },

    draw: function(ctx) {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.rect(this.x2, this.y2, this.x1 - this.x2, this.h);
        this.ctx.rect(this.destX * 2 - this.x2, this.y2, -(this.x1 - this.x2), this.h);
        this.ctx.fill();
    },

    isDead: function() {
        return this.dead;
    }

}
