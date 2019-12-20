const DIMENSION = {
  'width': 500,
  'height': 500,
};
const FOLDER = './C4D/';
const EXT = '.png';
const MAX = 24;
const DELAY = 3;

class StopMotion {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = DIMENSION.width;
    this.canvas.height = DIMENSION.height;
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    this.counter = 0;
    this.frameCounter = 0;
    this.setup();
  }
  setup() {
    console.log('tout est ok');
    this.allImages = [];
    this.loadImage(12);
  }

  loadImage(chiffre) {
    let leadingZero = '';
    if (chiffre < 10) {
      leadingZero = '0' + chiffre;
    } else {
      leadingZero = chiffre;
    }
    const url = FOLDER + leadingZero + EXT;
    const image = new Image();
    image.src = url;
    this.allImages.push(image);
    if (this.allImages.length >= MAX) {
      console.log('on a toutes les images');
      this.draw();
    } else {
      chiffre++;
      this.loadImage(chiffre);
    }

    console.log(url);
  }

  draw() {
    console.log('draw');

    if (this.frameCounter % DELAY == 0) {
      this.ctx.clearRect(0, 0, DIMENSION.width, DIMENSION.height);
      // this.ctx.globalCompositeOperation = 'difference';
      this.ctx.drawImage(
          this.allImages[this.counter], 0, 0, DIMENSION.width,
          DIMENSION.height);

      // this.ctx.fillStyle = 'white';
      // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.counter++;
      if (this.counter >= this.allImages.length) {
        this.counter = 0;
      }
      this.frameCounter = 0;
    }
    this.frameCounter++;
    requestAnimationFrame(this.draw.bind(this));
  }
};

window.onload = (e) => {
  new StopMotion();
};
