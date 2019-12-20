const PARTICLE_AMOUNT = 200000;
const DIMENSION = {
  'width': 500,
  'height': 500,
  'ratio': 1.5
};

const FOLDER = 'export2/';
const MAX = 69;
const gravity = 0.5;
let start = true;
let audio = false;
let specialStart = 0;
const movePos = {
  x: 0,
  y: 0
};
const mouse = {
  x: 0,
  y: 0,
};
let STOP = false;

class App {
  constructor() {
    // création de canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = DIMENSION.width;
    this.canvas.height = DIMENSION.height;
    this.ctx = this.canvas.getContext('2d');
    // document.body.appendChild(this.canvas);
    // stocker les images dans un tableau
    this.allImages = [];
    this.speed = 1;
    this.frame = 0;
    this._counter = 0;
    // charger toutes les images dans l'ordre
    this.loadSound();
    this.loadImage(1);
  }
  loadSound() {
    this.audio = new Audio();
    this.audio.src = './pp.mp3';
    document.body.appendChild(this.audio);
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
    // img.src = FOLDER + num + '.jpg';
    img.src = FOLDER + ((num < 10) ? '0' + num : num) + '.jpg';
  }
  initPixi() {
    this.isAdding = false;
    this.index = 0;
    this.minX = 0;
    this.minY = 0;
    this.renderer = PIXI.autoDetectRenderer(
        DIMENSION.width * DIMENSION.ratio, DIMENSION.height * DIMENSION.ratio,
        {transparent: true});
    // {backgroundColor: 0xff0d113e}
    this.stage = new PIXI.Stage();
    document.body.appendChild(this.renderer.view);

    // this.counter = document.createElement('div');
    // this.counter.className = 'counter';
    // document.body.appendChild(this.counter);
    // this.count = 0;
    // this.counter.innerHTML = this.count + ' BUNNIES';
    this.container = new PIXI.ParticleContainer(
        PARTICLE_AMOUNT, [false, true, false, true, true]);

    const textures = PIXI.Texture.fromImage('./sprite2.png');
    this.circle = new PIXI.Texture(
        textures.baseTexture, new PIXI.math.Rectangle(0, 0, 14, 14));
    this.square = new PIXI.Texture(
        textures.baseTexture, new PIXI.math.Rectangle(0, 14, 14, 14));

    this.stage.addChild(this.container);
    // this.initBunnies();
    this.initParticles();
    this.addListeners();
    // console.log('adding', this.isAdding);
    // this.audio.play();
    // this.draw();
  }
  initParticles() {
    this.particles = [];
    let angle = 0;
    for (let i = 0; i < PARTICLE_AMOUNT; i++) {
      let particle = new PIXI.Sprite(this.circle);
      particle.position.x = -10;
      // DIMENSION.width / 2 *DIMENSION.ratio;
      particle.position.y = -10
      // (DIMENSION.height - 100) *  DIMENSION.ratio;
      // particle.scale.set(1);
      particle.alphafactor = 0.05;
      particle.alpha = 0.05;
      particle.lifeSpan = 0;
      particle.MAXlifeSpan = Math.random() + 1;
      // console.log(particle);
      // particle.tint = 0xffff0000;
      angle = Math.random() * 2 * Math.PI;
      particle.vx = Math.cos(angle) * Math.random() * 10;
      particle.vy = Math.sin(angle) * Math.random() * 15;
      this.container.addChild(particle);
      this.particles.push(particle);
      // if (i == 0) {
      //   console.log(particle);
      // }
    }
  }
  updateAnimation() {
    if (this.frame % this.speed == 0) {
      this.ctx.clearRect(0, 0, DIMENSION.width, DIMENSION.height);
      this.ctx.drawImage(
          this.allImages[0], 0, 0, DIMENSION.width, DIMENSION.height);
      // permet d'afficher en premier dans le tableau et en pushant à la fin du
      // tableau = boucle
      this.data =
          this.ctx.getImageData(0, 0, DIMENSION.width, DIMENSION.height).data;
      let shift = this.allImages.shift();
      this.allImages.push(shift);
      this.frame = 0;
    }
    this.frame++;
  }
  moveParticles() {
    movePos.x = this.lerp(movePos.x, mouse.x, 0.1);
    movePos.y = this.lerp(movePos.y, mouse.y, 0.1);

    for (let i = 0; i < this.particles.length; i++) {
      let particle = this.particles[i];
      // particle.position.x += (particle.position.x <= 250 * DIMENSION.ratio) ?
      //     -particle.vx :
      //     particle.vx;
      if (particle.alphaFactor > 0.1) {
        particle.alphaFactor -= 0.1;
      } else {
        particle.alphaFactor = 0.1;
      }



      particle.position.x += particle.vx + movePos.x;
      particle.position.y += -Math.abs(particle.vy) + movePos.y;



      if (particle.lifeSpan < particle.MAXlifeSpan) {
        particle.lifeSpan += 0.03;
      } else {
        particle.alphaFactor = 0.6;
        particle.texture = this.square;
      }

      particle.alpha = particle.alphaFactor;


      // particle.alpha = particle.alphafactor;
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
        if (luminosity > 0.53) {
          // console.log(this._counter);
          if (this._counter < specialStart) {
            let shifted = this.particles[this._counter];
            // this.particles.push(shifted);


            shifted.position.x = x * DIMENSION.ratio;
            shifted.position.y = y * DIMENSION.ratio;

            shifted.alpha = 0.5;
            shifted.alphaFactor = 0.5;
            shifted.lifeSpan = 0;
            // shifted.scale.set(1);
            shifted.texture = (this.isAdding) ? this.square : this.circle;
          } else {
            this._counter = 0;
          }

          // shifted.vx = 1 - Math.random() * 5;
          // shifted.vy = 1 - Math.random() * 2;
          if (this._counter >= this.particles.length - 1) {
            this._counter = 0;
            // start = true;
            // console.log('boom');
          } else {
            this._counter++;
          }
        }
      }
      // this.container.onChildrenChange(0);
    }
  }
  initBunnies() {
    this.bunnys = [];
    let wabbitTexture = new PIXI.Texture.fromImage('bunnys.png')
    let bunny1 = new PIXI.Texture(
        wabbitTexture.baseTexture, new PIXI.math.Rectangle(2, 47, 26, 37));
    let bunny2 = new PIXI.Texture(
        wabbitTexture.baseTexture, new PIXI.math.Rectangle(2, 86, 26, 37));
    let bunny3 = new PIXI.Texture(
        wabbitTexture.baseTexture, new PIXI.math.Rectangle(2, 125, 26, 37));
    let bunny4 = new PIXI.Texture(
        wabbitTexture.baseTexture, new PIXI.math.Rectangle(2, 164, 26, 37));
    let bunny5 = new PIXI.Texture(
        wabbitTexture.baseTexture, new PIXI.math.Rectangle(2, 2, 26, 37));
    this.bunnyTextures = [bunny1, bunny2, bunny3, bunny4, bunny5];
  }
  addListeners() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode == 32) {
        if (!audio) {
          this.audio.play();
          this.draw();
          audio = true;
        }
      } else {
        STOP = !STOP;
      }
    })
    document.addEventListener('click', (e) => {
      console.log('adding');
      this.isAdding = !this.isAdding;
      mouse.x = (window.innerWidth / 2 - e.x) / 50;
      mouse.y = (window.innerHeight / 2 - e.y) / 50;
    });
    // document.addEventListener('mouseup', (e) => {
    //   this.isAdding = false;
    //   this.index++;
    //   this.index %= 5;
    // });
  }
  // update() {
  //   // console.log('log', this.isAdding);
  //   if (this.isAdding) {
  //     // add 100 at a time :)
  //
  //     if (this.count < PARTICLE_AMOUNT) {
  //       for (let i = 0; i < 100; i++) {
  //         var bunny = new PIXI.Sprite(this.bunnyTextures[this.index]);
  //         bunny.speedX = Math.random() * 10;
  //         bunny.speedY = (Math.random() * 10) - 5;
  //         bunny.anchor.y = 1;
  //         this.bunnys.push(bunny);
  //         bunny.scale.set(0.5 + Math.random() * 0.5);
  //         bunny.rotation = (Math.random() - 0.5);
  //         this.container.addChild(bunny);
  //         this.count++;
  //       }
  //     }
  //     this.counter.innerHTML = this.count + ' BUNNIES';
  //   }
  //
  //   for (let i = 0; i < this.bunnys.length; i++) {
  //     let bunny = this.bunnys[i];
  //     bunny.position.x += bunny.speedX;
  //     bunny.position.y += bunny.speedY;
  //     bunny.speedY += gravity;
  //     if (bunny.position.x > DIMENSION.width) {
  //       bunny.speedX *= -1;
  //       bunny.position.x = DIMENSION.width;
  //     } else if (bunny.position.x < this.minX) {
  //       bunny.speedX *= -1;
  //       bunny.position.x = this.minX;
  //     }
  //     if (bunny.position.y > DIMENSION.height) {
  //       bunny.speedY *= -0.85;
  //       bunny.position.y = DIMENSION.height;
  //       bunny.spin = (Math.random() - 0.5) * 0.2
  //       if (Math.random() > 0.5) {
  //         bunny.speedY -= Math.random() * 6;
  //       }
  //     } else if (bunny.position.y < this.minY) {
  //       bunny.speedY = 0;
  //       bunny.position.y = this.minY;
  //     }
  //   }
  // }

  draw() {
    // console.log('draw');
    // this.update();
    this.updateAnimation();
    if (!STOP) this.processDatas();
    this.moveParticles();
    this.renderer.render(this.stage);
    if (specialStart < this.particles.length) {
      specialStart += (specialStart < 1800) ? 5 : 2000;
    }
    console.log(specialStart, this._counter);
    requestAnimationFrame(this.draw.bind(this));
  }
  dist(x1, y1, x2, y2) {
    return (x2 - x1) ** 2 + (y2 - y1) ** 2;
  }
  lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
  }
};

window.onload = (e) => {
  new App();
};
