'use strict';

const FOLDER = './jupe/';
const SPEED = 4;
const DIMENSION = {
  'width': 500,
  'height': 500,
};
let PARTICLE_AMOUNT = 100000;
let particle;
let PX;
let gravity = 0.07;
const PREFIX = '/';
const SUFFIX = '.jpg';
const MAX = 12;  // 24;
class App {
  constructor() {
    console.log('App');
    this.img = document.createElement('img');
    this.img.width = DIMENSION.width;
    this.img.height = DIMENSION.height;
    this.counter = 0;
    this._counter = 0;
    this.fps = 0;
    // document.body.appendChild(this.img);
    /* CANVAS */
    this.canvas = document.createElement('canvas');
    this.canvas.width = DIMENSION.width;
    this.canvas.height = DIMENSION.height;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = 'rgba(0,0,0,0.5)';

    /* globalCompositeOperation :
    normal | multiply | screen | overlay |
    darken | lighten | color-dodge | color-burn | hard-light |
    soft-light | difference | exclusion | hue | saturation |
    color | luminosity
    */
    this.ctx.globalCompositeOperation = 'multiply';
    this.ctx.globalAlpha = 0.1;

    this.imageData;
    document.body.appendChild(this.canvas);
    this.allImages = [];
    this.max = 0;
    this.pool = [];
    // this.loadPool();
    this.loadImage(1);

    // document.addEventListener('mousedown', this.onMouseDown.bind(this));
    // document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }
  //
  // onMouseDown(e) {
  //   this.ctx.globalAlpha = 0.01;
  //   gravity = 0.3
  // }
  // onMouseUp(e) {
  //   this.ctx.globalAlpha = 1;
  //   let gravity = 0.07;
  // }
  // loadPool() {
  //   // for (let i = 0; i < 15000; i++) {
  //   //   let particle = new Particle(0, 0, this.ctx);
  //   //   this.pool.push(particle);
  //   // }
  // }
  loadImage(i) {
    let img = new Image();
    img.onload = (function(e) {
                   this.allImages.push(img);
                   if (this.allImages.length == MAX) {
                     // this.draw();
                     PX.ticker.add(this.draw, this);
                   } else {
                     i++;
                     this.loadImage(i);
                   }
                 }).bind(this);
    // img.src = FOLDER + PREFIX + i + SUFFIX;
    img.src = FOLDER + PREFIX + ((i < 10) ? '0' + i : i) + SUFFIX;
  }

  draw() {
    // let imageData =
    //     this.ctx.getImageData(0, 0, DIMENSION.width, DIMENSION.height);
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
      // this.moveParticles();
      this.counter++;
      if (this.counter >= MAX) {
        // console.log('MAX REACHED');
        this.counter = 0;
      }
      this.fps = 0;
    }
    // this.ctx.clearRect(0, 0, DIMENSION.width, DIMENSION.height);
    // for (let i = 0; i < this.pool.length; i++) {
    //   this.pool[i].update();
    //   this.pool[i].draw();
    // }

    this.fps++;
    this.moveParticles();
    // requestAnimationFrame(this.draw.bind(this));
  }
  processDatas(imageData) {
    for (let y = 0; y < DIMENSION.height; y += 1) {
      for (let x = 0; x < DIMENSION.width; x += 1) {
        let index = 4 * (x + y * DIMENSION.width);
        let brightness = 0.34 * imageData.data[index] +
            0.5 * imageData.data[index + 1] + 0.16 * imageData.data[index + 2];
        let val = 1 - (brightness / 255);
        if (val > 0.53) {
          // particle[0].position.x = x;
          // particle[0].position.y = y;


          const shifted = particle[this._counter];
          particle[this._counter].position.x = x;
          particle[this._counter].position.y = y;

          particle[this._counter].vy = Math.random() * 2;

          if (this._counter >= particle.length - 1) {
            this._counter = 0;
          } else {
            this._counter++;
          }
        }
      }
    }
  }

  moveParticles() {
    for (let i = 0; i < PARTICLE_AMOUNT; i++) {
      particle[i].vy += gravity;
      particle[i].position.x -= particle[i].vx;
      particle[i].position.y += particle[i].vy * 0.01;
      // particle[i].scale.set(1.);
    }
  }
}

window.onload = function() {
  PX = new PIXI.Application(
      DIMENSION.width, DIMENSION.height, {antialias: true});
  document.body.appendChild(PX.view);

  particle = [];
  // GRID CREATION
  for (let i = 0; i < PARTICLE_AMOUNT; i++) {
    let graphics = PIXI.Sprite.fromImage('pixel.png');
    // graphics.originx = x;
    // graphics.originy = y;
    graphics.position.x = -1000;
    graphics.position.y = -1000;
    graphics.directionX = 1 - Math.random() * 2;
    graphics.directionY = 1 - Math.random() * 2;
    graphics.vx = 2;  // Math.random() * 2 + 1;
    graphics.vy = 1 - Math.random() * 2;
    // graphics.size = 0;
    // graphics.sizeX = 0;
    // graphics.scale.set(0, 0);
    // graphics.previousAngle = 0;
    // graphics.tint = 0;
    particle.push(graphics);
  }


  PARTICLE_AMOUNT = particle.length;
  let sprites = new PIXI.particles.ParticleContainer(PARTICLE_AMOUNT, {
    scale: false,
    position: true,
    rotation: false,
    uvs: false,
    alpha: true,
  });
  for (let i = 0; i < particle.length; i++) {
    sprites.addChild(particle[i]);
  }


  PX.stage.addChild(sprites);
  // let totalSprites =
  //     PX.renderer instanceof PIXI.WebGLRenderer ? PARTICLE_AMOUNT : 2;
  PX.renderer.backgroundColor = 0;

  // PX.ticker.add(function() {
  //   for (let i = 0; i < PARTICLE_AMOUNT; i++) {
  //     particle[i].vy += gravity;
  //     particle[i].position.x -= particle[i].vx * 1;
  //     particle[i].position.y += particle[i].vy * 0.01;
  //     // particle[i].scale.set(1.);
  //   }
  // });


  new App();
};
