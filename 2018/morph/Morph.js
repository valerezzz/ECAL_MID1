'use strict';

// let canvas = document.getElementsByTagName('canvas')[0];
let canvas = document.getElementById('canvas');
// Donner les dimensions au canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// definition du context
let ctx = canvas.getContext('2d');
ctx.strokeStyle = 'black';
ctx.fillStyle = 'black';

//--------------------------------------------------

class Morph {
  constructor() {
    this.V = [
      new Point(10, 10, 10, 55, 10, 100),
      new Point(30, 100, 30, 55, 30, 10),
      new Point(50, 10, 50, 55, 50, 100),
    ];
    document.addEventListener('click', this.onClick.bind(this));
    this.draw();
  }

  onClick(e) {
    for (let i = 0; i < this.V.length; i++) {
      let shifted = this.V[i].states.shift();
      this.V[i].states.push(shifted);
      this.V[i].isMorphing = true;
    }
  }

  draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // afficher V
    for (let i = 0; i < this.V.length; i++) {
      this.V[i].update();
      this.V[i].view();
    }

    requestAnimationFrame(this.draw.bind(this));
  }
}

class Point {
  constructor(x, y, x2, y2, x3, y3) {
    this.x = x;
    this.y = y;
    this.states = [
      {'x': x, 'y': y},
      {'x': x2, 'y': y2},
      {'x': x3, 'y': y3},
      {'x': x2, 'y': y2},
    ];
    this.isMorphing = false;
    this.acc = 0.05;
  }
  update() {
    // modifier x et y
    if (this.isMorphing) {
      let diffx = this.states[0].x - this.x;
      let diffy = this.states[0].y - this.y;
      this.x += diffx * this.acc;
      this.y += diffy * this.acc;
      if (Math.abs(diffx) < 0.1 && Math.abs(diffy) < 0.1) {
        this.isMorphing = false;
        this.x = this.states[0].x;
        this.y = this.states[0].y;
      }
    }
  }
  view() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }
}

new Morph();
