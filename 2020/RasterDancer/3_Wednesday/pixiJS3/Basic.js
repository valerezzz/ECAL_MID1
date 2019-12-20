const PARTICLE_AMOUNT = 200000;
const DIMENSION = {
  'width': 500,
  'height': 500,
  'ratio': 2.5,
};
const FOLDER = 'export2/';
const MAX = 68;

class Basic {
  constructor() {
    // création de canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = DIMENSION.width;
    this.canvas.height = DIMENSION.height;
    this.ctx = this.canvas.getContext('2d');
    this.allImages = [];
    this.speed = 1;
    this.frame = 0;
    this._counter = 0;
    // charger toutes les images dans l'ordre
    this.loadImage(1);
  }

  loadImage(num) {
    let img = new Image();
    img.onload = (e) => {
      this.allImages.push(img)
      if (this.allImages.length == MAX) {
        this.initPixi();
      }
      else {
        num++;
        this.loadImage(num);
      };
    };
    img.src = FOLDER + ((num < 10) ? '0' + num : num) + '.jpg';
  }
  initPixi() {
    this.isAdding = false;
    this.renderer = PIXI.autoDetectRenderer(
        DIMENSION.width * DIMENSION.ratio, DIMENSION.height * DIMENSION.ratio,
        {transparent: true});
    this.stage = new PIXI.Stage();
    document.body.appendChild(this.renderer.view);
    this.container = new PIXI.ParticleContainer(
        PARTICLE_AMOUNT, [false, true, false, true, true]);

    const textures = PIXI.Texture.fromImage('./sprite2.png');
    this.circle = new PIXI.Texture(
        textures.baseTexture, new PIXI.math.Rectangle(0, 0, 14, 14));
    this.square = new PIXI.Texture(
        textures.baseTexture, new PIXI.math.Rectangle(0, 14, 14, 14));

    this.stage.addChild(this.container);
    this.initParticles();
    this.addListeners();
    this.draw();
  }
  initParticles() {
    this.particles = [];
    let angle = 0;
    for (let i = 0; i < PARTICLE_AMOUNT; i++) {
      let particle = new PIXI.Sprite(this.circle);
      // set init particles outside
      particle.position.x = -10;
      particle.position.y = -10;
      // particle.scale.set(1);
      // default alpha low + factor to decrease
      particle.alphafactor = 0.05;
      particle.alpha = 0.05;
      // variables to check when to change texture through time
      particle.lifeSpan = 0;
      particle.MAXlifeSpan = Math.random() + 1;
      // set vitesse circulaire
      angle = Math.random() * 2 * Math.PI;
      particle.vx = Math.cos(angle) * Math.random() * 10;
      particle.vy = Math.sin(angle) * Math.random() * 15;

      this.container.addChild(particle);
      this.particles.push(particle);
    }
  }
  updateAnimation() {
    if (this.frame % this.speed == 0) {
      this.ctx.clearRect(0, 0, DIMENSION.width, DIMENSION.height);
      this.ctx.drawImage(
          this.allImages[0], 0, 0, DIMENSION.width, DIMENSION.height);
      this.data =
          this.ctx.getImageData(0, 0, DIMENSION.width, DIMENSION.height).data;
      let shift = this.allImages.shift();
      this.allImages.push(shift);
      this.frame = 0;
    }
    this.frame++;
  }
  moveParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      let particle = this.particles[i];
      // decrease alpha if bigger that limit
      if (particle.alphaFactor > 0.1) {
        particle.alphaFactor -= 0.1;
      } else {
        particle.alphaFactor = 0.1;
      }
      // move
      particle.position.x += particle.vx;
      particle.position.y += -Math.abs(particle.vy);
      // check lifespan and change texture when over
      if (particle.lifeSpan < particle.MAXlifeSpan) {
        particle.lifeSpan += 0.03;
      } else {
        particle.alphaFactor = 0.6;
        particle.texture = this.square;
      }
      // apply alpha factor
      particle.alpha = particle.alphaFactor;
    }
  }
  processDatas() {
    // analyser les pixels de l'animation
    for (let y = DIMENSION.height; y >= 0; y -= 1) {
      for (let x = 0; x < DIMENSION.width; x += 1) {
        // recup la valeur des pixels
        let index = (y * DIMENSION.width + x) * 4;
        let r = this.data[index];
        let g = this.data[index + 1];
        let b = this.data[index + 2];
        let luminosity = Math.round(r * 0.3 + g * 0.59 + b * 0.11) / 255;
        if (luminosity > 0.90) {
          let shifted = this.particles[this._counter];
          shifted.position.x = x * DIMENSION.ratio;
          shifted.position.y = y * DIMENSION.ratio;
          shifted.alpha = 0.5;
          shifted.alphaFactor = 0.5;
          shifted.lifeSpan = 0;
          shifted.texture = (this.isAdding) ? this.square : this.circle;
          if (this._counter >= this.particles.length - 1) {
            this._counter = 0;
          } else {
            this._counter++;
          }
        }
      }
    }
  }
  addListeners() {
    document.addEventListener('click', (e) => {
      console.log('adding');
      this.isAdding = !this.isAdding;
    });
  }

  draw() {
    this.updateAnimation();
    this.processDatas();
    this.moveParticles();
    this.renderer.render(this.stage);
    requestAnimationFrame(this.draw.bind(this));
  }
};

window.onload = (e) => {
  new Basic();
};
