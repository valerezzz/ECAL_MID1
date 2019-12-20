'use strict';

const FOLDER = './jupe/';
const MAX = 12;
const SPEED = 3;
const DIMENSION = {
  'width': 500,
  'height': 500,
};

class App {
  constructor() {
    console.log('App');

    this.counter = 0;
    this.fps = 1;
    /* CANVAS */
    this.canvas = document.createElement('canvas');
    this.canvas.width = DIMENSION.width;
    this.canvas.height = DIMENSION.height;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = 'rgba(0,0,0,0.5)';

    document.body.appendChild(this.canvas);
    this.allImages = [];
    this.loadImage(1);
  }

  loadImage(i) {
    let img = new Image();
    img.onload = (function(e) {
                   this.allImages.push(img);
                   if (this.allImages.length == MAX) {
                     this.draw();
                   } else {
                     i++;
                     this.loadImage(i);
                   }
                 }).bind(this);
    img.src = FOLDER + ((i < 10) ? '0' + i : i) + '.jpg';
  }

  draw() {
    if (this.fps % SPEED == 0) {
      this.ctx.drawImage(
          this.allImages[this.counter], 0, 0, DIMENSION.width,
          DIMENSION.height);

      this.counter++;
      if (this.counter > this.allImages.length - 1) {
        this.counter = 0;
      }
      this.fps = 0;
    }
    this.fps++;
    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function() {
  new App();
};
