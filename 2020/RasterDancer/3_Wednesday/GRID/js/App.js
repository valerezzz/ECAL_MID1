'use strict';

const FOLDER = './hiphop/';
const MAX = 24;
const SPEED = 3;
const DIMENSION = {
  'width': 500,
  'height': 500,
};
class App {
  constructor() {
    console.log('App');
    this.img = document.createElement('img');
    this.img.width = DIMENSION.width;
    this.img.height = DIMENSION.height;
    this.counter = 0;
    this.fps = 1;
    // document.body.appendChild(this.img);
    /* CANVAS */
    this.canvas = document.createElement('canvas');
    this.canvas.width = DIMENSION.width;
    this.canvas.height = DIMENSION.height;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
    this.imageData;
    document.body.appendChild(this.canvas);
    this.allImages = [];
    this.max = 0;
    this.pool = [];
    this.loadPool();
    this.loadImage(1);
  }
  loadPool() {
    for (let i = 0; i < 15000; i++) {
      let particle = new Particle(0, 0, this.ctx);
      this.pool.push(particle);
    }
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
      // let url = FOLDER + 'frame' + this.counter + '.jpg';
      // this.img.src = url;
      this.ctx.drawImage(
          this.allImages[this.counter], 0, 0, DIMENSION.width,
          DIMENSION.height);
      let imageData =
          this.ctx.getImageData(0, 0, DIMENSION.width, DIMENSION.height);
      // let copy = this.ctx.createImageData(DIMENSION.width, DIMENSION.height);

      this.processDatas(imageData);
      this.counter++;
      if (this.counter >= MAX) {
        this.counter = 0;
      }
      this.fps = 0;
    }
    this.ctx.clearRect(0, 0, DIMENSION.width, DIMENSION.height);
    for (let i = 0; i < this.pool.length; i++) {
      this.pool[i].update();
      this.pool[i].draw();
    }

    this.fps++;
    requestAnimationFrame(this.draw.bind(this));
  }
  processDatas(imageData) {
    // let buf = new ArrayBuffer(imageData.data.length);
    // let buf8 = new Uint8ClampedArray(buf);
    // let data = new Uint32Array(buf);


    //


    let w = 0;
    for (let y = 0; y < DIMENSION.height; y += 4) {
      for (let x = 0; x < DIMENSION.width; x += 4) {
        let index = 4 * (x + y * DIMENSION.width);
        let red = imageData.data[index];        // red   color
        let green = imageData.data[index + 1];  // green color
        let blue = imageData.data[index + 2];   // blue  color
        let alpha = imageData.data[index + 3];
        if (red < 50 && green < 50 && blue < 50) {
          // console.log('black');
          // copy.data[y * DIMENSION.width + x] = 0xff0000;
          //  this.ctx.fillRect(x, y, 2, 2);

          this.pool[0].x = x;
          this.pool[0].y = y;
          let shifted = this.pool.shift();
          this.pool.push(shifted);

          // this.ctx.beginPath();
          // this.ctx.arc(x, y, 1, 0, Math.PI * 2, true);
          // this.ctx.fill();
          // this.ctx.closePath();
          w++;
        }
      }
    }
    if (w > this.max) {
      this.max = w;
    }
  }
}

window.onload = function() {
  new App();
};
