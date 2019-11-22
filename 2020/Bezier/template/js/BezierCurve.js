class BezierCurve {
  constructor(points) {
    this.update(points);
  }

  update(points) {
    this.anchor1 = {x: points[0].x, y: points[0].y};
    this.anchor2 = {x: points[1].x, y: points[1].y};
    this.c1 = {x: points[2].x, y: points[2].y};
    this.c2 = {x: points[3].x, y: points[3].y};
  }

  getPosition(time) {
    const x = Math.pow(time, 3) *
            (this.anchor2.x + 3 * (this.c1.x - this.c2.x) - this.anchor1.x) +
        3 * Math.pow(time, 2) * (this.anchor1.x - 2 * this.c1.x + this.c2.x) +
        3 * time * (this.c1.x - this.anchor1.x) + this.anchor1.x;
    const y = Math.pow(time, 3) *
            (this.anchor2.y + 3 * (this.c1.y - this.c2.y) - this.anchor1.y) +
        3 * Math.pow(time, 2) * (this.anchor1.y - 2 * this.c1.y + this.c2.y) +
        3 * time * (this.c1.y - this.anchor1.y) + this.anchor1.y;
    return {x, y};
  }
};
