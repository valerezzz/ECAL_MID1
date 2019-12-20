'use strict';

let PX;
const DIMENSION = {
  'width': 1280,
  'height': 720,
};
let MAX = 1;
let particle;
let letters;
let imageData;
let text;
let letterIndex;
let date;
class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = DIMENSION.width;
    this.canvas.height = DIMENSION.height;
    this.ctx = this.canvas.getContext('2d');

    this.allImages = [];
    this.loadImage(0);
  }
  loadImage(i) {
    let img = new Image();
    img.onload =
        (function(e) {
          this.allImages.push(img);
          console.log(this.allImages[0].width, this.allImages[0].height);
          if (this.allImages.length == MAX) {
            this.ctx.drawImage(this.allImages[0], 0, 0, 470, 531);
            imageData = this.ctx.getImageData(
                0, 0, this.allImages[0].width, this.allImages[0].height);
            this.ctx.clearRect(0, 0, DIMENSION.width, DIMENSION.height);
            this.init();
          } else {
            i++;
            this.loadImage(i);
          }
        }).bind(this);
    img.src = 'andy.jpg';
  }
  draw() {
    letterIndex = 0;
    date = new Date();
    let hours =
        (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
    let minutes =
        (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    let seconds =
        (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
    text = hours + 'H' + minutes + ':' + seconds + ':';

    for (let i = 0; i < particle.length; i++) {
      let index = 4 *
          (particle[i].originx + particle[i].originy * this.allImages[0].width);
      let r = imageData.data[index];
      let g = imageData.data[index + 1];
      let b = imageData.data[index + 2];
      let brightness = 0.34 * r + 0.5 * g + 0.16 * b;
      if (brightness > 50) {
        let radius = Math.round((brightness / 255) * 6) + Math.random() * 2;
        particle[i].scale.set(radius / 8);
        particle[i].tint = '0x' + this.rgbToHex(r, g, b);
        particle[i].alpha = 0.4;
        letters[i].scale.set(radius / 4);
        letters[i].tint = '0x' + this.rgbToHex(r, g, b);
        letters[i].text = text[letterIndex];
        // console.log(this.rgbToHex(r, g, b));

        if (letterIndex >= text.length - 1) {
          letterIndex = 0;
        } else {
          letterIndex++;
        }
      }
    }
  }
  // convert 0..255 R,G,B values to a hexidecimal color string
  rgbToHex(r, g, b) {
    let bin = r << 16 | g << 8 | b;
    return (function(h) {
      return new Array(7 - h.length).join('0') + h;
    })(bin.toString(16).toUpperCase());
  }

  init() {
    PX = new PIXI.Application(1000, 1000, {antialias: true});
    document.body.appendChild(PX.view);
    document.body.appendChild(this.canvas);

    particle = [];
    letters = [];
    for (let j = 0; j < this.allImages[0].height; j += 6) {
      for (let i = 0; i < this.allImages[0].width; i += 6) {
        let graphics = PIXI.Sprite.fromImage('circle.png');
        graphics.originx = i;
        graphics.originy = j;
        graphics.anchor.set(0.5, 0.5);
        graphics.x = i * 2;
        graphics.y = j * 2;
        graphics.scale.set(0);
        particle.push(graphics);

        let countingText = new PIXI.Text('a', {
          fontSize: 10,
          fontFamily: 'Arial',
          fontWeight: 'light',
          fill: '#ffffff',
        });
        countingText.x = i * 2;
        countingText.y = j * 2;
        countingText.scale.set(0);
        countingText.anchor.set(0.5);
        letters.push(countingText);
        PX.stage.addChild(countingText);

        // let index = 4 * (j * this.allImages[0].width + i);
        // let r = data[index];
        // let g = data[index + 1];
        // let b = data[index + 2];
        // let a = data[index + 3];
        // let grey = Math.round(r * 0.3 + g * 0.59 + b * 0.11);
        // if (grey > 50) {
        //   let radius = Math.round((grey / 255) * 6) + Math.random() * 3;
        //   // ctx.fillStyle = "rgba("+r+","+g+","+b+",0.5)";
        //   ctx.fillStyle = 'rgba(255,255,255,1)';
        //   ctx.beginPath();
        //   // ctx.rect(i,j,2,2);
        //   ctx.arc(offsetX + i * 2, j * 2, radius, 0, Math.PI * 2, false);
        //   ctx.fill();
        //   ctx.closePath();
      }
    }
    let sprites = new PIXI.particles.ParticleContainer(particle.length, {
      scale: true,
      // position: true,
      // rotation: true,
      // uvs: true,
      alpha: true,
    });
    for (let i = 0; i < particle.length; i++) {
      sprites.addChild(particle[i]);
    }
    PX.stage.addChild(sprites);

    PX.ticker.add(this.draw, this);
  }
}


window.onload = function() {
  new App();
};
