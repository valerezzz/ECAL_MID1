'use strict';

// let canvas = document.getElementsByTagName('canvas')[0];
let canvas = document.getElementById('canvas');
// Donner les dimensions au canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// definition du context
let ctx = canvas.getContext('2d');
let backgroundColor;
let w = window.innerWidth;
let h = window.innerHeight;
let x = 0;
let size = 30;
let cols = Math.ceil(window.innerWidth / size);
let rows = Math.ceil(window.innerHeight / size);
let allModules = [];
let img = new Image();
img.src = 'level.jpg';
let data;

function setup() {
  // initialisation de notre programme
  document.addEventListener('click', onMouseClick, false);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let module = new Module(x * size, y * size, size, ctx);
      allModules.push(module);
    }
  }
  let posx = window.innerWidth / 2 - img.width / 2;
  let posy = window.innerHeight / 2 - img.height / 2;
  ctx.drawImage(img, posx, posy);
  data = ctx.getImageData(0, 0, w, h);
  draw();
}

function onMouseClick(e) {
  // Determiner la grille voulue, ici 2x2
  let cols = 2;
  let rows = 2;
  // Récupérer l'id de la "case" dans laquelle on a cliqué.
  let index = Math.floor(e.x / (window.innerWidth / cols)) +
      Math.floor(e.y / (window.innerHeight / rows)) * rows;
  console.log(index);
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.save();
  ctx.translate(size, size);
  for (let i = 0; i < allModules.length; i++) {
    // allModules[i].update();
    ctx.save();
    ctx.translate(allModules[i].x, allModules[i].y);
    // get LUMINOSITY
    let index = 4 * (allModules[i].pos.y * w + allModules[i].pos.x);
    let r = data.data[index];
    let g = data.data[index + 1];
    let b = data.data[index + 2];
    let a = data.data[index + 3];
    let grey = Math.round(r * 0.3 + g * 0.59 + b * 0.11);
    // pixel gris/noir
    if (grey < 50) {
      ctx.rotate(Math.PI / 2);
    }
    allModules[i].draw();
    ctx.restore();
  }
  ctx.restore();
  // pour générer la boucle
  requestAnimationFrame(draw);
}

// pour dessiner des diagonales
class Module {
  constructor(x, y, size, ctx) {
    this.x = x - size / 2;
    this.y = y - size / 2;
    this.ctx = ctx;
    this.color = 'red';
    this.sColor = 'black';
    this.size = size;
    this.rnd = Math.floor(Math.random() * 54);
    this.pos = {
      'x': x,
      'y': y,
    };
  }

  update() {}

  draw() {
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = this.sColor;
    this.ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
    this.ctx.lineWidth = 10;
    this.ctx.beginPath();
    this.ctx.moveTo(-this.size / 2, this.size / 2);
    this.ctx.lineTo(this.size / 2, -this.size / 2);
    this.ctx.lineCap = 'round';
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

setTimeout(setup, 100);
