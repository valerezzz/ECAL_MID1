'use strict';

// let canvas = document.getElementsByTagName('canvas')[0];
let canvas = document.getElementById('canvas');
// Donner les dimensions au canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// definition du context
let ctx = canvas.getContext('2d');
ctx.strokeStyle = 'black';


class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    let NBvertices = 32;
    let angle = 360 / NBvertices;
    this.circle = [];
    for (let i = 0; i < NBvertices; i++) {
      let posx = this.x + Math.cos((angle * i) * Math.PI / 180) * this.r;
      let posy = this.y + Math.sin((angle * i) * Math.PI / 180) * this.r;
      this.circle.push({'x': posx, 'y': posy});
    }
  }

  draw() {
    ctx.save();
    ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
    ctx.beginPath();
    for (let i = 0; i < this.circle.length; i++) {
      console.log('draw', this.circle[i].x, this.circle[i].y);
      if (i == 0) {
        ctx.moveTo(this.circle[i].x, this.circle[i].y);
      } else {
        ctx.lineTo(this.circle[i].x, this.circle[i].y);
      }
    }
    ctx.lineTo(this.circle[0].x, this.circle[0].y);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

for (let i = 0; i < 200; i++) {
  let c = new Circle(0, 0, 10 + i * 5);
  c.draw();
}
