'use strict';
/*
  FROM DANIEL SHIFFMAN TOOTHPICKS CHALLENGE 12.14.2018
*/
class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.setup();
  }
  setup() {
    this.minX = -this.w / 2;
    this.maxX = this.w / 2;
    this.picks = [];
    this.picks.push(new Toothpick(0, 0, 1, this.ctx));
    document.addEventListener('click', this.onclick.bind(this));
    this.draw();
  }

  onclick(e) {
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    let factor = this.w / (this.maxX - this.minX);
    this.ctx.save();
    this.ctx.translate(this.w / 2, this.h / 2);
    this.ctx.scale(factor, factor);
    for (let i = 0; i < this.picks.length; i++) {
      let t = this.picks[i];
      this.minX = Math.min(t.ax, this.minX);
      this.maxX = Math.max(t.ax, this.maxX);
      // rainbow version
      // let hue = Math.round(t.ax.map(this.minX, this.maxX, 0, 360));
      let hue = 0;
      t.show(factor, hue);
    }
    let next = [];
    for (let i = 0; i < this.picks.length; i++) {
      let t = this.picks[i];
      if (t.newPick) {
        let nextA = t.createA(this.picks);
        let nextB = t.createB(this.picks);
        if (nextA) {
          next.push(nextA);
        }
        if (nextB) {
          next.push(nextB);
        }
        t.newPick = false;
      }
    }
    this.picks = this.picks.concat(next);
    this.ctx.restore();
    requestAnimationFrame(this.draw.bind(this));
  }
};

Number.prototype.map = function(in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

window.onload = function() {
  new App();
}
