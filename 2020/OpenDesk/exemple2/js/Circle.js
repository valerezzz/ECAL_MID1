class Circle {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.r = 2;
    this.color = 'white';
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI, false);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
