import * as PIXI from "pixi.js";
export default class ParticleSystem {
  constructor() {
    this.ready = false;
    // init pixi
    this.PX = new PIXI.Application(
      // this.dimensions.width,
      // this.dimensions.height,
      {
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: false,
        antialias: true,
      }
    );
    document.body.appendChild(this.PX.view);
    this.PX.renderer.backgroundColor = 0x00000000;
    // texture pour les particules
    const texture = PIXI.Texture.from("texture/dot.png");
    // ref sprite
    this.pixel = new PIXI.Texture(
      texture.baseTexture,
      new PIXI.Rectangle(0, 0, 20, 20)
    );

    this.initParticles();
  }
  initParticles() {
    // init la mémoire des particles
    this.particles = [];
    const nombre_de_particules = 50000;
    for (let i = 0; i < nombre_de_particules; i++) {
      // creation des ref de texture.
      const particle = new PIXI.Sprite(this.pixel);
      particle.anchor.set(0.5, 0.5);
      particle.x = -10;
      particle.y = -10;
      particle.angle = 0;
      particle.scale.set(0.3);
      this.particles.push(particle);
    }

    // container WEBGL
    const container = new PIXI.ParticleContainer(this.particles.length, {
      scale: true,
      position: true,
      // rotation: true,
      uvs: true,
      alpha: true,
    });
    for (let i = 0; i < this.particles.length; i++) {
      container.addChild(this.particles[i]);
    }
    this.PX.stage.addChild(container);
    this.availableParticleIndex = 0;
    this.angle = 0;
    this.ready = true;
  }

  addParticle(x, y) {
    const particle = this.particles[this.availableParticleIndex];
    particle.tint = "0xffffff";
    particle.position.x = x;
    particle.position.y = y;
    particle.alpha = 1;
    particle.scale.set(0.3);
    // particle.angle = 0;
    particle.changement = 0.5;
    particle.vitesseX = 10; //10;
    particle.vitesseY = 0;
    particle.v = 5 - Math.random() * 10;
    particle.amplitude = Math.random() * 50;

    this.availableParticleIndex++;
    if (this.availableParticleIndex >= this.particles.length)
      this.availableParticleIndex = 0;
  }

  update() {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      particle.position.x += particle.vitesseX;
      particle.position.y += particle.vitesseY;
      particle.changement -= 0.1;
      if (particle.changement < 0.4) {
        particle.vitesseX = 10 + Math.random() * 5;
        particle.vitesseY = particle.v;
        particle.v =
          Math.sin(particle.angle * (Math.PI / 180)) * particle.amplitude;
        particle.alpha = 0.5;
        particle.tint = "0x9999ff";
        // particle.tint = `0x${
        //   99 *
        //   Math.round(
        //     Math.abs(Math.cos((particle.angle / 15) * (Math.PI / 180)))
        //   )
        // }${
        //   99 *
        //   Math.round(
        //     Math.abs(Math.cos((particle.angle / 15) * (Math.PI / 180)))
        //   )
        // }ff`;
        particle.scale.set(0.2);
        particle.angle += 5;
        particle.amplitude -= 1;
      }
    }
  }
}
