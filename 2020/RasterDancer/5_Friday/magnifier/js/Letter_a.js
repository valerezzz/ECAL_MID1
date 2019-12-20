class Letter_a {
  constructor(ctx) {
    this.ctx = ctx;
    this.h = 900;
    this.ctx.font = this.h + 'px Arial';
    this.ctx = ctx;
    this.structure = [[0, 5], [2, 5], [3, 7]];
    this.angle = 0;
    this.factorX = 4;
    this.factorY = 400;
    this.isTurning = false;
  }

  move(valx, valy) {
    this.factorX = valx;
    this.factorY = valy;
  }

  click() {
    this.isTurning = !this.isTurning;
  }

  update() {
    if (this.isTurning) this.angle++;
  }

  show() {
    this.ctx.fillStyle = 'blue';
    const w = this.ctx.measureText('A').width;
    this.ctx.fillText(
        'A', window.innerWidth / 2 - w / 2,
        window.innerHeight / 2 + this.h / 4);

    // polar A
    this.ctx.fillStyle = 'black';
    this.ctx.save();
    this.ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
    this.ctx.rotate(this.angle * Math.PI / 180);
    const points = [];
    let angle = 0;
    while (angle < Math.PI * 2) {
      // console.log(this.angle);
      angle += Math.PI / this.factorX;
      this.ctx.beginPath();
      const x = Math.cos(angle) * this.factorY;
      const y = Math.sin(angle) * this.factorY;
      points.push({'x': x, 'y': y});
      this.ctx.arc(x, y, 10, 0, Math.PI * 2, true);
      this.ctx.fill();
      this.ctx.closePath();
    }
    for (const p of this.structure) {
      // console.log(p);
      this.ctx.beginPath();
      this.ctx.moveTo(points[p[0]].x, points[p[0]].y);
      this.ctx.lineTo(points[p[1]].x, points[p[1]].y);
      this.ctx.stroke()
    }
    this.ctx.restore();
  }
};
