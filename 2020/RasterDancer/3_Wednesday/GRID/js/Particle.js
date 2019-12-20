'use strict';
class Particle {
  constructor(x, y, ctx) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.directionX = 1 - Math.random() * 2;
    this.directionY = 1 - Math.random() * 2;
  }
  update() {
    // this.goalX = x;
    // this.goalY = y;
    // this.diffX = this.goalX - this.x;
    // this.diffY = this.goalY - this.y;
    // this.x += this.diffX * 1;
    // this.y += this.diffY * 1;
    // this.x += this.directionX * 2;
    // this.y += this.directionY * 1;
  }
  draw() {
    this.ctx.fillRect(this.x, this.y + 0, 2, 2);
  }
}
