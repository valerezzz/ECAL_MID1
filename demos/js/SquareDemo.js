var SquareDemo = function(ctx, w, h) {
  this.w = w;
  this.h = h;
  this.ctx = ctx;

  document.body.style.backgroundColor = "black";

  this.imageLoaded = false;
  this.image = new Image();
  this.image.addEventListener('load', (function() {
      this.ctx.drawImage(this.image, 0, 0);
      this.pixelData = this.ctx.getImageData(0, 0, this.image.width, this.image.height).data;
      this.imageLoaded = true;
  }).bind(this), false);
  this.image.src = "img/xavier2.jpg";

  this.size = 10;
  this.squares = [];
  for (var y = 0; y < this.h / this.size; y++) {
    for (var x = 0; x < this.w / this.size; x++) {
      this.squares.push(new Square(x * this.size, y * this.size, this.size, this.ctx));
    }
  }

  shuffle(this.squares);
}

SquareDemo.prototype = {
  draw : function(data, dataWave) {
    if(this.imageLoaded) {
      for (var i = 0, l = this.squares.length; i < l; i++) {
          var x = Math.floor(this.squares[i].x / this.w * this.image.width);
          var y = Math.floor(this.squares[i].y / this.h * this.image.height);
          //console.log(x,y, this.image.width,this.image.height);
          var index = Math.floor(x + y * this.image.width) * 4;
          var color = [this.pixelData[index], this.pixelData[index + 1], this.pixelData[index + 2]];
          var indexFreq = Math.floor(map(i, 0, l, 0, data.length));
          this.squares[i].draw(data[indexFreq], color);
      }
    }
  }
}

var Square = function(x, y, s, ctx) {
  this.x = x;
  this.decalX = Math.floor(Math.random() * (ctx.canvas.width / s)) * s;
  this.y = y;
  this.s = s;
  this.ctx = ctx;
}

Square.prototype = {
  draw : function(value, color) {
    if(typeof color !== 'undefined') {
      var grey = Math.round(color[0] * 0.3 + color[1] * 0.59 + color[2] * 0.11);
      grey = grey > 120 ? 255 : 0;
      value = grey > 120 ? value : 0;
    //   this.ctx.fillStyle = "rgba(" + grey + "," + grey + "," + grey + "," + (value / 255) + ")"; // gris et alpha en fonction de value
    //   this.ctx.fillStyle = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + (value / 255) + ")"; // couleur full et alpha en fonction de value
    //   this.ctx.fillStyle = "rgba(" + Math.floor(value / 255 * color[0]) + "," + Math.floor(value / 255 * color[1]) + "," + Math.floor(value / 255 * color[2]) + "," + (value / 255) + ")"; // couleur + alpha en fonction de value
      this.ctx.fillStyle = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")"; // couleur full
    } else {
      this.ctx.fillStyle = "rgb(" + value + "," + value + "," + value + ")";
    }
    this.ctx.beginPath();
    this.ctx.rect(constrain(map(value, 0, 120, this.decalX, this.x), this.decalX, this.x), this.y, this.s, this.s);
    this.ctx.fill();
  }
}

var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var map = function(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
};

var constrain = function(val, min, max) {
    var min = min < max ? min : max;
    var max = max > min ? max : min;
    return Math.min(Math.max(val, min), max);
};
