const DIMENSION = {
  'width': 500,
  'height': 500,
  'scale': 2,
};
const FOLDER = './export2/';
const EXT = '.jpg';
const MAX = 69;
const DELAY = 1;

class StopMotion {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = DIMENSION.width;
    this.canvas.height = DIMENSION.height;

    this.offsetX =
        window.innerWidth / 2 - (DIMENSION.width * DIMENSION.scale / 2);
    this.offsetY =
        window.innerHeight / 2 - (DIMENSION.height * DIMENSION.scale / 2);


    this.ctx = this.canvas.getContext('2d');
    // document.body.appendChild(this.canvas);
    this.counter = 0;
    this.frameCounter = 0;
    this.particleCounter = 0;
    this.explosion_state = false;
    this.mouse = {x: 0, y: 0};
    this.center = {x: window.innerWidth / 2, y: window.innerHeight / 2};
    this.setup();
  }
  setup() {
    this.allImages = [];
    this.initListeners();
    this.initGrid();
    this.loadImage(1);
  }

  initListeners() {
    document.addEventListener('click', this.mouseOnClick.bind(this));
    // document.addEventListener('mousemove', this.mouseOnMove.bind(this));
  }

  mouseOnClick(e) {
    this.explosion_state = !this.explosion_state;
  }
  mouseOnMove(e) {
    this.mouse.x = e.layerX;
    this.mouse.y = e.layerY;
    this.distance = this.dist(this.center.x, this.center.y, e.x, e.y);
    if (e.x < this.center.x) {
      this.distance *= -1;
    }
  }

  initGrid() {
    // initialiser

    const PX = new PIXI.Application(
        window.innerWidth, window.innerHeight,
        {transparent: false, antialias: true});
    document.body.appendChild(PX.view);
    PX.view.addEventListener('mousemove', this.mouseOnMove.bind(this));
    PX.renderer.backgroundColor = 0x00000000;

    const textures = PIXI.Texture.fromImage('./texture.png');

    this.pixel = new PIXI.Texture(
        textures.baseTexture, new PIXI.math.Rectangle(0, 0, 20, 20));
    this.dust = new PIXI.Texture(
        textures.baseTexture, new PIXI.math.Rectangle(0, 20, 20, 20));

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
      particle.vitesseXExplode = 5 - Math.random() * 10;
      particle.vitesseYExplode = -Math.random() * 25;
      this.particles.push(particle);
    }


    this.grid = [];

    let angle = 0;
    const step = 2;
    for (let y = step; y < DIMENSION.height; y += step) {
      for (let x = step; x < DIMENSION.width; x += step) {
        angle += Math.PI / 200;
        this.grid.push({x: x, y: y, angle: angle});
      }
    }
    const container =
        new PIXI.particles.ParticleContainer(this.particles.length, {
          scale: true,
          position: true,
          // rotation: true,
          uvs: true,
          alpha: true,
        });
    for (let i = 0; i < this.particles.length; i++) {
      container.addChild(this.particles[i]);
    }
    PX.stage.addChild(container);
    PX.ticker.add(this.draw, this);
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
        particle.position.x = x * DIMENSION.scale + this.offsetX;
        particle.position.y = y * DIMENSION.scale + this.offsetY;
        particle.alphaValue = 1;
        particle.texture = this.dust;


        this.particleCounter++;
        if (this.particleCounter >= this.particles.length) {
          this.particleCounter = 0;
        }
      } else {
        particle.scale.set(0);
      }
    }
  }

  moveParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];

      if (this.explosion_state == false) {
        particle.position.x += particle.vitesseX * this.distance / 500;
        // particle.texture = this.pixel;
        particle.alpha = particle.alphaValue;
        particle.alphaValue -= 0.5;
        if (particle.alphaValue < 0.1) {
          particle.alphaValue = 0.1;
          particle.texture = this.pixel;
          particle.scale.set(0.15);
        }


        // ADD MAGNIFIER script
        let range = 100;
        let zoom = 0.3;
        let differenceX = this.mouse.x - particle.position.x;
        let differenceY = this.mouse.y - particle.position.y;
        let length = this.dist(
            this.mouse.x, this.mouse.y, particle.position.x,
            particle.position.y);
        if (length < range) {
          const l = this.map(length, 0, range * 2, 0, Math.PI * 2);
          const angle = Math.cos(l);
          const amt = this.map(angle, -1, 1, 0, zoom);
          differenceX *= amt;
          differenceY *= amt;
          particle.position.x -= differenceX;
          particle.position.y -= differenceY;
        }
      } else {
        particle.position.x += particle.vitesseXExplode;
        particle.position.y += particle.vitesseYExplode;
      }
    }
  }


  draw() {
    // console.log('draw');
    if (this.frameCounter % DELAY == 0) {
      this.ctx.drawImage(
          this.allImages[this.counter], 0, 0, DIMENSION.width,
          DIMENSION.height);
      const data =
          this.ctx.getImageData(0, 0, DIMENSION.width, DIMENSION.height).data;
      // this.ctx.clearRect(0, 0, DIMENSION.width, DIMENSION.height);
      // // console.log(data);
      if (this.explosion_state == false) {
        this.processData(data);
      }

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

  dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  map(x, inMin, inMax, outMin, outMax) {
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }
};  //

window.onload = (e) => {
  new StopMotion();
};
