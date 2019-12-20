const DIMENSION = {
  'width': 500,
  'height': 500,
};
// const FOLDER = './C4D/';
// const EXT = '.png';
// const MAX = 24;
// const DELAY = 3;

class StopMotion {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = DIMENSION.width * 2;
    this.canvas.height = DIMENSION.height * 2;
    this.offsetX = DIMENSION.width / 2;
    this.offsetY = DIMENSION.height / 2;
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    // this.counter = 0;
    // this.frameCounter = 0;
    this.setup();
  }
  setup() {
    console.log('tout est ok');
    // this.allImages = [];
    // this.loadImage(12);

    this.initGrid();
    this.angle = 0;
    this.image = new Image();
    this.image.src = './andy.jpg';
    this.image.onload = this.draw.bind(this);
  }

  initGrid() {
    this.grid = [];
    let angle = 0;
    for (let y = 5; y < DIMENSION.height; y += 5) {
      for (let x = 5; x < DIMENSION.width; x += 5) {
        angle += Math.PI / 78;
        this.grid.push({x: x, y: y, angle: angle});
      }
    }
  }

  // loadImage(chiffre) {
  //   let leadingZero = '';
  //   if (chiffre < 10) {
  //     leadingZero = '0' + chiffre;
  //   } else {
  //     leadingZero = chiffre;
  //   }
  //   const url = FOLDER + leadingZero + EXT;
  //   const image = new Image();
  //   image.src = url;
  //   this.allImages.push(image);
  //   if (this.allImages.length >= MAX) {
  //     console.log('on a toutes les images');
  //     this.draw();
  //   } else {
  //     chiffre++;
  //     this.loadImage(chiffre);
  //   }
  //
  //   console.log(url);
  // }

  processData(data) {
    // this.ctx.fillStyle = 'white';

    // for (let y = 6; y < DIMENSION.height; y += 6) {
    //   for (let x = 6; x < DIMENSION.width; x += 6) {
    //     this.angle += 5;
    for (let i = 0; i < this.grid.length; i++) {
      const x = this.grid[i].x;
      const y = this.grid[i].y;
      this.grid[i].angle += 5;
      const index = 4 * (y * DIMENSION.width + x);
      const red = data[index];
      const green = data[index + 1];
      const blue = data[index + 2];
      const luminance = (0.299 * red + 0.587 * green + 0.0722 * blue) / 255;
      // console.log(luminance);
      this.ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
      // this.ctx.strokeStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';

      this.ctx.beginPath();
      this.ctx.arc(
          this.offsetX + x + Math.sin(this.grid[i].angle * Math.PI / 180) * 100,
          this.offsetY + y +
              Math.cos(this.grid[i].angle * 2 * Math.PI / 180) * 100,
          (luminance * 8), 0, Math.PI * 2, false);
      this.ctx.fill();
      // this.ctx.moveTo(x, y);
      // const x1 = x +
      //     Math.cos(this.grid[i].angle * Math.PI / 180) * (luminance * 30) +
      //     Math.sin(this.grid[i].angle * Math.PI / 180) * 20;
      // const y1 = y +
      //     Math.sin(this.grid[i].angle * Math.PI / 180) * (luminance * 30) +
      //     Math.sin(this.grid[i].angle * Math.PI / 180) * 20;
      //
      // this.ctx.lineTo(x1, y1);
      // this.ctx.stroke();
      this.ctx.closePath();
    }
    //   }
    // }
  }

  draw() {
    // if (this.frameCounter % DELAY == 0) {
    // this.ctx.clearRect(0, 0, DIMENSION.width, DIMENSION.height);
    // this.ctx.globalCompositeOperation = 'difference';
    this.ctx.drawImage(this.image, 0, 0, DIMENSION.width, DIMENSION.height);
    const data =
        this.ctx.getImageData(0, 0, DIMENSION.width, DIMENSION.height).data;
    this.ctx.clearRect(0, 0, DIMENSION.width * 2, DIMENSION.height * 2);
    // console.log(data);
    this.processData(data);
    // this.ctx.fillStyle = 'white';
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // this.counter++;
    // if (this.counter >= this.allImages.length) {
    //   this.counter = 0;
    // }
    // this.frameCounter = 0;
    // }
    // this.frameCounter++;
    requestAnimationFrame(this.draw.bind(this));
  }

  map(x, inMin, inMax, outMin, outMax) {
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }
};

window.onload = (e) => {
  new StopMotion();
};
