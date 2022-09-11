"use strict";
const IMAGES_AMOUNT = 24,
  IMAGES_PREFIX = "frame",
  IMAGES_SUFIX = ".jpg",
  FOLDER = "./800/",
  SPEED = 3,
  DIMENSION = { width: 800, height: 800 };
let PX,
  particle,
  allThings = [],
  PARTICLE_AMOUNT = 42200,
  ANGLE = 580,
  X_space = 2,
  Y_space = 3,
  LSize = 1;
class App {
  constructor() {
    (this.counter = 0),
      (this.fps = 0),
      (this.canvas = document.createElement("canvas")),
      (this.canvas.width = DIMENSION.width),
      (this.canvas.height = DIMENSION.height),
      (this.ctx = this.canvas.getContext("2d")),
      this.imageData,
      document.body.appendChild(this.canvas),
      (this.allImages = []),
      this.loadImage(0);
  }
  loadImage(t) {
    let i = new Image();
    (i.onload = function (e) {
      this.allImages.push(i),
        this.allImages.length == IMAGES_AMOUNT
          ? PX.ticker.add(this.draw, this)
          : (t++, this.loadImage(t));
    }.bind(this)),
      (i.src = FOLDER + IMAGES_PREFIX + t + IMAGES_SUFIX);
  }
  draw() {
    if (this.fps % SPEED == 0) {
      this.ctx.drawImage(
        this.allImages[this.counter],
        0,
        0,
        DIMENSION.width,
        DIMENSION.height
      );
      let t = this.ctx.getImageData(0, 0, DIMENSION.width, DIMENSION.height);
      this.processDatas(t),
        this.counter++,
        this.counter > IMAGES_AMOUNT - 1 && (this.counter = 0),
        (this.fps = 0);
    }
    this.fps++;
  }
  processDatas(t) {
    for (let i = 0; i < particle.length; i++) {
      let e = 4 * (particle[i].originX + particle[i].originY * DIMENSION.width),
        a =
          1 -
          (0.34 * t.data[e] + 0.5 * t.data[e + 1] + 0.16 * t.data[e + 2]) / 255;
      particle[i].scale.set(1 * a);
    }
  }
}
function init() {
  particle = [];
  for (let t = 0; t < DIMENSION.height; t += Y_space)
    for (let i = 0; i < DIMENSION.width; i += X_space)
      if (i > 220 && i < 580) {
        let e = PIXI.Sprite.fromImage("pixel.png");
        (e.originX = i),
          (e.originY = t),
          (e.x = 1.5 * i + 50),
          (e.y = 1.5 * t),
          (e.tint = 0),
          particle.push(e);
      }
}
window.onload = function () {
  ((PX = new PIXI.Application(1280, 1280, {
    antialias: !0,
  })).renderer.backgroundColor = 16777215),
    document.body.appendChild(PX.view),
    init(),
    (PARTICLE_AMOUNT = particle.length);
  let t = new PIXI.particles.ParticleContainer(PARTICLE_AMOUNT, { scale: !0 });
  for (let i = 0; i < particle.length; i++) t.addChild(particle[i]);
  PX.stage.addChild(t), new App();
};
