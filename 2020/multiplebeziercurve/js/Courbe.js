class Courbe {
  constructor(points) {
    this.resolution = 1 / 60;
    this.radius = 10;
    this.showController = true;
    this.allpoints = points;
    this.bezier = new BezierCurve(this.allpoints);
    this.ctx = null;
  }
  down(x, y) {
    for (let point of this.allpoints) {
      const dist = Math.hypot(point.x - x, point.y - y);
      if (dist < this.radius) {
        point.draggable = true;
      }
    }
  }
  up(x, y) {
    for (let point of this.allpoints) {
      point.draggable = false;
    }
  }
  update(x, y) {
    for (let point of this.allpoints) {
      if (point.draggable) {
        point.x = x;
        point.y = y;
      }
    }
    this.bezier.update(this.allpoints);
  }
  draw() {
    // draw Controllers
    if (this.showController) {
      for (let point of this.allpoints) {
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.closePath();
      }
    }

    // drawCurve
    this.ctx.beginPath();
    this.ctx.moveTo(this.allpoints[0].x, this.allpoints[0].y);
    for (let t = 0; t < 1; t += this.resolution) {
      const {x, y} = this.bezier.getPosition(t);
      this.ctx.lineTo(x, y);
    }
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
