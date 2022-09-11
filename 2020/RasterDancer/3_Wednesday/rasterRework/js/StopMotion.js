const DIMENSION = {
  width: 500,
  height: 500,
  scale: 1.5,
};
const FOLDER = "./export2/";
const EXT = ".jpg";
const MAX = 69;
const DELAY = 2;

class StopMotion {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = DIMENSION.width;
    this.canvas.height = DIMENSION.height;
    this.offsetX = DIMENSION.width / 2;
    this.offsetY = DIMENSION.height / 2;
    this.ctx = this.canvas.getContext("2d");
    // document.body.appendChild(this.canvas);
    this.counter = 0;
    this.frameCounter = 0;
    this.particleCounter = 0;
    this.setup();
  }
  setup() {
    this.allImages = [];
    this.initGrid();
    this.loadImage(1);
  }

  initGrid() {
    // initialiser

    const PX = new PIXI.Application(
      DIMENSION.width * 3,
      DIMENSION.height * DIMENSION.scale,
      { transparent: true, antialias: true }
    );
    document.body.appendChild(PX.view);
    PX.renderer.backgroundColor = 0x00000000;

    const textures = PIXI.Texture.fromImage("./texture.png");

    this.pixel = new PIXI.Texture(
      textures.baseTexture,
      new PIXI.math.Rectangle(0, 0, 20, 20)
    );
    this.dust = new PIXI.Texture(
      textures.baseTexture,
      new PIXI.math.Rectangle(0, 20, 20, 20)
    );

    this.particles = [];
    const nombre_de_particules = 65000;
    for (let i = 0; i < nombre_de_particules; i++) {
      // creation des ref de texture.
      // const particle = new PIXI.Sprite.fromImage('./circle.png');
      const particle = new PIXI.Sprite(this.pixel);

      particle.anchor.set(0.5, 0.5);
      particle.x = -10;
      particle.y = -10;
      particle.scale.set(0.3);
      particle.alphaValue = 0.1;
      particle.alpha = particle.alphaValue;
      particle.vitesseX = Math.random() * 10 + 1;
      this.particles.push(particle);
    }

    this.grid = [];

    let angle = 0;
    const step = 2;
    for (let y = step; y < DIMENSION.height; y += step) {
      for (let x = step; x < DIMENSION.width; x += step) {
        angle += Math.PI / 200;
        this.grid.push({ x: x, y: y, angle: angle });
      }
    }
    const container = new PIXI.particles.ParticleContainer(
      this.particles.length,
      {
        scale: true,
        position: true,
        // rotation: true,
        uvs: true,
        alpha: true,
      }
    );
    for (let i = 0; i < this.particles.length; i++) {
      container.addChild(this.particles[i]);
    }
    PX.stage.addChild(container);
    PX.ticker.add(this.draw, this);
  }

  loadImage(chiffre) {
    let leadingZero = "";
    if (chiffre < 10) {
      leadingZero = "0" + chiffre;
    } else {
      leadingZero = chiffre;
    }
    const url = FOLDER + leadingZero + EXT;
    const image = new Image();
    image.src = url;
    this.allImages.push(image);
    if (this.allImages.length >= MAX) {
      console.log("on a toutes les images");
      this.draw();
    } else {
      chiffre++;
      this.loadImage(chiffre);
    }
  }

  processData(data) {
    this.ctx.fillStyle = "black";

    // for (let y = 6; y < DIMENSION.height; y += 6) {
    //   for (let x = 6; x < DIMENSION.width; x += 6) {
    //     this.angle += 5;
    for (let i = 0; i < this.grid.length; i++) {
      const particle = this.particles[this.particleCounter];
      const x = this.grid[i].x;
      const y = this.grid[i].y;
      this.grid[i].angle += 5;
      const index = 4 * (y * DIMENSION.width + x);
      const red = data[index];
      const green = data[index + 1];
      const blue = data[index + 2];
      const luminance = (0.299 * red + 0.587 * green + 0.0722 * blue) / 255;
      // this.ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
      if (luminance > 0.8) {
        particle.scale.set(0.5);
        particle.position.x = x * DIMENSION.scale;
        particle.position.y = y * DIMENSION.scale;
        particle.alphaValue = 1;
        particle.texture = this.dust;

        // particle.position.x =
        //     x + Math.sin(this.grid[i].angle * Math.PI / 180) * 20;
        // particle.position.y =
        //     y + Math.cos(this.grid[i].angle * Math.PI / 180) * 20;
        // this.ctx.beginPath();
        // this.ctx.arc(
        //     x + Math.sin(this.grid[i].angle * Math.PI / 180) * 20,
        //     y + Math.cos(this.grid[i].angle * Math.PI / 180) * 20,
        //     ((1 - luminance) * 1), 0, Math.PI * 2, false);
        // this.ctx.fill();
        // this.ctx.closePath();

        this.particleCounter++;
        if (this.particleCounter >= this.particles.length) {
          this.particleCounter = 0;
        }
      } else {
        particle.scale.set(0);
      }
    }
    //   }
    // }
  }

  moveParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      particle.position.x += particle.vitesseX;
      // particle.texture = this.pixel;
      particle.alpha = particle.alphaValue;
      particle.alphaValue -= 0.5;
      if (particle.alphaValue < 0.1) {
        particle.alphaValue = 0.1;
        particle.texture = this.pixel;
        particle.scale.set(0.15);
      }
      // for (let particle of this.particles) {
    }
  }

  draw() {
    // console.log('draw');
    if (this.frameCounter % DELAY == 0) {
      this.ctx.drawImage(
        this.allImages[this.counter],
        0,
        0,
        DIMENSION.width,
        DIMENSION.height
      );
      const data = this.ctx.getImageData(
        0,
        0,
        DIMENSION.width,
        DIMENSION.height
      ).data;
      // this.ctx.clearRect(0, 0, DIMENSION.width, DIMENSION.height);
      // // console.log(data);
      this.processData(data);
      this.moveParticles();
      this.counter++;
      if (this.counter >= this.allImages.length) {
        this.counter = 0;
      }
      this.frameCounter = 0;
    }
    this.frameCounter++;
    // requestAnimationFrame(this.draw.bind(this));
  }

  map(x, inMin, inMax, outMin, outMax) {
    return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
}

window.onload = (e) => {
  new StopMotion();
};
