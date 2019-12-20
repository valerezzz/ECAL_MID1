/*  uv mapping
const textures = PIXI.Texture.fromImage('./texture.png');

this.pixel = new PIXI.Texture(
    textures.baseTexture, new PIXI.math.Rectangle(0,0,20,20));
this.dust = new PIXI.Texture(
    textures.baseTexture, new PIXI.math.Rectangle(0,20,20,20));

    // texture reference

*/


var d = new Date();

const DIMENSION = {
  'width': 512,
  'height': 512,
  'scale': 1
};
const LENGTH = 64;
const DELAY = 2;
const MYFOLDER = 'fonk_jpg';
var frame = 0;
var animationFrame = 0;
var millis;
var audioFail = false;
var date;
var canv;
myAudio = new Audio('fonk.mp3');
myAudio.loop = true;

if (innerWidth <= DIMENSION.width) {
  DIMENSION.scale = innerWidth / DIMENSION.width;
  console.log('smollah');
} else {
  DIMENSION.scale = innerHeight / DIMENSION.height;
  console.log('biggah')
}



class StopMotion {
  constructor() {
    this.canvas = document.createElement('canvas');

    this.canvas.width = DIMENSION.width;
    this.canvas.height = DIMENSION.height;
    this.ctx = this.canvas.getContext('2d');

    this.particleCounter = 0;
    this.redParticlesCounter = 0;
    this.rotation = 0;

    /* document.body.appendChild(this.canvas); */
    // --> headless canvas


    this.allImages = [];
    this.angle = 0;

    this.letterIndex = 0;

    this.setup();
  };

  setup() {
    console.log('57');
    this.initGrid();
    this.loadImage(1);
    try {
      // myAudio.play();
    } catch {
      audioFail = true;
    }
    this.factor = 1;

    // capturer.start();

    /* console.log("rgb(" + (230 + Math.floor(noise(frame * .01) * 20)) + "," +
     * (Math.floor(Math.random() * 80)) + "," + "10)"); */

    /* this.canvas = PX.view;
    this.ctx = this.canvas.context; */
  };

  loadImage(i) {
    console.log('hello');
    var number;

    if (i < 10) {
      number = '0' + i;
    } else {
      number = i;
    }

    const url = MYFOLDER + '/' + number + '.jpg';

    const image = new Image();
    image.src = url;
    this.allImages.push(image);

    if (this.allImages.length >= LENGTH) {
      console.log('all images');
      this.draw();
    } else {
      i++;
      this.loadImage(i);
    }
  };

  initGrid() {
    // pixi js init

    const PX = new PIXI.Application(
        DIMENSION.width * DIMENSION.scale, DIMENSION.height * DIMENSION.scale, {
          antialias: true,
          /* view: this.canvas */
        });
    document.body.appendChild(PX.view);

    this.grid = [];
    this.particles = [];
    this.redParticles = [];
    let angle = 0;
    let gridStep = 2;
    const particleNum = 100000;
    // particles
    for (var i = 0; i < particleNum; i++) {
      const particle = new PIXI.Sprite.fromImage('referenceTest_x05.png');
      particle.anchor.set(0.5, 0.5);
      particle.x = -10;
      particle.y = -10;
      particle.scale.set(.05);
      particle.seed = Math.random();
      particle.velX = particle.seed * 10 + 1;
      particle.velY = 0;
      particle.alpha = 1;
      particle.type = 'white';
      particle.age = 0;
      this.particles.push(particle);
    };



    // grid steps
    for (let y = gridStep; y < DIMENSION.height; y += gridStep) {
      for (let x = gridStep; x < DIMENSION.height; x += gridStep) {
        angle += Math.PI / 78;
        this.grid.push({x: x, y: y, angle: angle});
      }
    }
    // console.log(this.particles);
    const container = new PIXI.ParticleContainer(this.particles.length, {
      scale: true,
      position: true,
      // rotation: true,
      // uvs: true,
      alpha: true
    });


    for (var i = 0; i < this.particles.length; i++) {
      container.addChild(this.particles[i]);
    }

    PX.stage.addChild(container);
    PX.ticker.add(this.draw, this);
  }

  draw() {
    if (animationFrame < this.allImages.length - 1) {
      if (frame % DELAY == 0) {
        animationFrame++;
      }
    } else {
      animationFrame = 1;
    }

    this.ctx.drawImage(
        this.allImages[animationFrame], 0, 0, DIMENSION.width,
        DIMENSION.height);
    const data =
        this.ctx.getImageData(0, 0, DIMENSION.width, DIMENSION.height).data;

    this.processData(data);

    frame++;
  };


  processData(data) {
    /* let luminance = [];
    for (var i = 0; i < Math.pow(DIMENSION.width,2); i+=4){
        const red = data[i];
        const green = data[i+1];
        const blue = data[i+2];
        luminance[i/4] = (red*.2126)+(green*.7152)+(blue*.0722);
        //console.log(luminance[i/4]);
    } */
    console.log();
    this.letterIndex = 0;

    const step = 4;
    /* + (Math.floor(map(sin(frame), -1, 1, 0, 10)) * 0.1) +
       (Math.floor(map(sin(frame), -1, 1, 0, 10)) * 0.01); console.log("step:
       "+step); */

    /* this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, DIMENSION.width, DIMENSION.height); */

    /*         for (var y = step; y < DIMENSION.height; y += step) {
                for (var x = DIMENSION.width - step; x > 0; x -= step) { */
    for (let i = 0; i < this.grid.length; i++) {
      const particle = this.particles[this.particleCounter];
      // const particle = this.redParticles[this.redParticlesCounter];
      const redParticle = this.redParticles[this.redParticlesCounter];

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


      // console.log(currentLuminance);
      /* if (currentLuminance < 180) {
          this.ctx.fillStyle = 'rgb(' + map(red,0,255,255,0) + ',' +
      map(green,0,255,255,0) + ',' + map(blue,0,255,255,0) + ')';
          this.ctx.beginPath();
          this.ctx.arc(
              x + Math.cos(this.angle * Math.PI / 180) * 10,
              y + Math.cos(this.angle * Math.PI / 180) * 20,
              (currentLuminance / 128 + 1) * 3,
              Math.PI * 2, false);
          //console.log('rgb('+Math.floor(luminance[y*DIMENSION.width+x])+','+Math.floor(luminance[y*DIMENSION.width+x])+','+Math.floor(luminance[y*DIMENSION.width+x])+',
      255)'); this.ctx.fill(); this.ctx.closePath();
      } */

      // red < 10 && green < 10 && blue < 10



      // outline
      if (red < 15 && green < 15 && blue < 15) {
        /* this.ctx.fillStyle = 'rgb(30, 255, 40)'; */

        // this.ctx.fillStyle= 'rgb('+currentLuminance+",
        // "+currentLuminance+","+currentLuminance+")";  this.ctx.fillStyle=
        // 'rgb('+red+", "+green+","+blue+")";
        /*
            this.ctx.beginPath();
            this.ctx.arc(x-(Math.random()*2), y-(Math.random()*2), 4, 0, Math.PI
           * 2, true); this.ctx.fill(); this.ctx.closePath(); */


        /* if (Math.random() * DIMENSION.height < y * 2) {
            this.ctx.fillStyle = 'rgb(30,'+
        Math.floor(map(x,0,DIMENSION.width,50,300))+', 40)';
            this.ctx.fillRect(x*Math.random(), y, step*Math.random()*12, step *
        .3);
        }
        if (x < 300) {
            this.ctx.fillStyle = 'rgb(255, 255, 40)';
            this.ctx.fillRect(x, y, step - 1, step * 3);
        } */

        /*
             this.ctx.fillStyle = 'rgb(66, 23, 209)';
            this.ctx.fillRect(x, y, step *3, step * .3);
            this.ctx.fillRect(x, y, step *.3, step * 3);

             */
        // this.ctx.fillRect(x, y, step, step);

        /* this.ctx.fillStyle='rgb(100,0,40)';
        this.ctx.fillRect(x-3,y+14,step,step*2); */

        /* this.ctx.beginPath();
        this.ctx.fillStyle = 'rgb(' + (y * .5) + ',' + (x * .5) + ', 140)';
        this.ctx.arc(x + (Math.sin(this.grid[i].angle * .005) * (DIMENSION.width
        - x * 2)), y * .4 * (Math.sin(this.grid[i].angle * .01) + 2), sin(frame
        * .01) + 2, 0, Math.PI * 2, true); this.ctx.fill();
        this.ctx.closePath(); */
      }
      // arms
      if (red > 200 && green < 10 && blue < 10) {
        if (red < 10 && green > 190 && blue > 190) {
          if ((animationFrame % 2 == 0 && animationFrame % 3 == 0)) {
            particle.age = 0;
            particle.type = 'arms';
            particle.scale.set(particle.seed / 10 * DIMENSION.scale);
            particle.position.x =
                (x + Math.random() * 3 - 1.5) * DIMENSION.scale;
            particle.position.y =
                (y + Math.random() * 3 - 1.5) * DIMENSION.scale;
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
        if ((animationFrame % 2 == 0 && animationFrame % 3 == 0)) {
          particle.age = 0;
          particle.type = 'body';
          particle.scale.set(particle.seed / 11 * DIMENSION.scale);
          particle.position.x = (x + Math.random() * 3 - 1.5) * DIMENSION.scale;
          particle.position.y = (y + Math.random() * 3 - 1.5) * DIMENSION.scale;
          particle.alpha = 1;
          // particle.scale.set(.03)

          particle.velX = particle.seed * 10 + 1;
          particle.velY = 0;
          particle.tint = rgbToHex(
              map(DIMENSION.width - y, 0, DIMENSION.height, 0, 255), 120,
              map(DIMENSION.width - y, 0, DIMENSION.height, 0, 255))
          // console.log(particle.tint);
        }
      }

      // beak upper
      if (red > 190 && green < 10 && blue > 150) {
        /* var randomNoise = floor(Math.random()*255);
        this.ctx.fillStyle =
        "rgb("+randomNoise+","+randomNoise+","+randomNoise+")";
        this.ctx.beginPath();
        this.ctx.arc(x,y,3,0,Math.PI*2,false);
        this.ctx.fill();
        this.ctx.closePath(); */
      }
      //  beak lower
      if (red > 200 && green > 160 && blue < 10) {
        /* var randomNoise = floor(Math.random()*255);
        this.ctx.fillStyle =
        "rgb("+randomNoise+","+randomNoise+","+randomNoise+")";
        this.ctx.beginPath();
        this.ctx.arc(x,y,3,0,Math.PI*2,false);
        this.ctx.fill();
        this.ctx.closePath(); */
      }

      //  eye
      if (red < 110 && red > 80 && green < 10 && blue > 100) {
        if (currentLuminance < 10 &&
            (animationFrame == 12 || animationFrame == 13 ||
             animationFrame == 28 || animationFrame == 29 ||
             animationFrame == 44 || animationFrame == 45 ||
             animationFrame == 60 || animationFrame == 61)) {
          // console.log(animationFrame);
          particle.type = 'white';
          particle.scale.set(particle.seed * .6 * DIMENSION.scale);
          particle.position.x = x * DIMENSION.scale;
          particle.position.y = y * DIMENSION.scale;
          particle.alpha = 1 - particle.seed;

          /* particle.velX = particle.seed * 10 + 1;
          particle.velY = Math.random()*3-1.5-4; */
          /* particle.tint = "0x" + toHex(Math.floor(map(x, 0, DIMENSION.width,
             70, 255))) + toHex(Math.floor(map(y, 0, DIMENSION.height, 70,
             255))) + toHex(150); */
          particle.tint = rgbToHex(255, 0, 0);
        }
      }


      // outlines rotation

      if (currentLuminance < 10) {
        //  rotatron
        particle.age = 0;
        particle.type = '!clear';
        particle.scale.set(particle.seed / 10 * DIMENSION.scale);
        particle.position.x = (x + Math.random() * 3 - 1.5) * DIMENSION.scale;
        particle.position.y = (y + Math.random() * 3 - 1.5) * DIMENSION.scale;
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


      if (currentLuminance < 10 && animationFrame % 2 == 0) {
        //  rotatron
        particle.age = 0;
        particle.type = 'clear';
        particle.scale.set(particle.seed / 10 * DIMENSION.scale);
        particle.position.x = (x + Math.random() * 3 - 1.5) * DIMENSION.scale;
        particle.position.y = (y + Math.random() * 3 - 1.5) * DIMENSION.scale;
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

      // paw1
      if (red < 10 && green > 200 && blue < 10) {
        if (y > 440 && animationFrame > 53 && animationFrame < 56) {
          particle.type = 'red';
          particle.position.x =
              (x - 13 + Math.random() * 16 - 8) * DIMENSION.scale;
          particle.position.y =
              (y + 12 + Math.random() * 16 - 8) * DIMENSION.scale;
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
        if (y > 390 && animationFrame > 14 && animationFrame < 17) {
          // console.log("PAW!");
          particle.type = 'red';
          particle.position.x =
              (x - 20 + Math.random() * 25 - 12.5) * DIMENSION.scale;
          particle.position.y =
              (y + 12 + Math.random() * 4 - 2) * DIMENSION.scale;
          particle.tint = rgbToHex(
              0, map(x, 120, DIMENSION.width, 255, 0),
              map(y, 400, DIMENSION.height, 120, 255) - particle.seed * 50);
          particle.alpha = .3;
          particle.velX = Math.random() * 20 - 10;
          particle.velY = -particle.seed * 5;
          particle.scale.set(.9 * DIMENSION.scale);
        }
      }
      // outline

      if (currentLuminance < 10 &&
          (/*
animationFrame == 12 ||
animationFrame == 13 ||
animationFrame == 14 ||
animationFrame == 28 ||
animationFrame == 29 ||
animationFrame == 30 ||
animationFrame == 44 ||
animationFrame == 45 ||
animationFrame == 46 ||
animationFrame == 60 ||
animationFrame == 61 ||
animationFrame == 62 */
           animationFrame % 4 == 0)) {
        // console.log(animationFrame);
        particle.type = 'white';
        particle.scale.set(particle.seed * .45 * DIMENSION.scale);
        particle.position.x = x * DIMENSION.scale;
        particle.position.y = y * DIMENSION.scale;
        particle.alpha = 1 - particle.seed;

        /* particle.velX = particle.seed * 10 + 1;
        particle.velY = Math.random()*3-1.5-4; */
        /* particle.tint = "0x" + toHex(Math.floor(map(x, 0, DIMENSION.width,
           70, 255))) + toHex(Math.floor(map(y, 0, DIMENSION.height, 70, 255)))
           + toHex(150); */
        particle.tint = rgbToHex(255, 255, 255);
      }
      //  hands pop
      /* if (red > 200 && green > 190 && blue < 10) {
          particle.age = 0;
          particle.type = "pop";
          particle.position.x = x * DIMENSION.scale;
          particle.position.y = y * DIMENSION.scale;
          particle.tint = rgbToHex(0, map(y,100,DIMENSION.width-200,40,180),
      map(x,40,400,255,0)+particle.seed*20); particle.alpha = particle.seed *
      .1; const randAngle = Math.random() * Math.PI * 2; particle.velX =
      Math.cos(randAngle) * 10; particle.velY = Math.sin(randAngle) * 10;
          //console.log(particle.velX,particle.velY);
          particle.scale.set(.5 * DIMENSION.scale);
      } */


      /* else {
                         this.ctx.fillStyle = 'black';

                         this.ctx.fillRect(x, y, step, step);

                     } */

      // console.log(this.text[this.letterIndex]);
      /*   this.ctx.fillText(this.text[this.letterIndex],
            x,
            y,
            12);
        //console.log(this.text);
        this.letterIndex++;
        if (this.letterIndex>=this.text.length){
            this.letterIndex=0;
        } else {

        } */
      this.particleCounter++;
      if (this.particleCounter >= this.particles.length) {
        this.particleCounter = 0;
      }
    }
    this.moveParticles(this.particles);
  }
  moveParticles(ParticleContainer) {
    for (var i = 0; i < ParticleContainer.length; i++) {
      const particle = ParticleContainer[i];
      // sort through time
      /* if (Math.sin(frame * .1) < 0) {
          if (particle.type == "white") {
              if (frame % 2 == 0) {
                  particle.type = "!clear"
              } else {
                  particle.type = "clear"
              }
          }
      } */


      if (particle.type == 'red') {
        particle.position.x += particle.velX;
        particle.position.y -= particle.velY;

        particle.alpha -= .002;
        if (particle.alpha < 0) {
          particle.alpha = 0;
        }
        particle.scale.set(particle.scale.x - .01)
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
};



const map =
    (num, in_min, in_max, out_min, out_max) => {
      return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

const toHex = function(rgb) {
  var hex = Number(rgb).toString(16);
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

window.onload = function() {
  new StopMotion();
}
