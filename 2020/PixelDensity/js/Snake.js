class Snake {
  constructor(parent) {
    this.parent = parent;
    this.w = parseFloat(parent.style.width);
    this.h = parseFloat(parent.style.height);

    const P5 = this.P5 = new p5(sketch => sketch);
    P5.pixelDensity(1);
    // p5 canvas
    this.p5Canvas = P5.createCanvas(this.w, this.h);
    this.p5Canvas.canvas.style.position = 'absolute';
    this.p5Canvas.parent(parent);

    //
    this.tailPoints = [
      {x: 226.35, y: 292.79},
      {x: 226.35, y: 271.14000000000004},
      {x: 226.35, y: 249.5},
      {x: 226.35, y: 227.85},
      {x: 226.35, y: 206.2},
      {x: 226.35, y: 184.54999999999998},
      {x: 226.35, y: 162.89999999999998},
      {x: 226.35, y: 141.24999999999997},
      {x: 226.35, y: 119.59999999999997},
      {x: 226.26999999999998, y: 115.20999999999997},
      {x: 225.7, y: 107.84999999999997},
      {x: 225.17, y: 103.63999999999997},
      {x: 224.28, y: 98.15999999999997},
      {x: 222.82, y: 91.28999999999996},
      {x: 221.79, y: 87.27999999999996},
      {x: 219.5, y: 79.88999999999996},
      {x: 216.48, y: 72.10999999999996},
      {x: 214.85, y: 68.52999999999996},
      {x: 211.29, y: 61.73999999999996},
      {x: 207.06, y: 55.05999999999996},
      {x: 203.08, y: 49.76999999999996},
      {x: 197.35000000000002, y: 43.40999999999996},
      {x: 189.06000000000003, y: 36.16999999999996},
      {x: 185.22000000000003, y: 33.41999999999996},
      {x: 176.39000000000001, y: 28.23999999999996},
      {x: 167.57000000000002, y: 24.35999999999996},
      {x: 159.98000000000002, y: 21.84999999999996},
      {x: 147.9, y: 19.159999999999958},
      {x: 136.02, y: 17.789999999999957},
      {x: 126.11000000000001, y: 17.459999999999958},
      {x: 113.50000000000001, y: 17.979999999999958},
      {x: 101.44000000000001, y: 19.549999999999958},
      {x: 91.88000000000001, y: 21.679999999999957},
      {x: 83.00000000000001, y: 24.479999999999958},
      {x: 72.55000000000001, y: 28.979999999999958},
      {x: 65.70000000000002, y: 32.78999999999996},
      {x: 56.530000000000015, y: 39.20999999999996},
      {x: 51.63000000000002, y: 43.399999999999956},
      {x: 46.500000000000014, y: 48.48999999999995},
      {x: 42.960000000000015, y: 52.50999999999995},
      {x: 39.72000000000001, y: 56.61999999999995},
      {x: 36.570000000000014, y: 61.07999999999995},
      {x: 33.20000000000002, y: 66.47999999999995},
      {x: 30.910000000000018, y: 70.61999999999995},
      {x: 28.220000000000017, y: 76.08999999999995},
      {x: 26.680000000000017, y: 79.56999999999995},
      {x: 24.730000000000018, y: 84.47999999999995},
      {x: 23.160000000000018, y: 88.95999999999995},
      {x: 21.970000000000017, y: 92.76999999999995},
      {x: 20.990000000000016, y: 96.24999999999996},
      {x: 20.010000000000016, y: 100.18999999999996},
      {x: 18.730000000000015, y: 106.42999999999995},
      {x: 17.970000000000013, y: 111.29999999999995},
      {x: 17.530000000000012, y: 115.50999999999995},
      {x: 17.530000000000012, y: 135.99999999999994},
      {x: 17.530000000000012, y: 156.48999999999995},
      {x: 17.530000000000012, y: 176.97999999999996},
      {x: 17.530000000000012, y: 197.46999999999997},
      {x: 17.530000000000012, y: 217.95999999999998},
      {x: 17.530000000000012, y: 238.45},
      {x: 17.530000000000012, y: 258.94},
      {x: 17.530000000000012, y: 279.43},
      {x: 34.890000000000015, y: 279.43},
      {x: 41.40000000000001, y: 262.56},
      {x: 47.91000000000001, y: 245.69},
      {x: 54.42000000000001, y: 228.82},
      {x: 60.9, y: 212},
      {x: 67.41, y: 195.13},
      {x: 73.92, y: 178.26},
      {x: 80.43, y: 161.39},
      {x: 86.94000000000001, y: 144.51999999999998}
    ];
    this.head =
        {radius: 35, anchor: null, origin: null, offset: {x: 33, y: 10}};
    this.drag = {isDragging: false, offset: {x: 0, y: 0}};
    this.relMouse = {x: 0, y: 0};
    P5.strokeWeight(35);
    P5.stroke(0);
    P5.noFill();
    P5.strokeCap(P5.SQUARE);

    // reverse the array;
    this.tailPoints = this.tailPoints.reverse();
    // set the head to first point
    this.head.anchor = this.tailPoints[0];

    // Compute length of all segments
    for (let i = 0; i < this.tailPoints.length; i++) {
      this.tailPoints[i].len =
          this.calcDist(this.tailPoints[i - 1], this.tailPoints[i]);
    }
    //??
    this.history = [];
  }  // end constructor

  drawHead() {
    const P5 = this.P5;
    this.head.origin = {
      x: this.head.anchor.x + this.head.offset.x,
      y: this.head.anchor.y + this.head.offset.y
    };
    P5.push();
    if (this.collides(
            this.head.origin, {x: this.relMouse.x, y: this.relMouse.y},
            this.head.radius) ||
        this.drag.isDragging) {
      P5.fill(255, 0, 0)
      P5.stroke(0);
    } else {
      P5.stroke(0);
    }
    P5.ellipse(this.head.origin.x, this.head.origin.y, this.head.radius * 2);
    P5.pop();
  }

  drawTail() {
    const P5 = this.P5;
    P5.beginShape();

    let firstPoint = this.tailPoints[0];
    P5.vertex(firstPoint.x, firstPoint.y);

    for (let i = 0; i < this.tailPoints.length; i++) {
      let currPoint = this.tailPoints[i];
      P5.vertex(currPoint.x, currPoint.y);
    }

    let lastPoint = this.tailPoints[this.tailPoints.length - 1];
    P5.vertex(lastPoint.x, lastPoint.y);

    P5.endShape();
  }


  update() {
    const P5 = this.P5;

    this.w = parseInt(this.parent.style.width);
    this.h = parseInt(this.parent.style.height);
    // p5 resize canvas
    P5.resizeCanvas(this.w, this.h);

    if (this.w >= window.innerWidth && this.h >= window.innerHeight) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  mousePressed(e) {
    if (this.collides(
            this.head.origin, {x: this.relMouse.x, y: this.relMouse.y},
            this.head.radius)) {
      this.drag.isDragging = true;

      this.drag.offset.x = this.relMouse.x - this.head.anchor.x;
      this.drag.offset.y = this.relMouse.y - this.head.anchor.y;
    }
  }

  mouseReleased(e) {
    this.drag.isDragging = false;
    this.drawTail();
  }

  draw() {
    const P5 = this.P5;
    P5.background(255);

    P5.push();

    P5.translate(P5.width / 2, P5.height / 2);
    P5.scale(2);
    P5.translate(-150, -150);

    // calculate position of mouse based on the current transformations
    // (rotation, scale, translate, ... )
    // https://stackoverflow.com/questions/40835163/best-way-to-transform-mouse-coordinates-to-html5-canvass-transformed-context

    this.relMouse = this.relativePos({x: P5.mouseX, y: P5.mouseY});

    if (this.drag.isDragging)
      this.dragFrom(
          this.relMouse.x - this.drag.offset.x,
          this.relMouse.y - this.drag.offset.y);

    this.drawTail();
    this.drawHead();
    P5.pop();
  }

  dragFrom(_x, _y) {
    this.dragSegment(this.tailPoints[0], {x: _x, y: _y});
    for (let i = 0; i < this.tailPoints.length - 1; i++) {
      this.dragSegment(this.tailPoints[i + 1], this.tailPoints[i]);
    }
  }

  dragSegment(p1, p2) {
    const P5 = this.P5;
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const angle = P5.atan2(dy, dx);

    p1.x = p2.x - P5.cos(angle) * p1.len;
    p1.y = p2.y - P5.sin(angle) * p1.len;
    // segment(p1.x, p1.y, angle, p1.len);

    console.log(p1.x, p1.y);
  }

  collides(p1, p2, radius) {
    return radius >= Math.hypot(p1.x - p2.x, p1.y - p2.y);
  }

  calcDist(p1, p2) {
    if (p1 === undefined) return 0;

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;

    return Math.hypot(dx, dy);
  }

  relativePos(p) {
    const P5 = this.P5;
    let mat = P5.drawingContext.getTransform();
    let inv = mat.invertSelf();
    return {
      x: p.x * inv.a + p.y * inv.c + inv.e, y: p.x * inv.b + p.y * inv.d + inv.f
    }
  }
}
