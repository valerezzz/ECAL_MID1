var SquareDemo =
    function(ctx, w, h) {
  this.w = w;
  this.h = h;
  this.ctx = ctx;

  document.body.style.backgroundColor = "black";

  var images = [ "img/yes.jpg", "img/no_neg.jpg" ];
  this.allImages = [];
  this.counter = 0;

  for (var i = 0; i < images.length; i++) {
    var img = new Image();
    img.onload = this.imageReady.bind(this);
    img.src = images[i];
    this.allImages.push(img);
  }

  this.imageLoaded = false;
  // this.image = new Image();
  //
  // this.image.addEventListener(
  //     'load',
  //     (function() {
  //       this.ctx.drawImage(this.image, 0, 0);
  //       this.pixelData =
  //           this.ctx.getImageData(0, 0, this.image.width, this.image.height)
  //               .data;
  //       this.imageLoaded = true;
  //     }).bind(this),
  //     false);
  // this.image.src = "img/yes.jpg";

  this.size = 14;
  this.squares = [];
  for (var y = 0; y < this.h / this.size; y++) {
    for (var x = 0; x < this.w / this.size; x++) {
      this.squares.push(new Square(x * this.size, y * this.size, this.size,
                                   this.ctx, x % 2 == y % 2 == 0 ? 1 : 0));
    }
  }

  this.x, this.y, this.index, this.color, this.indexFreq, this.grey;
  shuffle(this.squares);
  setInterval(this.changeImage.bind(this), 5000);
}

    SquareDemo.prototype = {

  changeImage : function() {
    var shifted = this.allImages.shift();
    this.allImages.push(shifted);
    this.image = this.allImages[0];
    this.ctx.drawImage(this.image, 0, 0);
    this.pixelData =
        this.ctx.getImageData(0, 0, this.image.width, this.image.height).data;
  },

  imageReady : function(e) {
    this.counter++;
    if (this.counter == this.allImages.length) {
      this.imageLoaded = true;
      this.image = this.allImages[0];
      this.ctx.drawImage(this.image, 0, 0);
      this.pixelData =
          this.ctx.getImageData(0, 0, this.image.width, this.image.height).data;
    }
  },

  draw : function(data, dataWave) {
    if (this.imageLoaded) {
      for (var i = 0, l = this.squares.length; i < l; i++) {
        this.x = Math.floor(this.squares[i].x / this.w * this.image.width);
        this.y = Math.floor(this.squares[i].y / this.h * this.image.height);
        this.index = Math.floor(this.x + this.y * this.image.width) * 4;
        this.color = [
          this.pixelData[this.index], this.pixelData[this.index + 1],
          this.pixelData[this.index + 2]
        ];
        this.indexFreq = Math.floor(map(i, 0, l, 0, data.length));
        this.squares[i].draw(data[this.indexFreq], this.color);
      }
    }
  }
}

var Square =
    function(x, y, s, ctx, even) {
  this.x = x;
  this.y = y;
  if (even) {
    if (Math.random() > 0.5) {
      this.decalX = 0;
    } else {
      this.decalX = ctx.canvas.width;
    }
    this.decalY = y
  } else {
    if (Math.random() > 0.5) {
      this.decalY = 0;
    } else {
      this.decalY = ctx.canvas.height;
    }
    this.decalX = x;
  }
  this.s = s;
  this.ctx = ctx;
}

    Square.prototype = {
  draw : function(value, color) {
    if (typeof color !== 'undefined') {
      this.grey =
          Math.floor(color[0] * 0.3 + color[1] * 0.59 + color[2] * 0.11);
      this.grey = this.grey > 120 ? 255 : 0;
      value = this.grey > 120 ? value : 0;

      // this.ctx.fillStyle = "rgba(" + grey + "," + grey + "," + grey + "," +
      // (value / 255) + ")"; // gris et alpha en fonction de value
      this.ctx.fillStyle = "rgba(" + color[0] + "," + color[1] + "," +
                           color[2] + "," + (value / 255) +
                           ")"; // couleur full et alpha en fonction de value
      // this.ctx.fillStyle = "rgba(" + Math.floor(value / 255 * color[0]) + ","
      // + Math.floor(value / 255 * color[1]) + "," + Math.floor(value / 255 *
      // color[2]) + "," + (value / 255) + ")"; // couleur + alpha en fonction
      // de value this.ctx.fillStyle = "rgb(" + color[0] + "," + color[1] + ","
      // + color[2] + ")"; // couleur full
    } else {
      this.ctx.fillStyle = "rgb(" + value + "," + value + "," + value + ")";
    }
    this.ctx.beginPath();
    var decalX = map(value, 0, 120, this.decalX, this.x);
    if (value > 120)
      decalX = this.x;
    var decalY = map(value, 0, 120, this.decalY, this.y);
    if (value > 120)
      decalY = this.y;
    this.ctx.rect(decalX, decalY, this.s, this.s);
    // this.ctx.rect(this.x, this.y, this.s, this.s);
    this.ctx.fill();
    // this.ctx.closePath();
  }
}

var shuffle =
    function(array) {
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
