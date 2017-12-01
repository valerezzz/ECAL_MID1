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
  }

  check() {
    // si le rayon dépasse un certain chiffre
    //----> return true;
  }

  update() {
    // agrandir le rayon
    // this.r++;
  }

  draw() {}
}



class Wave {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.circles = [];
    this.counter = 0;
  }

  draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (this.counter % 10 == 0) {
      this.circles.push(new Circle(this.x, this.y));
    }

    for (let i = this.circles.length; i > 0; i--) {
      this.circles[i].update();
      this.circles[i].draw();
      if (this.circles[i].check()) {
        // enlève le cercle du tableau
      }
    }

    this.counter++;
    requestAnimationFrame(this.draw.bind(this));
  }
}

let w = new Wave(window.innerWidth / 2, window.innerHeight / 2);
w.draw();
