'use strict';

class Toothpick {
  constructor(x, y, d, ctx) {
    this.ctx = ctx;
    this.len = 63;
    this.dir = d;
    this.newPick = true;
    if (this.dir == 1) {
      this.ax = x - this.len / 2;
      this.bx = x + this.len / 2;
      this.ay = y;
      this.by = y;
    } else {
      this.ax = x;
      this.bx = x;
      this.ay = y - this.len / 2;
      this.by = y + this.len / 2;
    }
  }
  show(factor, hue) {
    this.ctx.strokeStyle = 'hsl(' + hue + ', 100%, 50%)';
    if (this.newPick) {
      this.ctx.strokeStyle = 'blue';
    }
    this.ctx.lineWidth = 1 / factor;
    this.ctx.beginPath();
    this.ctx.moveTo(this.ax, this.ay);
    this.ctx.lineTo(this.bx, this.by);
    this.ctx.stroke();
    this.ctx.closePath();
  }
  intersects(x, y) {
    if (this.ax == x && this.ay == y) {
      return true;
    } else if (this.bx == x && this.by == y) {
      return true;
    } else {
      return false;
    }
  }

  createA(others) {
    let available = true;
    for (let i = 0; i < others.length; i++) {
      let other = others[i];
      if (other != this && other.intersects(this.ax, this.ay)) {
        available = false;
      }
    }
    if (available) {
      return new Toothpick(this.ax, this.ay, this.dir * -1, this.ctx);
    } else {
      return null;
    }
  }
  createB(others) {
    let available = true;
    for (let i = 0; i < others.length; i++) {
      let other = others[i];
      if (other != this && other.intersects(this.bx, this.by)) {
        available = false;
      }
    }
    if (available) {
      return new Toothpick(this.bx, this.by, this.dir * -1, this.ctx);
    } else {
      return null;
    }
  }
}
