var BeardDemo = function(ctx, w, h) {
    this.w   = w;
    this.h   = h;
    this.ctx = ctx;

    document.body.style.backgroundColor = "black";

    this.hairs = [];
    this.shuffledB = [];

    var sizeW = 80;
    var offsetX = (w - (Math.floor(w / sizeW) + 1) * sizeW) / 2;
    var sizeH = 40;
    var offsetY = (h - (Math.floor(h / sizeH) + 1) * sizeH) / 2;
    // var offsetY = 0;
    for(var x = 0; x < Math.floor(w / sizeW) + 1; x++) {
        for(var y = 0/*Math.floor(h / 2 / sizeH)*/; y < Math.floor(h / sizeH) + 1; y++) {
            if((y % 4 == 0 && x % 2 == 0) || (y % 4 == 2 && x % 2 == 1)) {
                this.hairs.push(new Hair(offsetX + x * sizeW + sizeW / 2, offsetY + y * sizeH + sizeH / 2, sizeW, sizeH, ctx));
                this.shuffledB.push(this.hairs[this.hairs.length - 1]);
            }
        }
    }

    this.shuffledB.shuffle();
}

BeardDemo.prototype = {

    update: function(data, dataWave) {
        for(var i = 0, l = this.shuffledB.length; i < l; i++) {
            var index = Math.floor(data.length / l * i);
            this.shuffledB[i].update(data[index], dataWave[index]);
        }
    },

    draw: function(data, dataWave) {
        this.update(data, dataWave);

        this.ctx.save();

        // this.ctx.translate(this.w / 2, this.h / 2);
        for(var i = this.hairs.length - 1; i > 0; i--) {
            this.hairs[i].draw();
        }

        this.ctx.restore();
    }

}

var Hair = function(x, y, w, h, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.e = 0;
    this.maxE = h * 1.5;
    this.offA = 0;
    this.ctx = ctx;
}

Hair.prototype = {

    update: function(data, dataWave) {
        this.e += (data / 255 * this.maxE - this.e) * 0.3;
        this.offA += ((dataWave / 255 - 0.5) - this.offA) * 0.3;
    },

    draw: function() {
        this.ctx.save();

        this.ctx.translate(this.x, this.y);
        this.ctx.translate(-this.w / 2, -this.h / 2);

        this.ctx.rotate(-Math.PI / 1);

        var color = Math.floor(this.e / this.maxE * 255);
        color = "rgb(" + color + "," + color + "," + color + ")";
        this.ctx.fillStyle = "black";
        // this.ctx.strokeStyle = this.gradient;
        this.ctx.strokeStyle = "white";

        this.ctx.save();
        for(var i = 0; i < 4; i++) {
            if(i > 0) {
                this.ctx.translate(0, -this.e);
                this.ctx.rotate(-this.e / this.maxE * (Math.PI / 8 * this.offA));
            }
            this.ctx.beginPath();
            for(var j = 0, l = 20 - i * 3; j <= l; j++) {
                if(j == 0) {
                    this.ctx.moveTo(Math.cos(2 * Math.PI / l * (l - j)) * this.w / 2 * (0.75 - i / 4),
                                    Math.sin(2 * Math.PI / l * (l - j)) * this.h / 2 * (0.75 - i / 4) - this.maxE);
                } else {
                    this.ctx.lineTo(Math.cos(2 * Math.PI / l * (l - j)) * this.w / 2 * (0.75 - i / 4),
                                    Math.sin(2 * Math.PI / l * (l - j)) * this.h / 2 * (0.75 - i / 4) - this.maxE);
                }
            }
            this.ctx.fill();
            this.ctx.stroke();
        }
        this.ctx.restore();

        this.ctx.save();
        for(var i = 3; i >= 0; i--) {
            this.ctx.save();
            for(var j = 0; j <= i; j++) {
                if(j > 0) {
                    this.ctx.translate(0, -this.e);
                    this.ctx.rotate(-this.e / this.maxE * (Math.PI / 8 * this.offA));
                }
            }
            this.ctx.beginPath();
            this.ctx.moveTo(this.w / 2 * (0.75 - i / 4), -this.maxE);
            this.ctx.lineTo(this.w / 2 * (1 - i / 4), 0);
            for(var j = 0, l = 10; j <= l; j++) {
                this.ctx.lineTo(Math.cos(Math.PI / l * j) * this.w / 2 * (1 - i / 4),
                                Math.sin(Math.PI / l * j) * this.h / 2 * (1 - i / 4));
            }
            this.ctx.lineTo(-this.w / 2 * (0.75 - i / 4), -this.maxE);
            for(var j = 0, l = 10; j <= l; j++) {
                this.ctx.lineTo(Math.cos(Math.PI / l * (l - j)) * this.w / 2 * (0.75 - i / 4),
                                Math.sin(Math.PI / l * (l - j)) * this.h / 2 * (0.75 - i / 4) - this.maxE);
            }
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.restore();
        }
        this.ctx.restore();

        this.ctx.restore();
    }

}

Array.prototype.shuffle = function() {
  var currentIndex = this.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = this[currentIndex];
    this[currentIndex] = this[randomIndex];
    this[randomIndex] = temporaryValue;
  }
}
