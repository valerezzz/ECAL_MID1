class Circle {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.r = 2;
    this.color = 'white';
    this.strokeColor = 'blue';
    this.withLine = false;
    this.outlineCircle = false;
    this.direction = 1;
    this.subCircles = [];
    this.isHalf = false;
    this.debug = false;
    this.delta = 0;
  }

  draw(angle) {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(angle * this.direction + this.delta);



    if (this.outlineCircle) {
      this.ctx.beginPath();
      this.ctx.fillStyle = (this.color == 'white') ? 'black' : 'white';
      if (this.debug) {
        this.color = 'rba(255,255,255,0.8)';
      }
      this.ctx.arc(0, 0, this.r * 2, 0, Math.PI * 2, false);
      this.ctx.fill();
      this.ctx.closePath();
    }

    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(0, 0, this.r, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.closePath();
    // add line
    if (this.withLine) {
      this.ctx.beginPath();
      this.ctx.moveTo(-this.r, 0);
      this.ctx.lineTo(this.r, 0);
      this.ctx.stroke();
      this.ctx.closePath();
    }
    if (this.isHalf) {
      this.ctx.beginPath();
      this.ctx.fillStyle = (this.color == 'white') ? 'black' : 'white';
      this.ctx.arc(0, 0, this.r + 0.5, 0, Math.PI, false);
      this.ctx.fill();
      this.ctx.closePath();
    }
    // draw subcircles -----
    let w = 0;
    for (const circle of this.subCircles) {
      // invert angles
      if (w % 2 == 0) {
        circle.draw(angle);
      } else {
        circle.draw(angle);
      }
      w++;
    }
    this.ctx.restore();
  }
}
