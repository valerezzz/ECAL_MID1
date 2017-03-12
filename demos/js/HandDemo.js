var HandDemo = function(ctx, w, h) {
    this.w   = w;
    this.h   = h;
    this.ctx = ctx;

    document.body.style.backgroundColor = "black";

    this.hands = [];
    this.shuffledB = [];

    var sizeW = 90;
    var offsetX = (w - (Math.floor(w / sizeW) + 1) * sizeW) / 2;
    var sizeH = 20;
    var offsetY = (h - (Math.floor(h / sizeH) + 1) * sizeH) / 2;
    // var offsetY = 0;
    for(var y = 0/*Math.floor(h / 2 / sizeH)*/; y < Math.floor(h / sizeH) + 1; y++) {
        for(var x = 0; x < Math.floor(w / sizeW) + 1; x++) {
            if((y % 4 == 0 && x % 2 == 0) || (y % 4 == 2 && x % 2 == 1)) {
                this.hands.push(new Hand(offsetX + x * sizeW + sizeW / 2, offsetY + y * sizeH + sizeH / 2, sizeW, sizeH, this));
                this.shuffledB.push(this.hands[this.hands.length - 1]);
            }
        }
    }

    this.shuffledB.shuffle();

    this.image = new Image();
    this.image.onload = (function() {
        this.imageLoaded = true;
    }).bind(this);
    this.image.src = "img/hand.png";
}

HandDemo.prototype = {

    update: function(data, dataWave) {
        for(var i = 0, l = this.shuffledB.length; i < l; i++) {
            var index = Math.floor(data.length / l * i);
            this.shuffledB[i].update(data[index], dataWave[index]);
        }
    },

    draw: function(data, dataWave) {
        this.update(data, dataWave);

        this.ctx.save();

        if(this.imageLoaded) {
            for(var i = 0; i < this.hands.length; i++) {
                this.hands[i].draw(this.image);
            }
        }

        this.ctx.restore();
    }

}

var Hand = function(x, y, w, h, container) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = 300;
    this.e = 0;
    this.maxE = 5 * h;
    this.offX = 0;
    this.globalW = container.w;
    this.globalH = container.h;
    this.ctx = container.ctx;
    this.gaucher = Math.random() > 0.5;
}

Hand.prototype = {

    update: function(data, dataWave) {
        this.e += (data / 255 * this.maxE - this.e) * 0.3;
        this.offX += ((dataWave / 255 - 0.5) - this.offX) * 0.3;
        this.h += (20 - this.h) * 0.01;
    },

    draw: function(img) {
        this.ctx.save();

        this.ctx.translate(this.globalW / 2, this.globalH / 3);
        this.ctx.scale(this.y / this.globalH * 0.6 + 0.2, this.y / this.globalH * 0.6 + 0.2);
        this.ctx.translate(-this.globalW / 2, -this.globalH / 3);
        this.ctx.translate(this.x /*+ this.offX * this.w*/, this.y + this.maxE);

        this.ctx.rotate(this.offX * Math.PI / 6);

        var imageHeight = this.w / img.width * img.height;
        if(this.gaucher) {
            this.ctx.scale(-1, 1);
        }
        this.ctx.drawImage(img, -this.w / 2, -imageHeight - this.e + this.h, this.w, imageHeight);

        var gradient = this.ctx.createLinearGradient(0, -this.maxE * 2, 0, imageHeight + this.maxE);
        gradient.addColorStop(0,"transparent");
        gradient.addColorStop(0.2,"black");
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(-this.w / 2, -this.maxE * 2, this.w, imageHeight + this.maxE * 3);

        // this.gradient = this.ctx.createLinearGradient(0, 0, 0, -this.e);
        // this.gradient.addColorStop(0,"black");
        // this.gradient.addColorStop(1,"white");
        //
        // var color = Math.floor(this.e / this.maxE * 255);
        // color = "rgb(" + color + "," + color + "," + color + ")";
        // // this.ctx.fillStyle = "black";
        // this.ctx.fillStyle = this.gradient;
        // // this.ctx.strokeStyle = this.gradient;
        // // this.ctx.strokeStyle = "white";
        // this.ctx.beginPath();
        // this.ctx.rect(-this.w / 2, -this.h / 2 - this.e + 1, this.w, this.h + this.e);
        // this.ctx.fill();
        // // this.ctx.stroke();
        //
        //
        // var color = Math.floor(this.e / this.maxE * 255);
        // if(color > 10) color = 255;
        // else color = Math.floor(color / 10 * 255);
        // color = "rgb(" + color + "," + color + "," + color + ")";
        // this.ctx.fillStyle = color;
        // // this.ctx.strokeStyle = "white";
        // this.ctx.beginPath();
        // this.ctx.rect(-this.w / 2, -this.h / 2 - this.e, this.w, this.h);
        // // this.ctx.ellipse(0, -this.e - this.h / 2, this.w / 2, this.h / 2, 0, 0, 2 * Math.PI);
        // this.ctx.fill();
        // // this.ctx.stroke();

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
