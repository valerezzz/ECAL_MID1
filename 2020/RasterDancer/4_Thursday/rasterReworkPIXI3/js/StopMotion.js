const DIMENSION = {
  'width': 512,
  'height': 512,
  'scale': 1.5,
};
const FOLDER = './fonk_jpg/';
const EXT = '.jpg';
const MAX = 64;
const DELAY = 2;
let frame = 0;

class StopMotion {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = DIMENSION.width;
    this.canvas.height = DIMENSION.height;
    this.ctx = this.canvas.getContext('2d');
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
    this.PX = PIXI.autoDetectRenderer(
        DIMENSION.width * DIMENSION.scale, DIMENSION.height * DIMENSION.scale,
        {transparent: true});
    // , backgroundColor: 0xff0d113e
    document.body.appendChild(this.PX.view);

    // const textures = PIXI.Texture.fromImage('./texture.png');
    //
    // this.pixel = new PIXI.Texture(
    //     textures.baseTexture, new PIXI.math.Rectangle(0, 0, 20, 20));
    // this.dust = new PIXI.Texture(
    //     textures.baseTexture, new PIXI.math.Rectangle(0, 20, 20, 20));
    // console.log(this.pixel);
    this.particles = [];
    const nombre_de_particules = 100000;
    for (let i = 0; i < nombre_de_particules; i++) {
      const particle = new PIXI.Sprite.fromImage('referenceTest_x05.png');
      particle.anchor.set(0.5, 0.5);
      particle.x = -10;
      particle.y = -10;
      particle.scale.set(.05);
      particle.seed = Math.random();
      particle.velX = particle.seed * 10 + 1;
      particle.velXX = Math.random() * 20 - 10;
      particle.velY = 0;
      particle.alpha = 1;
      particle.type = 'white';
      particle.age = 0;
      this.particles.push(particle);
    }
    this.grid = [];

    let angle = 0;
    const step = 3;
    for (let y = step; y < DIMENSION.height; y += step) {
      for (let x = step; x < DIMENSION.width; x += step) {
        angle += Math.PI / 200;
        this.grid.push({x: x, y: y, angle: angle});
      }
    }
    const container = new PIXI.ParticleContainer(
        this.particles.length, [true, true, false, false, true]);
    for (let i = 0; i < this.particles.length; i++) {
      container.addChild(this.particles[i]);
    }

    this.stage = new PIXI.Stage();
    this.stage.addChild(container);
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
  }

  processData(data) {
    this.letterIndex = 0;

    const step = 4;
    for (let i = 0; i < this.grid.length; i++) {
      const particle = this.particles[this.particleCounter];
      // const particle = this.redParticles[this.redParticlesCounter];
      // const redParticle = this.redParticles[this.redParticlesCounter];

      const x = this.grid[i].x;
      const y = this.grid[i].y;
      this.grid[i].angle += 5;

      this.angle += .2;
      const index = 4 * (y * DIMENSION.width + x);
      const red = data[index];
      const green = data[index + 1];
      const blue = data[index + 2];
      const currentLuminance =
          ((red * .2126) + (green * .7152) + (blue * .0722));

      // outline
      if (red < 15 && green < 15 && blue < 15) {
      }
      // arms
      if (red > 200 && green < 10 && blue < 10) {
        if (red < 10 && green > 190 && blue > 190) {
          if ((this.counter % 2 == 0 && this.counter % 3 == 0)) {
            particle.age = 0;
            particle.type = 'arms';
            particle.scale.set(particle.seed / 10 * DIMENSION.scale);
            particle.position.x = x * DIMENSION.scale;
            // (x + Math.random() * 3 - 1.5) * DIMENSION.scale;
            particle.position.y = y * DIMENSION.scale;
            // (y + Math.random() * 3 - 1.5) * DIMENSION.scale;
            particle.alpha = 1;
            // particle.scale.set(.03)

            particle.velX = particle.seed * 10 + 1;
            particle.velY = 0;
            particle.tint = rgbToHex(0, 0, 0);
            // console.log(particle.tint);
          }
        }
      }
      // body
      if (red < 10 && green > 190 && blue > 190) {
        if ((this.counter % 2 == 0 && this.counter % 3 == 0)) {
          particle.age = 0;
          particle.type = 'body';
          particle.scale.set(particle.seed / 11 * DIMENSION.scale);
          particle.position.x = x *
              DIMENSION
                  .scale;  //(x + Math.random() * 3 - 1.5) * DIMENSION.scale;
          particle.position.y = y * *
              DIMENSION
                  .scale;  //(y + Math.random() * 3 - 1.5) * DIMENSION.scale;
          particle.alpha = 1;
          // particle.scale.set(.03)

          particle.velX = particle.seed * 10 + 1;
          particle.velY = 0;
          particle.tint = rgbToHex(
              map(DIMENSION.width - y, 0, DIMENSION.height, 0, 255), 120,
              map(DIMENSION.width - y, 0, DIMENSION.height, 0, 255));
          // console.log(particle.tint);
        }
      }

      // beak upper
      if (red > 190 && green < 10 && blue > 150) {
      }
      //  beak lower
      if (red > 200 && green > 160 && blue < 10) {
      }

      //  eye
      if (red < 110 && red > 80 && green < 10 && blue > 100) {
        if (currentLuminance < 10 &&
            (this.counter == 12 || this.counter == 13 || this.counter == 28 ||
             this.counter == 29 || this.counter == 44 || this.counter == 45 ||
             this.counter == 60 || this.counter == 61)) {
          // console.log(this.counter);
          particle.type = 'white';
          particle.scale.set(particle.seed * .6 * DIMENSION.scale);
          particle.position.x = x * DIMENSION.scale;
          particle.position.y = y * DIMENSION.scale;
          particle.alpha = 1 - particle.seed;


          particle.tint = rgbToHex(255, 0, 0);
        }
      }


      // outlines rotation

      if (currentLuminance < 10) {
        //  rotatron
        particle.age = 0;
        particle.type = '!clear';
        particle.scale.set(particle.seed / 10 * DIMENSION.scale);
        particle.position.x = x *
            DIMENSION
                .scale;  // (x + Math.random() * 3 - 1.5) * DIMENSION.scale;
        particle.position.y = y *
            DIMENSION.scale;  //(y + Math.random() * 3 - 1.5) * DIMENSION.scale;
        particle.alpha = .7;
        // particle.scale.set(.03)

        particle.velX = particle.seed * 10 + 1;
        particle.velY = 0;
        particle.tint = '0x' +
            toHex(Math.floor(map(x, 0, DIMENSION.width, 255, 70))) +
            toHex(Math.floor(map(y, 0, DIMENSION.height, 255, 70))) +
            toHex(150);
        // console.log(particle.tint);
      }


      if (currentLuminance < 10 && this.counter % 2 == 0) {
        //  rotatron
        particle.age = 0;
        particle.type = 'clear';
        particle.scale.set(particle.seed / 10 * DIMENSION.scale);
        particle.position.x = x *
            DIMENSION.scale;  //(x + Math.random() * 3 - 1.5) * DIMENSION.scale;
        particle.position.y = y *
            DIMENSION.scale;  //(y + Math.random() * 3 - 1.5) * DIMENSION.scale;
        particle.alpha = .7;

        particle.velX = particle.seed * 10 + 1;
        particle.velY = 0;
        particle.tint = '0x' +
            toHex(Math.floor(map(x, 0, DIMENSION.width, 255, 70))) +
            toHex(Math.floor(map(y, 0, DIMENSION.height, 255, 70))) +
            toHex(150);
      }

      // paw1
      if (red < 10 && green > 200 && blue < 10) {
        if (y > 440 && this.counter > 53 && this.counter < 56) {
          particle.type = 'red';
          particle.position.x = x * DIMENSION.scale;
          // (x - 13 + Math.random() * 16 - 8) * DIMENSION.scale;
          particle.position.y = y * DIMENSION.scale;
          // (y + 12 + Math.random() * 16 - 8) * DIMENSION.scale;
          particle.tint = rgbToHex(
              map(y, 400, DIMENSION.height, 120, 255),
              map(y, 440, DIMENSION.height, 20, 255), 80 - particle.seed * 80);

          particle.alpha = .3;
          particle.velX = Math.random() * 20 - 10;
          particle.velY = -particle.seed * 5;
          particle.scale.set(1.1 * DIMENSION.scale);
        }
      }
      // paw2
      if (red < 10 && green < 10 && blue > 200) {
        if (y > 390 && this.counter > 14 && this.counter < 17) {
          // console.log("PAW!");
          particle.type = 'red';
          particle.position.x = x * DIMENSION.scale;
          // (x - 20 + Math.random() * 25 - 12.5) * DIMENSION.scale;
          particle.position.y = y * DIMENSION.scale;
          // (y + 12 + Math.random() * 4 - 2) * DIMENSION.scale;
          particle.tint = rgbToHex(
              0, map(x, 120, DIMENSION.width, 255, 0),
              map(y, 400, DIMENSION.height, 120, 255) - particle.seed * 50);
          particle.alpha = .3;
          particle.velX = particle.velXX;
          particle.velY = -particle.seed * 5;
          particle.scale.set(.9 * DIMENSION.scale);
        }
      }
      if (currentLuminance < 10 && (this.counter % 4 == 0)) {
        particle.type = 'white';
        particle.scale.set(particle.seed * .45 * DIMENSION.scale);
        particle.position.x = x * DIMENSION.scale;
        particle.position.y = y * DIMENSION.scale;
        particle.alpha = 1 - particle.seed;

        particle.tint = rgbToHex(255, 255, 255);
      }

      this.particleCounter++;
      if (this.particleCounter >= this.particles.length) {
        this.particleCounter = 0;
      }
    }
  }

  moveParticles(ParticleContainer) {
    for (let i = 0; i < ParticleContainer.length; i++) {
      const particle = ParticleContainer[i];

      if (particle.type == 'red') {
        particle.position.x += particle.velX;
        particle.position.y -= particle.velY;

        particle.alpha -= .002;
        if (particle.alpha < 0) {
          particle.alpha = 0;
        }
        particle.scale.set(particle.scale.x - .01);
        if (particle.scale.x < 0.05) {
          particle.scale.set(0);
        }
      } else if (particle.type == 'white') {
        particle.position.x += 0;
        particle.position.y += 0;
        particle.scale.set(particle.scale.x -= 0.03);
        if (particle.scale.x <= 0) {
          particle.scale.set(0);
        }
        // particle.scale.set(particle.scale.x + 0.025);
        particle.alpha -= .04;
        if (particle.alpha < 0) {
          particle.alpha = 0;
        }
      } else if (particle.type == 'pop') {
        particle.position.x += Math.random() * 2 - 1;
        particle.position.y += Math.random() * 2 - 1;
        particle.age++;
        particle.scale.set(particle.scale.x - 0.005);
        if (particle.scale.x <= 0) {
          particle.scale.set(0);
        }
        particle.alpha -= .01;
        if (particle.alpha <= 0) {
          particle.alpha = 0;
        }
      } else if (particle.type == 'clear') {
        particle.age += 0.5;
        particle.position.y +=
            Math.cos(frame * .035) * 2 * map(particle.age, 0, 10, 0, 1);
        particle.position.x +=
            Math.sin(frame * .035) * 2 * map(particle.age, 0, 10, 0, 1);
        if (particle.alpha <= 0) {
          particle.alpha = 0;
        } else {
          particle.alpha -= 0.001;
        }
      } else if (particle.type == '!clear') {
        particle.age += 0.5;
        particle.position.y +=
            Math.cos(frame * .035) * 2 * map(particle.age, 0, 10, 0, 1) * -1;
        particle.position.x +=
            Math.sin(frame * .035) * 2 * map(particle.age, 0, 10, 0, 1) * -1;
        if (particle.alpha <= 0) {
          particle.alpha = 0;
        } else {
          particle.alpha -= 0.001;
        }
      }
    }
  }


  draw() {
    if (this.frameCounter % DELAY == 0) {
      this.ctx.drawImage(
          this.allImages[this.counter], 0, 0, DIMENSION.width,
          DIMENSION.height);
      const data =
          this.ctx.getImageData(0, 0, DIMENSION.width, DIMENSION.height).data;
      // this.ctx.clearRect(0, 0, DIMENSION.width, DIMENSION.height);
      this.processData(data);
      this.moveParticles(this.particles);
      this.counter++;
      if (this.counter >= this.allImages.length) {
        this.counter = 0;
      }
      this.frameCounter = 0;
    }
    this.frameCounter++;
    this.PX.render(this.stage);
    requestAnimationFrame(this.draw.bind(this));
  }

  map(x, inMin, inMax, outMin, outMax) {
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }
};


const map =
    (num, in_min, in_max, out_min, out_max) => {
      return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

const toHex = function(rgb) {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = '0' + hex;
  }
  return hex;
};

const rgbToHex = function(r, g, b) {
  result =
      '0x' + toHex(Math.floor(r)) + toHex(Math.floor(g)) + toHex(Math.floor(b));
  // console.log("rgb:" + result)
  return result;
};


window.onload = (e) => {
  new StopMotion();
};
