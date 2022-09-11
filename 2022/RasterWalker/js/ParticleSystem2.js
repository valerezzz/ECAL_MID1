import * as PIXI from "pixi.js";
export default class ParticleSystem {
  constructor() {
    this.ready = false;
    // init pixi
    const options = {
      width: window.innerWidth,
      height: window.innerHeight,
      transparent: false,
      antialias: true,
    };
    this.PX = new PIXI.Application(options);
    document.body.appendChild(this.PX.view);
    // this.PX.renderer.backgroundColor = 0x000000;
    this.mouse = { x: 0, y: 0 };
    this.nbrParticle = 50000;
    this.index = 0;
    this.allParticles = [];
    this.loadParticles();
  }

  loadParticles() {
    // texture pour les particules
    const texture = PIXI.Texture.from("texture/sprite.png");
    // ref sprite
    this.portion = new PIXI.Texture(
      texture.baseTexture,
      new PIXI.Rectangle(0, 0, 20, 20)
    );
    this.bubble = new PIXI.Texture(
      texture.baseTexture,
      new PIXI.Rectangle(0, 20, 100, 100)
    );
    for (let i = 0; i < this.nbrParticle; i++) {
      // creation des ref de texture.
      const particle = new PIXI.Sprite(this.portion);
      particle.anchor.set(0.5, 0.5);
      particle.scale.set(0.2, 0.2);
      particle.angle = 0;
      particle.lifespan = 1;
      this.allParticles.push(particle);
    }

    const options = {
      scale: true,
      position: true,
      // rotation: true,
      uvs: true,
      alpha: true,
    };
    // container WEBGL
    const container = new PIXI.ParticleContainer(this.nbrParticle, options);
    for (let i = 0; i < this.allParticles.length; i++) {
      const particle = this.allParticles[i];
      container.addChild(particle);
    }
    this.PX.stage.addChild(container);
    this.ready = true;
  }

  addParticle(x, y) {
    if (!this.pressed) {
      const particle = this.allParticles[this.index];
      particle.position.x = x;
      particle.position.y = y;
      particle.alpha = 1;
      particle.lifespan = 1;
      particle.vitesseX = 5 + Math.random() * 20;
      particle.vitesseY = 0; //5 - Math.random() * 10;
      particle.taille = 0.2;
      particle.scale.set(0.2, 0.2);
      particle.tint = 0xffffff;
      particle.texture = this.portion;
      particle.transparence = 0.01;
      particle.bubble = false;
      particle.amp = Math.random() * 10;

      if (this.index % 1000 == 0) {
        particle.position.x += 100 + Math.random() * 70;
        particle.taille = Math.max(0.5, Math.random());
        particle.transparence = 1;
        particle.texture = this.bubble;
        particle.vitesseX = Math.random() * 5;
        particle.vitesseY = -Math.random() * 5;
        particle.bubble = true;
      }

      this.index++;
      if (this.index >= this.nbrParticle) {
        this.index = 0;
      }
    }
  }

  update() {
    for (let i = 0; i < this.allParticles.length; i++) {
      const particle = this.allParticles[i];
      particle.lifespan--;

      if (particle.lifespan < 0 && !this.pressed) {
        particle.position.x += particle.vitesseX;
        particle.position.y += particle.vitesseY;
        particle.alpha = particle.transparence;
        particle.tint = 0xffffff;
        if (!particle.bubble) {
          particle.taille += 0.05;
          particle.vitesseY =
            Math.sin((particle.angle + i) * (Math.PI / 180)) * 5;
          particle.angle += 0.5;
          // particle.amp += 1;
        }
        particle.scale.set(particle.taille, particle.taille);
      } else if (this.pressed) {
        particle.position.x += particle.vitesseX;
        particle.position.y += particle.vitesseY;
      }

      //interaction
      // ADD MAGNIFIER script
      let range = 200;
      let zoom = 0.9;
      let differenceX = this.mouse.x - particle.position.x;
      let differenceY = this.mouse.y - particle.position.y;
      let length = this.dist(
        this.mouse.x,
        this.mouse.y,
        particle.position.x,
        particle.position.y
      );
      if (length < range) {
        const l = this.map(length, 0, range * 2, 0, Math.PI * 2);
        const angle = Math.cos(l);
        const amt = this.map(angle, -1, 1, 0, zoom);
        differenceX *= amt;
        differenceY *= amt;
        particle.position.x -= differenceX;
        particle.position.y -= differenceY;
      }
    }
  }

  move(x, y) {
    this.mouse = { x: x, y: y };
  }
  press(x, y) {
    this.pressed = true;
  }
  release(x, y) {
    this.pressed = false;
  }

  dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }
  map(x, inMin, inMax, outMin, outMax) {
    return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
}
